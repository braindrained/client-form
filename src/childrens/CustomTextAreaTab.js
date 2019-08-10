// @flow
import { Component, createElement, forwardRef, createRef } from 'react';
import { sumClasses } from '../helpers/utils';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';

const el = createElement;

const TextAreaField = forwardRef((props, ref) => (
	el('div', { key: item.name, style: { width: '100%', float: 'left', display: this.state.selected === i ? 'inline-block' : 'none', position: 'relative' } },
		el('div', {},
			el('textarea', {
				placeholder: value[i].placeholder,
				className: 'large-field',
				name: item.name,
				id: item.name,
				onChange: (e) => { this.onChange(e); },
				value: item.value,
				style: {
					borderRadius: '0px 2px 2px',
					height: 200,
					resize: 'none',
					border: !isValid ? '1px solid #e4002b' : '1px solid #d8d8df'
				},
				rows: 2,
				cols: 20,
				ref: this[item.name]
			})
		),
		limitChar ? el('div', {
			className: 'limit-char noselect'
		}, `${item.value.length}/${limitChar}`) : null
	)
));

class CustomTextareaWithTab extends Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value,
			selected: 0,
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.innerRef !== nextProps.innerRef) return true;
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.isValid !== nextProps.isValid) return true;
		if (this.state.selected !== nextState.selected) return true;
		return false;
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

	selectTab(wich: number) {
		this.setState({
			selected: wich,
		});
	}

	render() {
		const { className, style, name, isValid, value, limitChar, errorMessage, label, isRequired, innerRef } = this.props;

		return el('div', { ref: innerRef, className: sumClasses(['container-field', className]), style },
			el(FieldLabel, { label, name, isRequired, isValid }),
			el('div', { className: 'container-field-tabs', id: name },
				this.state.value.map((item, i) => (
					el('div', {
						key: item.name,
						style: {
							borderRadius: i === 0 ? '2px 0px 0px 0px' : i === 4 ? '0px 2px 0px 0px' : '0px',
							textAlign: 'left',
						},
						className: this.state.selected === i ? 'container-field-tabs-item container-field-tabs-item-selected' : 'container-field-tabs-item',
						onClick: () => { this.selectTab(i); },
						role: 'button'
					},
						el('div', { className: 'noselect' },
							el('span', { className: 'tab-label' }, item.label),
							el('span', { className: 'tab-abbr' }, item.abbr)
						)
					)
				))
			),
			value.map((item, i) => {
				this[item.name] = createRef();
				return el('div', { key: item.name, style: { width: '100%', float: 'left', display: this.state.selected === i ? 'inline-block' : 'none', position: 'relative' } },
					el('div', {},
						el('textarea', {
							placeholder: value[i].placeholder,
							className: 'large-field',
							name: item.name,
							id: item.name,
							onChange: (e) => { this.onChange(e); },
							value: item.value,
							style: {
								borderRadius: '0px 2px 2px',
								height: 200,
								resize: 'none',
								border: !isValid ? '1px solid #e4002b' : '1px solid #d8d8df'
							},
							rows: 2,
							cols: 20,
							ref: this[item.name]
						})
					),
					limitChar ? el('div', { className: 'limit-char noselect' }, `${item.value.length}/${limitChar}`) : null
				)
			}),
			el(FieldError, { isValid, errorMessage, style: limitChar ? { paddingRight: 60 } : {} })
		);
	}
}

export default forwardRef((props, ref) =>
	el(CustomTextareaWithTab,
		Object.assign({}, props, { innerRef: ref })
	)
);
