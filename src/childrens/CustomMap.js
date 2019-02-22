// @flow
import React from 'react';
import ClickOutHandler from 'react-onclickout';

import TownAutoSuggest from './TownAutoSuggest';
import { replaceVar, makeId, notEmpty } from '../helpers/utils';
import MapOverlay from './childrenComponents/MapOverlay';

// flow-disable-next-line
import './Alert.scss';
// flow-disable-next-line
import './CustomMap.scss';

let marker = null;
let map = {};

/* eslint-disable */
const markerOptions = (markerLat: Number, markerLong: Number) => ({
	// flow-disable-next-line
	position: new google.maps.LatLng(markerLat, markerLong),
	icon: {
		url: '/admin/assets/img/pinpoint_default.png',
		anchor: new google.maps.Point(11, 36),
		size: new google.maps.Size(26, 37)
	},
	shadow: {
		url: '/admin/assets/img/shadow.png',
		anchor: new google.maps.Point(11, 36),
		size: new google.maps.Size(46, 35)
	},
	draggable: true
});
/* eslint-enable */

class CustomMap extends React.Component<any, any> {

	state = {
		value: this.props.value,
		townZones: [],
		options: [],
		openOverlay: null,
		message: null,
		hideConfirm: null,
		hideCancel: null,
		resetForm: null,
		icon: null,
		alertHeight: 0,
		lat: null,
		lng: null,
		geoObject: {},
		newPos: null
	};

	componentDidMount() {
		map = new window.google.maps.Map(document.getElementById('map'), {
			center: { lat: this.getValue('lat').value, lng: this.getValue('lng').value },
			zoom: 15,
			mapTypeId: 'roadmap',
		});

		this.props.actions.searchTown({
			search: this.getValue('suburb').value,
			match: true
		}).then((x) => {
			if (x.value.response.succeed && x.value.response.data.length === 1 && x.value.response.data[0].townZones.length > 0) {
				this.setState({
					townZones: x.value.response.data[0].townZones
				});
			} else {
				console.log(x);
			}
			this.addMarker(
				this.getValue('lat').value,
				this.getValue('lng').value,
				this.getValue('coordinateEnabled').value
			);
		});
	}

	getStateValAsObject() {
		const { value } = this.state;
		return {
			coordinateEnabled: this.getValue('coordinateEnabled', value).value,
			isAddressVisible: this.getValue('isAddressVisible', value).value,
			lat: this.getValue('lat', value).value,
			lng: this.getValue('lng', value).value,
			postCode: this.getValue('postCode', value).value,
			streetName: this.getValue('streetName', value).value,
			streetNumber: this.getValue('streetNumber', value).value,
			suburb: this.getValue('suburb', value).value,
			townId: this.getValue('townId', value).value,
			townZone: this.getValue('townZone', value).value
		};
	}

