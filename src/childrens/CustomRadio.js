// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import { sumClasses } from '../helpers/utils';

class CustomRadio extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value } = this.props;
		const checkValue = value.toString() === 'true' ? true : value.toString() === 'false' ? false : value;

		this.state = {
			value: checkValue
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		return false;
	}

	onChange(event: Object) {
		const { value } = event.target;
		const checkValue = value.toString() === 'true' ? true : value.toString() === 'false' ? false : value;

		this.setState({
			value: checkValue
		});
		this.props.onUpdate(event);
	}

	render() {
		const { className, style, label, name, hideRadio, textBefore, options, css, isRequired, isValid } = this.props;
		const { value } = this.state;

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
								item.value === value
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
								checked: item.value === value,
								onChange: this.onChange.bind(this)
							}} />
							<label htmlFor={name + item.value} style={item.labelStyle ? item.labelStyle : {}}>
								{ hideRadio ?
									null :
									(item.value === value ?
										<svg width="24" height="24" viewBox="0 0 24 24">
											<path fill="#949da2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
											<circle
										     id="path14"
										     cx="12"
										     cy="12"
										     style={{ fill:'#ffffff', strokeWidth: '0.98041338' }}
										     r="8" />
											<circle
										     id="path14"
										     cx="12"
										     cy="12"
										     style={{ fill:'rgb(0, 132, 255)', strokeWidth: '0.98041338' }}
										     r="5" />
										</svg>
										:
										<svg width="24" height="24" viewBox="0 0 24 24">
											<path fill="#949da2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
											<circle
										     id="path14"
										     cx="12"
										     cy="12"
										     style={{ fill:'#ffffff', strokeWidth: '0.98041338' }}
										     r="8" />
										</svg>
									)
								}
								{ /* eslint-disable-next-line */ }
								{ hideRadio ?
									<div>{item.label}</div>
									:
									<div className="custom-radio-options-label">{item.label}</div>
								}
								{ item.customObject ?
									<div className={item.value === value ? 'custom-radio-options-wrapper custom-radio-options-wrapper-sel' : 'custom-radio-options-wrapper'}>
										{item.customObject}
									</div>
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
