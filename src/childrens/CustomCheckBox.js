// @flow
import React from 'react';
import { sumClasses } from '../helpers/utils';

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
		const { className, style, label, name, textBefore } = this.props;
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
							{ value === true ?
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path fill="rgb(0, 132, 255)" d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
								</svg>
								:
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
									<path fill="#d8dbdf" d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
								</svg>
							}
							<div>{label.text}</div>
						</label>
					</div>
				</div>
			</div>
		);
	}
}
