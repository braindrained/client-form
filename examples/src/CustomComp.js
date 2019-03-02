import React from 'react';
import FieldLabel from '../../src/childrens/childrenComponents/FieldLabel';
import FieldError from '../../src/childrens/childrenComponents/FieldError';

class CustomComp extends React.Component {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value,
			isValid: this.props.isValid,
			editing: false,
		};
	}

	onChange(event: Object) {
		const formObject = [];
		this.state.value.map((item) => {
			if (item.name === event.target.name) {
				item.value = event.target.value.replace(/<(?:.|\n)*?>/gm, '').replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, '').substring(0, this.props.limitChar);
			}
			formObject.push(item);
			return null;
		});

		this.setState({
			value: formObject,
		});

		const eventObject = {
			target: {
				name: this.props.name,
				value: formObject,
			}
		};

		this.props.onUpdate(eventObject);
	}

	render() {
		const { label, name, isRequired, isValid, errorMessage, placeholder, style, className } = this.props;
		const { value } = this.state;

		return(
			<div className={className} style={style}>
				<FieldLabel {...{ label, name }} />
				{ value.map((item) => {
					return (
						<div key={`cust_${item.name}`}>
							<FieldLabel {...{ label: item.label, name: item.name, isRequired: item.isRequired, isValid: item.isRequired === false ? true : isValid }} />
							<input {...{
								type: 'text',
								placeholder: item.placeholder,
								name: item.name,
								id: item.name,
								value: item.value,
								onChange: (e) => { this.onChange(e); },
							}} style={{  }}/>
							<FieldError {...{ isValid, errorMessage }} />
						</div>
					)
				})}
				<div>Its value will be returned in the returned object with other fields.</div>
			</div>
		)
	}
}

export default CustomComp;
