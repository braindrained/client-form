// @flow
import React from 'react';
import PropTypes from 'prop-types';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

class CustomSelect extends React.Component<any, any> {

	static defaultProps = {
		options: null,
		onUpdate: null,
		name: '',
		value: '',
		default: null,
		className: '',
		style: null,
		label: null,
		isValid: true,
		isRequired: false,
		errorMessage: ''
	};

	state = {
		options: this.props.options,
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
    return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (nextProps.options.length !== this.state.options.length) {
			console.log('componentWillReceiveProps');
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
		const { className, style, label, isValid, isRequired, value, errorMessage, name } = this.props;

		return (
			<div className={sumClasses(['field-container', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }}/>
				<div className="select-style" style={!isValid ? { borderColor: '#e4002b' } : {}}>
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

CustomSelect.propTypes = {
	options: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	name: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	default: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	className: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	label: PropTypes.instanceOf(Object),
	isValid: PropTypes.bool,
	isRequired: PropTypes.bool,
	errorMessage: PropTypes.string
};

CustomSelect.defaultProps = {
	options: null,
	onUpdate: null,
	name: '',
	value: '',
	default: null,
	className: '',
	style: null,
	label: null,
	isValid: true,
	isRequired: false,
	errorMessage: ''
};

export default CustomSelect;