	geocodeByCity() {
		if (marker !== null) {
			const newPos = marker.getPosition();
			const { postCode, suburb, streetName, streetNumber } = this.getStateValAsObject();
			const address = notEmpty(postCode) && notEmpty(suburb) && !notEmpty(streetName) && !notEmpty(streetNumber)
				? `${suburb}`
				: `${streetName} ${streetNumber} ${postCode} ${suburb}`;

			const that = this;
			/* eslint-disable-next-line */ // flow-disable-next-line
			const geocoder = new google.maps.Geocoder();
			/* eslint-disable-next-line */
			geocoder.geocode({ address, componentRestrictions: { country: 'IT' } }, (results, status) => {
				/* eslint-disable-next-line */
				if (status === google.maps.GeocoderStatus.OK) {
					let forcedResult = results.filter(o => o.formatted_address.indexOf(suburb) !== -1)[0];
					if (!forcedResult) {
						// eslint-disable-next-line
						forcedResult = results[0];
					}

					const mapCenterLat = forcedResult.geometry.location.lat();
					const mapCenterLong = forcedResult.geometry.location.lng();
					const geoObject = that.getGeoObject(forcedResult.address_components, suburb);

					console.log('-------------------------');
					console.log(address);
					console.log('-------------------------');
					console.log(geoObject);
					console.log('-------------------------');
					console.log('City: ', geoObject.suburb);
					console.log('City old:', suburb);
					console.log('streetName new: ', geoObject.streetName);
					console.log('streetName old:', streetName);
					console.log('streetNumber new: ', geoObject.streetNumber);
					console.log('streetNumber old:', streetNumber);
					console.log('postCode new: ', geoObject.postCode);
					console.log('postCode old:', postCode);
					console.log('new lat:', mapCenterLat);
					console.log('new lng:', mapCenterLong);
					console.log('-------------------------');

					const { mapTexts } = that.props;

					if (geoObject.suburb.toLowerCase() === suburb.toLowerCase() && notEmpty(streetName) && !geoObject.streetName && !geoObject.streetNumber) {
						that.handleOpenOverlay({
							openOverlay: true,
							message: mapTexts.addressNotFound,
							lat: mapCenterLat,
							lng: mapCenterLong,
							geoObject,
							newPos,
							hideConfirm: true,
							hideCancel: false,
							options: [],
							resetForm: makeId(),
							icon: '/admin/assets/img/icons/icon-plan.svg',
							alertHeight: 290
						});
					} else {
						that.setGeoObject(geoObject, { lat: mapCenterLat, lng: mapCenterLong }, true);
					}
				}
			});
		}
	}

	setGeoObject(geoObject: Object, latlng: Object, updateMarker: boolean) {
		try {
			const geo = [];
			this.state.value.forEach((v) => {
				if (v.name === 'postCode') {
					v.value = geoObject && geoObject.postCode ? geoObject.postCode : this.getValue('postCode').value;
					geo.push(v);
				} else if (v.name === 'streetName') {
					v.value = geoObject && geoObject.streetName ? geoObject.streetName : this.getValue('streetName').value;
					geo.push(v);
				} else if (v.name === 'streetNumber') {
					v.value = geoObject && geoObject.streetNumber ? geoObject.streetNumber : this.getValue('streetNumber').value;
					geo.push(v);
				} else if (v.name === 'lat') {
					v.value = latlng.lat;
					geo.push(v);
				} else if (v.name === 'lng') {
					v.value = latlng.lng;
					geo.push(v);
				} else {
					geo.push(v);
				}
			});

			if (updateMarker) {
				this.addMarker(latlng.lat, latlng.lng, this.getValue('coordinateEnabled').value, geo);
			} else if (!updateMarker && geo) {
				const eventObject = {
					target: {
						name: this.props.name,
						value: geo,
					}
				};
				this.props.onUpdate(eventObject, true);
			}
		} catch (e) {
			console.log(e);
		}
	}

	addMarker(markerLat: Number, markerLong: Number, coordinateEnabled: boolean, geo: ?Array<Object>) {
		if (marker) {
			marker.setMap(null);
		}

		/* eslint-disable-next-line */ // flow-disable-next-line
		marker = new google.maps.Marker(markerOptions(markerLat, markerLong));
		/* eslint-disable-next-line */
		google.maps.event.addDomListener(marker, 'dragend', this.dragEnd.bind(this));

		marker.setMap(map);
		const point = marker.getPosition();
		map.setCenter(point);

		if (geo) {
			const eventObject = {
				target: {
					name: this.props.name,
					value: geo,
				}
			};

			this.props.onUpdate(eventObject);
		}
	}

	resetMarker(markerLat: Number, markerLong: Number) {
		if (marker !== null) {
			marker.setMap(null);

			/* eslint-disable-next-line */ // flow-disable-next-line
			marker = new google.maps.Marker(markerOptions(markerLat, markerLong));
			/* eslint-disable-next-line */
			google.maps.event.addDomListener(marker, 'dragend', this.dragEnd.bind(this));

			marker.setMap(map);
			const point = marker.getPosition();
			map.setCenter(point);
		}
	}

