// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

class CustomTextField extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value, isValid, type, label } = this.props;

		this.state = {
			value: value === undefined ? '' : value,
			isValid,
			editing: false,
			type,
			labelText: label && label.text
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		if (this.state.type !== nextState.type) return true;
		if (nextProps.label && this.state.labelText !== nextProps.label.text) return true;
		return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (this.state.value !== nextProps.value || !nextProps.isValid || (nextProps.label && this.state.labelText !== nextProps.label.text)) {
			this.setState({
				value: nextProps.value === undefined ? '' : nextProps.value,
				isValid: nextProps.isValid,
				labelText: nextProps.label && nextProps.label.text
			});
		}
	}

	onChange(event: Object) {
		const { limitChar, onlyNumber, updateOnChange, name, onUpdate } = this.props;
		const value = limitChar ? event.target.value.substring(0, limitChar) : event.target.value;
		this.setState({
			value: onlyNumber ? value.replace(/\D/g, '') : value,
			isValid: true,
		});
		if (updateOnChange === true) {
			onUpdate({
				target: {
					name,
					value: onlyNumber ? value.replace(/\D/g, '') : value,
				}
			}, false);
		}
	}

	onBlur(event: Object) {
		if (this.state.editing && this.props.value !== this.state.value) {
			this.props.onUpdate(event, false);
		}

		this.setState({
			editing: false,
		});
	}

	onFocus() {
		this.setState({
			editing: true,
		});
	}

	togglePassword() {
		const { type } = this.state;
		this.setState({
			type: type === 'password' ? 'text' : 'password'
		});
	}

	render() {
		const {
			className, style, label, name, isRequired,
			errorMessage, placeholder, currency, disabled
		} = this.props;
		const { isValid, value, type } = this.state;

		return (
			<div className={sumClasses(['container-field', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<input {...{
					type,
					placeholder: camelToTitle(placeholder, name),
					name,
					id: name,
					value: currency ? value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : value,
					disabled,
					onChange: (e) => { this.onChange(e); },
					onBlur: (e) => { this.onBlur(e); },
					onFocus: () => { this.onFocus(); },
					style: isValid === false ? { border: '1px solid #e4002b' } : {}
				}} />
				{ this.props.type === 'password' ?
					<svg {...{
						onClick: () => { this.togglePassword(); }, className: 'eye', width: 24, height: 24, viewBox: '0 0 24 24'
					}}>
						{ type === 'password' ?
							<path {...{ fill: '#949da2', d: 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z' }} />
							:
							<React.Fragment>
								<path {...{ d: 'M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z', fill: 'none' }} />
								<path {...{ fill: '#949da2', d: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' }} />
							</React.Fragment>
						}
					</svg>
					:
					null }
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default CustomTextField;
