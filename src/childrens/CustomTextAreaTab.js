// @flow
import React from 'react';
import { sumClasses } from '../helpers/utils';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';

const el = React.createElement;

class CustomTextareaWithTab extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value,
			selected: 0,
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

	selectTab(wich: number) {
		this.setState({
			selected: wich,
		});
	}

	render() {
		const { className, style, name, isValid, value, limitChar, errorMessage, label, isRequired } = this.props;

		return el('div', { className: sumClasses(['container-field', className]), style },
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
						el('span', { className: 'tab-abbr' }, item.abbr)))))),
			value.map((item, i) => (
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
							cols: 20
						})),
					limitChar ? el('div', { className: 'limit-char noselect' }, `${item.value.length}/${limitChar}`) : null))),
			el(FieldError, { isValid, errorMessage, style: limitChar ? { paddingRight: 60 } : {} }));
	}
}

export default CustomTextareaWithTab;
