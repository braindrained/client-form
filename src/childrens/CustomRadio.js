// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import { sumClasses } from '../helpers/utils';

// flow-disable-next-line
import './CustomRadio.scss';

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
									? `floating ${(item.value === options[0].value ? 'selected-radio' : 'selected-radio-red')} type type-selected ${item.className} text-type` : (hideRadio ? `floating type ${item.className} text-type` : item.className),
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
								{ hideRadio ? <span className="hide-radio" /> : <div style={item.disabled === true ? { opacity: 0.5 } : {}} />}
								{ /* eslint-disable-next-line */ }
								<div dangerouslySetInnerHTML={{ __html: item.label }} />
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
