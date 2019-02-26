// @flow
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';

// flow-disable-next-line
import './DatePickerField.scss';

moment.locale('it');

class DatePickerField extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value ? moment(this.props.value, 'DD/MM/YYYY') : moment()
		};
	}

	handleChange(date: string) {
		this.setState({
			value: date
		});
		if (this.props.updateOnChange === true) {
			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY'),
				}
			}, false);
		}
	}

	onBlur(event: Object) {
		if (event !== undefined) this.props.onUpdate(event, false);
	}

	render() {
		const { label, name, className, isRequired, greaterThan, errorMessage, isValid } = this.props;

		return (
			<div className={`container-field ${className}`} style={this.props.style}>
				<input type="text" id={name} style={{ opacity: 0, height: 0 }} />
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<div className="field-picker-container">
					<DatePicker {...{
						name,
						selected: this.state.value,
						onChange: (e) => { this.handleChange(e); },
						onBlur: (e) => { this.onBlur(e); }
					}} />
				</div>
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default DatePickerField;
