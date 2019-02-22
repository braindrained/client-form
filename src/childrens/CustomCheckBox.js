// @flow
import React from 'react';
import { sumClasses } from '../helpers/utils';

import './CustomCheckBox.scss';

export default class CustomCheckBox extends React.Component<any, any> {

	state = {
		value: this.props.value
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
    return false;
	}

	onChange(event: Object) {
		this.setState({
			value: event.target.checked
		});
		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: event.target.checked
			}
		});
	}

	render() {
		const { className, style, label, name, textAfter, textBefore } = this.props;

		return (
			<div className={sumClasses(['field-container', className !== undefined ? className : 'check'])} style={style}>
				{textBefore !== null && textBefore !== undefined ? textBefore : ''}
				<div className="check-filters">
					<div className="separator" />
					<div>
						<input {...{
							type: 'checkbox',
							ref: name,
							name,
							id: name,
							checked: this.state.value,
							onChange: this.onChange.bind(this)
						}} />
						<label htmlFor={name} style={label.style}>
							<div />
							<div>{label.text}</div>
						</label>
					</div>
				</div>
				{textAfter !== null && textAfter !== undefined ? textAfter : ''}
			</div>
		);
	}
}