	dragEnd() {
		const that = this;
		if (marker !== null) {
			const newPos = marker.getPosition();
			/* eslint-disable-next-line */ // flow-disable-next-line
			const geocoder = new google.maps.Geocoder();
			const latlng = { lat: parseFloat(newPos.lat()), lng: parseFloat(newPos.lng()) };

			geocoder.geocode({ location: latlng }, (results, status) => {
				/* eslint-disable-next-line */
				if (status === google.maps.GeocoderStatus.OK) {
					let address_components = [];
					if (results.length > 0) {
						for (let i = 0; i < results.length; i++) {
							if (results[i].types.indexOf('street_address') !== -1) {
								// eslint-disable-next-line
								address_components = results[i].address_components;
								break;
							}
						}
					}

					const mapCenterLat = latlng.lat;
					const mapCenterLong = latlng.lng;
					/* eslint-disable */
					const distance = google.maps.geometry.spherical.computeDistanceBetween(
						new google.maps.LatLng(that.getValue('lat').value, that.getValue('lng').value),
						new google.maps.LatLng(mapCenterLat, mapCenterLong)
					);
					/* eslint-enable */
					const geoObject = that.getGeoObject(address_components, that.getValue('suburb').value);

					console.log(geoObject);
					console.log('-------------------------');
					console.log('City: ', geoObject.suburb);
					console.log('City old:', that.getValue('suburb').value);
					console.log('streetName new: ', geoObject.streetName);
					console.log('streetName old:', that.getValue('streetName').value);
					console.log('streetNumber new: ', geoObject.streetNumber);
					console.log('streetNumber old:', that.getValue('streetNumber').value);
					console.log('postCode new: ', geoObject.postCode);
					console.log('postCode old:', that.getValue('postCode').value);
					console.log('new lat:', mapCenterLat);
					console.log('new lng:', mapCenterLong);
					console.log('-------------------------');
					const { mapTexts } = that.props;

					if (!geoObject.suburb && !geoObject.streetName && !geoObject.streetNumber && !geoObject.postCode) {
						that.handleOpenOverlay({
							openOverlay: true,
							message: mapTexts.addressNotFound,
							lat: mapCenterLat,
							lng: mapCenterLong,
							geoObject,
							newPos,
							hideConfirm: true,
							hideCancel: false,
							options: [],
							resetForm: makeId(),
							icon: '/admin/assets/img/icons/icon-plan.svg',
							alertHeight: 290
						});
					} else if (geoObject.suburb.toLowerCase() !== that.getValue('suburb').value.toLowerCase()) {
						that.handleOpenOverlay({
							openOverlay: true,
							message: replaceVar(mapTexts.suburbChanged, { old: that.getValue('suburb').value, new: geoObject.suburb }),
							lat: mapCenterLat,
							lng: mapCenterLong,
							geoObject,
							newPos,
							hideConfirm: true,
							options: [],
							resetForm: makeId(),
							icon: '/admin/assets/img/icons/icon-plan.svg',
							alertHeight: 305
						});
					} else if (geoObject.suburb.toLowerCase() === that.getValue('suburb').value.toLowerCase() && geoObject.streetName !== that.getValue('streetName').value && that.getValue('streetName').value !== '') {
						that.handleOpenOverlay({
							openOverlay: true,
							message: replaceVar(mapTexts.streetNameChanged, { old: that.getValue('streetName').value, new: geoObject.streetName }),
							lat: mapCenterLat,
							lng: mapCenterLong,
							geoObject,
							newPos,
							options: distance > mapTexts.maxDistanceValue ? [
								{
									value: 1,
									label: replaceVar(mapTexts.streetNameOptions.first, { new: geoObject.streetName }),
									style: { float: 'left', width: '100%', marginBottom: 20 }
								},
							]
								:
								[
									{
										value: 1,
										label: replaceVar(mapTexts.streetNameOptions.first, { new: geoObject.streetName }),
										style: { float: 'left', width: '100%', marginBottom: 20	}
									},
									{
										value: 2,
										label: replaceVar(mapTexts.streetNameOptions.second, { old: that.getValue('streetName').value }),
										style: { float: 'left', width: '100%', marginBottom: 20 }
									},
								],
							resetForm: makeId(),
							distance,
							icon: '/admin/assets/img/icons/icon-plan.svg',
							alertHeight: distance > mapTexts.maxDistanceValue ? 410 : 445
						});
					} else if (geoObject.suburb.toLowerCase() === that.getValue('suburb').value.toLowerCase() && geoObject.streetName === that.getValue('streetName').value && geoObject.streetNumber !== that.getValue('streetNumber').value) {
						that.handleOpenOverlay({
							openOverlay: true,
							message: replaceVar(mapTexts.streetNumberChanged, { old: that.getValue('streetNumber').value, new: geoObject.streetNumber }),
							lat: mapCenterLat,
							lng: mapCenterLong,
							geoObject,
							newPos,
							options: [
								{
									value: 1,
									label: replaceVar(mapTexts.streetNumberOptions.first, { new: geoObject.streetNumber }),
									style: { float: 'left', width: '100%', marginBottom: 20 }
								},
								{
									value: 2,
									label: replaceVar(mapTexts.streetNumberOptions.second, { old: that.getValue('streetNumber').value }),
									style: { float: 'left', width: '100%', marginBottom: 20 }
								},
							],
							icon: '/admin/assets/img/icons/icon-plan.svg',
							resetForm: makeId(),
							alertHeight: 410
						});
					} else {
						map.setCenter(newPos);
						that.setGeoObject(geoObject, { lat: mapCenterLat, lng: mapCenterLong }, false);
					}
				}
			});
		}
	}

