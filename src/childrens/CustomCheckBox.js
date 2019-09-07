// @flow
import { Component, createElement, forwardRef } from 'react';
import { sumClasses, camelToTitle } from '../helpers/utils';

const el = createElement;

class CustomCheckBox extends Component<any, any> {

	constructor(props: Object) {
		super(props);
		const { value, label } = this.props;

		this.state = {
			value: value === 'true' || value === true,
			labelText: label && label.text
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.innerRef !== nextProps.innerRef) return true;
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.props.style !== nextProps.style) return true;
		if (nextProps.label && this.state.labelText !== nextProps.label.text) return true;
		return false;
	}

	componentDidUpdate(prevProps) {
		const { label } = this.props;
		if (prevProps.label && prevProps.label.text !== label.text)  this.setState({ labelText: label && label.text });
	}

	/*UNSAFE_componentWillReceiveProps(nextProps: Object) {
		const { label } = nextProps;

		if (label && this.state.labelText !== label.text) {
			this.setState({
				labelText: label && label.text
			});
		}
	}*/

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

	handleKeyDown(e: Object) {
		if (e.keyCode !== 9) {
			e.preventDefault();
			const { value } = this.state;
			this.setState({ value: !value });
			this.props.onUpdate({
				target: {
					name: this.props.name,
					value: !value
				}
			});
		}
	}

	render() {
		const { className, style, label, name, customSvg, innerRef } = this.props;
		const { value } = this.state;
		const svgProps = customSvg ? customSvg.svgProps : { width: 24, height: 24, viewBox: '0 0 24 24' };
		const forTrue = customSvg ? customSvg.forTrue : el('path', {
			className: 'int',
			d: 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' });
		const forFalse = customSvg ? customSvg.forFalse : el('rect', {
			className: 'ext',
			style: { fill: '#fff', strokeWidth: 2, stroke: '#d8d8df', borderRadius: 2 },
			width: 16,
			height: 16,
			rx: 2,
			ry: 2,
			x: 4,
			y: 4 });
		const labelId = `ck_label_${name}`;

		return el('div', { className: sumClasses(['container-field', className !== undefined ? className : 'check']), style },
			el('input', {
					ref: innerRef,
					type: 'checkbox',
					name,
					id: name,
					checked: value,
					onChange: e => this.onChange(e),
					'aria-labelledby': labelId
				}
			),
			el('label', {
				tabIndex: 0,
				id: labelId,
				htmlFor: name,
				style: label && label.style, 'aria-label': camelToTitle(label && label.text, name),
				onKeyDown: e => this.handleKeyDown(e),
			},
				el('svg', { ...svgProps, 'aria-labelledby': labelId }, value !== true ? forFalse : forTrue),
				el('div', {}, camelToTitle(label && label.text, name))));
	}
}

export default forwardRef((props, ref) =>
	el(CustomCheckBox,
		Object.assign({}, props, { innerRef: ref })
	)
);
