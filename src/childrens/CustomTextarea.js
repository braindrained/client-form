// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

class CustomTextarea extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value, isValid } = this.props;

		this.state = {
			value: `${value}`,
			isValid
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

	onBlur(event: Object) {
		if (this.props.value !== this.state.value) {
			this.props.onUpdate(event, false);
		}
	}

	render() {
		const { placeholder, label, className, style, isRequired, name, errorMessage, limitChar } = this.props;
		const { isValid, value } = this.state;

		return (
			<div className={sumClasses(['container-field', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<textarea {...{
					placeholder: camelToTitle(placeholder, name),
					className: 'large-field',
					name,
					id: name,
					onBlur: (e) => { this.onBlur(e); },
					onChange: (e) => { this.onChange(e); },
					value,
					style: isValid === false ? { border: '1px solid #e4002b' } : {}
				}} />
				{ limitChar ?
					<div className="limit-char noselect">
						{ value.length }/{limitChar}
					</div> : null }
				<FieldError {...{ isValid, errorMessage, style: limitChar ? { paddingRight: 60 } : {} }} />
			</div>
		);
	}
}

export default CustomTextarea;
