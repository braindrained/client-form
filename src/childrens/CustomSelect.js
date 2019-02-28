// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

class CustomSelect extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			options: this.props.options,
			isValid: this.props.isValid
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (nextProps.options.length !== this.state.options.length) {
			this.setState({
				options: nextProps.options
			});

			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: ''
				}
			});
		}
	}

	onChange(event: Object) {
		this.props.onUpdate(event);
	}

	render() {
		const { className, style, label, isRequired, value, errorMessage, name } = this.props;
		const { isValid } = this.state;

		return (
			<div className={sumClasses(['container-field', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<div className="select-style" style={isValid === false ? { borderColor: '#e4002b' } : {}}>
					<select name={name} id={name} value={value} onChange={this.onChange.bind(this)}>
						{
							this.state.options.map((item, i) => {
								switch (item.value) {
								case '0':
									return <option key={`cs_${i}`} value="0" className="disabled-option">{item.label}</option>;
								default:
									return <option key={`cs_${i}`} value={item.value} disabled={item.disabled}>{item.label}</option>;
								}
							})
						}
					</select>
				</div>
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default CustomSelect;