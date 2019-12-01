import React, { createRef, forwardRef, createElement } from 'react';
import FieldLabel from '../../src/childrens/common/FieldLabel';
import InputField from './InputField';

const el = createElement;

class CustomComp extends React.Component {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value,
			isValid: this.props.isValid,
			editing: false,
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (!nextProps.isValid) {
			/*const { value } = this.state;
			const toBeValidateFilter = o =>
				!o.hide &&
				o.type !== 'hidden' &&
				(
					(o.isRequired && o.isValid === false) ||
					(o.greaterThan && o.isValid === false) ||
					(o.regEx && o.isValid === false) ||
					(o.equalTo && o.isValid === false)
				);
			let firstRequired = value.filter(o => toBeValidateFilter(o))[0];
			console.log('firstRequired.name', firstRequired);
			this[firstRequired.name].current.focus();*/
		}
	}

	componentDidMount() {

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

	validate() {

	}

	render() {
		const { label, name, isRequired, isValid, errorMessage, placeholder, style, className, innerRef } = this.props;
		const { value } = this.state;

		return(
			<div className={className} style={style} ref={innerRef}>
				<FieldLabel {...{ label, name }} />
				{ value.map((item) => {
					this[item.name] = createRef();
					return el(InputField,
							{
								item,
								key: `cust_${item.name}`,
								ref: this[item.name],
								onChange: e => this.onChange(e),
								isValid
							}
						)
				})}
				<div>Its value will be returned in the returned object with other fields.</div>
			</div>
		)
	}
}

export default forwardRef((props, ref) =>
	el(CustomComp,
		Object.assign({}, props, { innerRef: ref })
	)
);
