// @flow
import React from 'react';
import { sumClasses } from '../helpers/utils';

// flow-disable-next-line
import './CustomCheckBox.scss';

export default class CustomCheckBox extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value === 'true' || this.props.value === true
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
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
		const { value } = this.state;

		return (
			<div className={sumClasses(['container-field', className !== undefined ? className : 'check'])} style={style}>
				{textBefore !== null && textBefore !== undefined ? textBefore : ''}
				<div className="check-filters">
					<div className="separator" />
					<div>
						<input {...{
							type: 'checkbox',
							name,
							id: name,
							checked: value,
							onChange: (e) => { this.onChange(e); }
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