	getGeoObject = (address_components: Array<Object>, suburb: string) => {
		const address = {};
		address_components.forEach((c) => {
			switch (c.types[0]) {
			case 'street_number':
				address.streetNumber = c.long_name;
				break;
			case 'route':
			case 'street_address':
				address.streetName = c.long_name;
				break;
			case 'administrative_area_level_3':
				address.administrative_area_level_3 = c.long_name;
				break;
			case 'locality':
				address.locality = c.long_name;
				break;
			case 'postal_code':
				address.postCode = c.long_name;
				break;
			default:
				break;
			}
		});
		address.suburb = address.locality && suburb !== address.administrative_area_level_3 ? address.locality : address.administrative_area_level_3;
		return address;
	}

	/* eslint-disable */
	changeField(e: Object) {
		const stateObject = this.stateObject(e);
		this.geocodeByCity();
	}
	/* eslint-enable */

	onChange(e: Object) {
		const stateObject = this.stateObject(e);
		const { townZones } = this.state;

		this.setState({
			townZones: e.target.name === 'suburb' ? e.target.value.townZones : townZones
		});

		if (e.target.name === 'suburb') {
			this.geocodeByCity();
		} else if (e.target.name === 'townZone') {
			this.setGeoObject({}, {}, false);
		} else if (e.target.name === 'isAddressVisible') {
			this.setState({
				value: stateObject
			});
		}
	}

	stateObject = (e: Object) => {
		let blankAddress = false;
		if (e.target.name === 'suburb' && e.target.value.suburb !== this.getValue('suburb').value) {
			blankAddress = true;
		} else if (e.target.name === 'streetName' && e.target.value === '') {
			blankAddress = true;
		}
		const returnVal = [];
		this.state.value.forEach((v) => {
			if (v.name === e.target.name && e.target.name !== 'suburb' && v.name !== 'townId' && e.target.name !== 'townZone' && e.target.name !== 'coordinateEnabled' &&	e.target.name !== 'isAddressVisible') {
				v.value = e.target.value;
				returnVal.push(v);
			} else if (v.name === e.target.name && e.target.name === 'suburb') {
				v.value = e.target.value.suburb;
				returnVal.push(v);
			} else if (v.name === 'townId' && e.target.name === 'suburb') {
				v.value = e.target.value.townId;
				returnVal.push(v);
			} else if (v.name === e.target.name && e.target.name === 'townZone') {
				v.value.townZoneId = e.target.value;
				returnVal.push(v);
			} else if (v.name === e.target.name && e.target.name === 'coordinateEnabled') {
				v.value = e.target.checked;
				returnVal.push(v);
			} else if (v.name === e.target.name && e.target.name === 'isAddressVisible') {
				v.value = e.target.checked;
				returnVal.push(v);
			} else if (blankAddress && (v.name === 'streetName' || v.name === 'streetNumber' || v.name === 'postCode')) {
				v.value = '';
				returnVal.push(v);
			} else {
				returnVal.push(v);
			}
		});

		return returnVal;
	}

