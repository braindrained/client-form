// @flow
import React from 'react';
import PropTypes from 'prop-types';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

class CustomTextarea extends React.Component<any, any> {

	static defaultProps = {
		placeholder: null,
		name: null,
		label: null,
		onUpdate: null,
		errorMessage: null,
		className: null,
		style: null,
		equalTo: null,
		isRequired: false,
		isValid: true,
		value: null,
	};

	state = {
		value: this.props.value,
		error: false,
	};

	onChange(event: Object) {
		this.setState({ value: event.target.value });
		this.props.onUpdate(event);
	}

	onBlur() {
		this.validation();
	}

	validation() {
		if (this.props.isRequired) {
			const { value } = this.state;
			this.setState({ error: !value });
		}
	}

	render() {
		const { placeholder, label, className, style, isRequired, name, value, isValid, errorMessage } = this.props;

		return (
			<div className={sumClasses(['field-container', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }}/>
				<textarea {...{
					placeholder: camelToTitle(placeholder, name),
					className: 'large-field',
					name,
					id: name,
					onChange: this.onChange.bind(this),
					onBlur: this.onBlur.bind(this),
					value: value
				}} />
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

CustomTextarea.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	errorMessage: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	isRequired: PropTypes.bool,
	isValid: PropTypes.bool,
	value: PropTypes.string,
};

CustomTextarea.defaultProps = {
	placeholder: null,
	name: null,
	label: null,
	onUpdate: null,
	errorMessage: null,
	className: null,
	style: null,
	isRequired: false,
	isValid: true,
	value: null,
};

export default CustomTextarea;
