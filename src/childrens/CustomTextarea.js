// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

class CustomTextarea extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value,
			isValid: this.props.isValid
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		return false;
	}

	onChange(event: Object) {
		const value = this.props.limitChar ? event.target.value.substring(0, this.props.limitChar) : event.target.value;
		this.setState({
			value,
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

	render() {
		const { placeholder, label, className, style, isRequired, name, value, errorMessage, limitChar } = this.props;
		const { isValid } = this.state;

		return (
			<div className={sumClasses(['field-container', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<textarea {...{
					placeholder: camelToTitle(placeholder, name),
					className: 'large-field',
					name,
					id: name,
					onChange: this.onChange.bind(this),
					value
				}} />
				{ limitChar ?
					<div style={{ textAlign: 'right', position: 'absolute', width: '100%' }}>
						{ value.length }/{limitChar}
					</div> : null }
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default CustomTextarea;
