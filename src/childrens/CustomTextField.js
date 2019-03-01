// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

class CustomTextField extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value, isValid } = this.props;

		this.state = {
			value: `${value}`,
			isValid,
			editing: false,
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
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

	render() {
		const {
			className, style, label, name, isRequired,
			errorMessage, type, placeholder, currency, disabled
		} = this.props;
		const { isValid, value } = this.state;

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
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default CustomTextField;
