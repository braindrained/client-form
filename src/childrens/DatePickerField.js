// @flow
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// flow-disable-next-line
import './DatePickerField.scss';

moment.locale('it');

class DatePickerField extends React.Component<any, any> {

	state = {
		value: this.props.value ? moment(this.props.value, 'DD/MM/YYYY') : moment(),
	};

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
			<div className={`field-container ${className}`} style={this.props.style}>
				<input type="text" id={name} style={{ opacity: 0, height: 0 }} />
				<div className="field-label noselect" style={Object.assign({}, label.style, !isValid ? { color: '#e4002b' } : {})}>{label.text}</div>
				<div className="field-picker-container">
					<DatePicker {...{
						name,
						selected: this.state.value,
						onChange: (e) => { this.handleChange(e); },
						onBlur: (e) => { this.onBlur(e); }
					}} />
				</div>
				<span className="validation-error noselect">
					{(isRequired || greaterThan) && !isValid ? errorMessage : '' }
					&nbsp;
				</span>
			</div>
		);
	}
}

export default DatePickerField;
