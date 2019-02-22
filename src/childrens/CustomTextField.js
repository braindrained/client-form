// @flow
import React from 'react';
import PropTypes from 'prop-types';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

class CustomTextField extends React.Component<any, any> {

	static defaultProps = {
		placeholder: null,
		name: null,
		type: null,
		disabled: false,
		label: null,
		textAfter: null,
		onUpdate: null,
		errorMessage: null,
		className: null,
		style: null,
		isRequired: false,
		onlyNumber: false,
		isValid: true,
		value: null,
	};

	state = {
		value: `${this.props.value}`,
		isValid: this.props.isValid,
		editing: false,
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
    return false;
	}

	componentWillReceiveProps(nextProps: Object) {
		if (this.state.value !== nextProps.value) {
			this.setState({
				value: nextProps.value,
			});
		}

		if (!nextProps.isValid) {
			this.setState({
				value: nextProps.value,
				isValid: nextProps.isValid,
			});
		}
	}

	onChange(event: Object) {
		const value = this.props.limitChar ? event.target.value.substring(0, this.props.limitChar) : event.target.value;
		this.setState({
			value: this.props.onlyNumber ? value.replace(/\D/g, '') : value,
			isValid: true,
		});
		if (this.props.updateOnChange === true) {
			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: this.props.onlyNumber ? value.replace(/\D/g, '') : value,
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

	handleKeyPress(val: Object) {
		if (val.key === 'Enter') {
			val.preventDefault();

		} else {
			this.setState({
				value: val.target.value,
				isValid: true,
			});
		}
	}

	render() {
		const {
			className, style, label, name, isRequired,
			errorMessage, type, placeholder, currency, disabled, textAfter
		} = this.props;
		const { isValid } = this.state;

		return (
			<div className={sumClasses(['field-container', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }}/>
				<input {...{
					type,
					placeholder: camelToTitle(placeholder, name),
					name,
					id: name,
					value: currency ? this.state.value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') : this.state.value,
					disabled,
					onKeyPress: (e) => { this.handleKeyPress(e); },
					onChange: (e) => { this.onChange(e); },
					onBlur: (e) => { this.onBlur(e); },
					onFocus: () => { this.onFocus(); },
					style: isValid === false ? { border: '1px solid #e4002b' } : {}
				}} />
				<FieldError {...{ isValid, errorMessage }} />
				{ textAfter ? (
					<div style={textAfter.style}>
						{textAfter.text}
					</div>) : null }
			</div>
		);
	}
}

CustomTextField.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	label: PropTypes.instanceOf(Object),
	textAfter: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	errorMessage: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	isRequired: PropTypes.bool,
	onlyNumber: PropTypes.bool,
	isValid: PropTypes.bool,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};

CustomTextField.defaultProps = {
	placeholder: null,
	name: null,
	type: null,
	disabled: false,
	label: null,
	textAfter: null,
	onUpdate: null,
	errorMessage: null,
	className: null,
	style: null,
	isRequired: false,
	onlyNumber: false,
	isValid: true,
	value: null,
};

export default CustomTextField;