	getValue(name: string, value: ?Object) {
		if (value) return value.filter(o => o.name === name)[0];
		return this.state.value.filter(o => o.name === name)[0];
	}

	closeOverlay() {
		this.handleOpenOverlay({
			openOverlay: false,
			message: null,
			lat: null,
			lng: null,
			geoObject: null,
			newPos: null,
			hideConfirm: null,
			options: [],
			distance: null
		});

		this.resetMarker(this.getValue('lat').value, this.getValue('lng').value);
	}

	confirmPosition(value: Object) {
		map.setCenter(this.state.newPos);
		if (value.confirmSelection === 1) {
			this.setGeoObject(this.state.geoObject, { lat: this.state.lat, lng: this.state.lng }, false);
		} else {
			const { geoObject } = this.state;
			geoObject.streetName = this.getValue('streetName').value;
			geoObject.streetNumber = this.getValue('streetNumber').value;
			this.setGeoObject(geoObject, { lat: this.state.lat, lng: this.state.lng }, false);
		}

		this.handleOpenOverlay({
			openOverlay: false,
			message: null,
			lat: null,
			lng: null,
			geoObject: null,
			newPos: null,
			hideConfirm: null,
			options: []
		});
	}

	handleOpenOverlay(state: Object) {
		if (state.openOverlay) {
			// flow-disable-next-line
			document.body.style.overflow = 'hidden';
		} else {
			// flow-disable-next-line
			document.body.style.overflow = 'unset';
		}
		// flow-disable-next-line
		if (document.activeElement) {
			// flow-disable-next-line
			document.activeElement.blur();
		}
		this.setState(state);
	}

