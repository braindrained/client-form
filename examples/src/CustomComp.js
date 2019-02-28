import React from 'react';
import FieldLabel from '../../src/childrens/childrenComponents/FieldLabel';
import FieldError from '../../src/childrens/childrenComponents/FieldError';

class CustomComp extends React.Component {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: `${this.props.value}`,
			isValid: this.props.isValid,
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
		const { label, name, isRequired, isValid, errorMessage, placeholder, style } = this.props;
		const { value } = this.state;

		return(
			<div style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<input {...{
					type: 'email',
					placeholder,
					name,
					id: name,
					value: value,
					onKeyPress: (e) => { this.handleKeyPress(e); },
					onChange: (e) => { this.onChange(e); },
					onBlur: (e) => { this.onBlur(e); },
					onFocus: () => { this.onFocus(); },
				}} style={{  }}/>
				<FieldError {...{ isValid, errorMessage }} />
				<div>And I need that it have a complete custom behaviour and contents, is value will be returned with other fields.</div>
			</div>
		)
	}
}

export default CustomComp;
