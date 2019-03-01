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
							<div>
								{ value === true ?
									<svg width="15px" viewBox="0 0 24 20">
									    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
									        <g transform="translate(-43.000000, -419.000000)" strokeWidth="3" stroke="#ffffff" fill="#ffffff">
									            <g transform="translate(45.000000, 421.000000)">
									                <polygon points="6.46669022 12.0255431 1.81870474 7.37755757 0.2359375 8.94917857 6.46669022 15.1799313 19.842188 1.80443349 18.270567 0.2328125"></polygon>
									            </g>
									        </g>
									    </g>
									</svg>
									: null }
							</div>
							<div>{label.text}</div>
						</label>
					</div>
				</div>
			</div>
		);
	}
}