	render() {
		const { className, name, actions, jwt, device, isValid, viewport, mapTexts } = this.props;
		const { openOverlay, message, hideConfirm, hideCancel, options, resetForm, icon, alertHeight } = this.state;

		return (
			<div id={name} className={`custom-map ${className}`}>
				<div className="custom-map-fields">
					<div className="custom-map-field geolocation-field">
						<div className="custom-map-label noselect">
							Comune*
						</div>
						<div>
							<TownAutoSuggest {...{
								actions,
								jwt,
								townId: this.getValue('townId').value,
								description: this.getValue('suburb').value,
								onChange: (e) => { this.onChange(e); }
							}} />
						</div>
						<span className="validation-error">
							{ !isValid && this.getValue('suburb').value === '' ? 'Campo obbligatorio' : '' }
						</span>
					</div>
					<div className="custom-map-field geolocation-field">
						<div style={!isValid && this.getValue('streetName').value === '' ? { color: '#e4002b' } : {}} className="custom-map-label noselect">
							Indirizzo*
						</div>
						<div>
							<input {...{
								type: 'text',
								placeholder: 'Indirizzo',
								id: 'streetName',
								name: 'streetName',
								style: { width: '100%', float: 'left', border: !isValid && this.getValue('streetName').value === '' ? '1px solid #e4002b' : '1px solid #949da2' },
								value: this.getValue('streetName').value,
								onChange: (e) => { this.onChange(e); },
								onBlur: (e) => { this.changeField(e); }
							}} />
						</div>
						<span className="validation-error">
							{ !isValid && this.getValue('streetName').value === '' ? 'Campo obbligatorio' : '' }
						</span>
					</div>
					<div className="custom-map-field-s geolocation-field">
						<div style={{ width: '100%', float: 'left', fontWeight: 700, marginBottom: 5, whiteSpace: 'nowrap' }} className="custom-map-label noselect">
							N° civico
						</div>
						<div>
							<input {...{
								type: 'text',
								placeholder: 'N° civico',
								name: 'streetNumber',
								style: { width: '100%', float: 'left' },
								value: this.getValue('streetNumber').value,
								onChange: (e) => { this.onChange(e); },
								onBlur: (e) => { this.changeField(e); }
							}} />
						</div>
					</div>
					<div className="custom-map-field-s geolocation-field">
						<div style={{ width: '100%', float: 'left', fontWeight: 700, marginBottom: 5 }} className="custom-map-label noselect">
							CAP
						</div>
						<div>
							<input {...{
								type: 'text',
								placeholder: 'CAP',
								name: 'postCode',
								style: { width: '100%', float: 'left' },
								value: this.getValue('postCode').value,
								onChange: (e) => { this.onChange(e); },
								onBlur: (e) => { this.changeField(e); }
							}} />
						</div>
					</div>
				</div>
				{ this.state.townZones && this.state.townZones.length > 0 ?
					<div style={{ width: device === 'smartphone' ? '100%' : 245, display: 'inline-block', marginBottom: 10 }}>
						<div style={{ width: '100%', float: 'left', fontWeight: 700, marginBottom: 5 }} className="noselect">
							Zona
						</div>
						<div className="select-style" style={{ width: '100%' }}>
							<select {...{
								name: 'townZone',
								id: 'townZone',
								value: this.getValue('townZone').value.townZoneId != null ? this.getValue('townZone').value.townZoneId : ' ',
								onChange: (e) => { this.onChange(e); }
							}}>
								<option key="cs_0" value=" ">Seleziona...</option>
								{
									this.state.townZones.map((item, i) => {
										switch (item.townZoneId) {
										case '0':
											return <option key={`cs_${i}`} value="0" className="disabled-option">{item.description.replace(/\/ /g, ' / ')}</option>;
										default:
											return <option key={`cs_${i}`} value={item.townZoneId}>{item.description.replace(/\/ /g, ' / ')}</option>;
										}
									})
								}
							</select>
						</div>
					</div>
					: null }

				<div id="map" style={{ height: 250, clear: 'both', marginTop: 10, marginBottom: 10 }} />

				<input {...{
					type: 'checkbox',
					name: 'coordinateEnabled',
					id: 'coordinateEnabled',
					checked: this.getValue('coordinateEnabled').value,
					onChange: (e) => { this.onChange(e); }
				}} />
				<label htmlFor="coordinateEnabled">
					<div />
					<div>{mapTexts.coordinateEnabledLabel}</div>
				</label>
				<div style={{ clear: 'both', marginTop: 10, }} />
				<input {...{
					type: 'checkbox',
					name: 'isAddressVisible',
					id: 'isAddressVisible',
					checked: this.getValue('isAddressVisible').value,
					onChange: (e) => { this.onChange(e); }
				}} />
				<label htmlFor="isAddressVisible">
					<div />
					<div>{mapTexts.isAddressVisibleLabel}</div>
				</label>

				{ openOverlay ?
					<div className="overlay-back alert">
						<ClickOutHandler onClickOut={() => { this.closeOverlay(); }}>
							<div className="overlay-cont" style={{ marginTop: (parseFloat(viewport.height) - alertHeight) / 2, overflow: 'hidden', width: 450, height: alertHeight }}>
								<div className="alert-head">
									<div {...{
										className: 'alert-close',
										onClick: () => { this.closeOverlay(); }
									}} />
									<div className="alert-title noselect">{mapTexts.modalTitle}</div>
								</div>
								<div className="alert-icon">
									<img src={icon} alt="" />
								</div>
								<div className="overlay-data" style={{ padding: '0px 15px 15px' }}>
									<div style={{ width: '100%', display: 'inline-block' }}>
										<div className="alert-text-red noselect" style={{ marginTop: 38 }} />
										{/* eslint-disable-next-line */}
										<div className="alert-text-black noselect" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: message }} />
										<div className="alert-actions">
											<MapOverlay {...{
												hideCancel,
												hideConfirm,
												resetForm,
												options,
												closeOverlay: () => { this.closeOverlay(); },
												confirmPosition: (o) => { this.confirmPosition(o); },
											}} />
										</div>
									</div>
								</div>
							</div>
						</ClickOutHandler>
					</div>
					: null }
			</div>
		);
	}
}

export default CustomMap;
