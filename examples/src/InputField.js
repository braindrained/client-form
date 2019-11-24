import { Component, createElement, Fragment, forwardRef } from 'react';
import FieldLabel from '../../src/childrens/common/FieldLabel';
import FieldError from '../../src/childrens/common/FieldError';

const el = createElement;

class InputField extends Component {
  constructor(props: Object) {
    super(props);
  }

  render() {
		const { item, innerRef, onChange, isValid } = this.props;

		return el('div', { },
			el(FieldLabel, {
				label: item.label,
				name: item.name,
				isRequired: item.isRequired,
				isValid: item.isRequired === false ? true : isValid }),
			el('input', {
				type: 'text',
				placeholder: item.placeholder,
				name: item.name,
				id: item.name,
				value: item.value,
				onChange: e => onChange(e),
        ref: innerRef
			}),
			el(FieldError, { isValid: item.isRequired === false ? true : isValid, errorMessage: item.errorMessage })
		)
  }
}

export default forwardRef((props, ref) =>
	el(InputField,
		Object.assign({}, props, { innerRef: ref })
	)
);
