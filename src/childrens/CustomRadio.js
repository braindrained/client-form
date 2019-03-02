// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import { sumClasses } from '../helpers/utils';

class CustomRadio extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value !== null ? this.props.value : '',
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		return false;
	}

	onChange(event: Object) {
		this.setState({
			value: event.target.value
		});
		this.props.onUpdate(event);
	}

	handleClick(event: Object) {
		if (this.props.uncheck) {
			// eslint-disable-next-line
			if (this.state.value == event.target.value) {
				this.props.options.map((item) => {
					/* eslint-disable-next-line */ /* flow-disable-next-line */
					document.getElementById(this.props.name + item.value).checked = false;
					return null;
				});
				this.setState({
					value: null
				});
				this.props.onUpdate({
					target: {
						name: this.props.name,
						value: null
					}
				});
			}
		}
	}

	render() {
		const { className, style, label, name, hideRadio, textBefore, options, css, isRequired, isValid } = this.props;

		return (
			<div className={sumClasses([hideRadio ? 'container-field toggle-format' : 'container-field regular-radio', className])} style={style}>
				{ textBefore ? (
					<div style={textBefore.style}>
						{textBefore.text}
					</div>
				) : null }
				<div className={css}>
					<FieldLabel {...{ label, name, isRequired, isValid }} />
					<div className="float-container">
						{ /* eslint-disable */ }
						{ options.map(item => <div {...{
							key: `select_${item.name}_${item.value}`,
							className:
								hideRadio &&
								item.value === this.state.value
									?
									`floating selected-radio ${item.className}`
									:
									(hideRadio ? `floating ${item.className}` : item.className) + ' float-container-first-child',
							style: item.style
						}}>
							<input {...{
								type: 'radio',
								name,
								id: name + item.value,
								value: item.value,
								disabled: item.disabled === true,
								checked: item.value === this.state.value,
								onClick: this.handleClick.bind(this),
								onChange: this.onChange.bind(this)
							}} />
							<label htmlFor={name + item.value} style={item.labelStyle ? item.labelStyle : {}}>
								{ hideRadio ?
									null :
									(item.value === this.state.value ?
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
											<path fill="rgb(0, 132, 255)" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
											<path d="M0 0h24v24H0z" fill="none"/>
										</svg>
										:
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
											<path fill="#c1c5c8" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
											<path d="M0 0h24v24H0z" fill="none"/>
										</svg>
									)
								}
								{ /* eslint-disable-next-line */ }
								{ hideRadio ? <div>{item.label}</div> : <div className="custom-radio-options-label">{item.label}</div>}
								{ item.customObject ?
									<div className={item.value === this.state.value ? 'custom-radio-options-wrapper custom-radio-options-wrapper-sel' : 'custom-radio-options-wrapper'}>{item.customObject}</div>
									:
									null
								}
							</label>
						</div>)}
						{ /* eslint-enable */ }
					</div>
				</div>
			</div>
		);
	}
}

export default CustomRadio;
