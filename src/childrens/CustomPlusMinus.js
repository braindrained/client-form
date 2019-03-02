// @flow
import React from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

class CustomPlusMinus extends React.Component<any, any> {

	constructor(props: Object) {
		super(props);

		this.state = {
			value: this.props.value === '' ? 0 : parseFloat(this.props.value)
		};
	}

	shouldComponentUpdate(nextProps: Object, nextState: Object) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		return false;
	}

	onChange(event: Object) {
		const value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
		this.setState({
			value
		});
	}

	onBlur(event: Object) {
		this.props.onUpdate(event, false);
	}

	handleKeyPress(event: Object) {
		if (event.key === 'Enter') {
			event.preventDefault();
		} else {
			const value = parseInt(event.target.value === '' ? 0 : event.target.value, 10);
			this.setState({
				value
			});
		}
	}

	plusMinus(val: string) {
		const value = val === 'min' ?
			this.state.value === 0 ? 0
				: parseFloat(this.state.value) - 1
			: parseFloat(this.state.value) + 1;
		this.setState({
			value: parseFloat(value)
		});

		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: parseFloat(value)
			}
		}, false);
	}

	render() {
		const { className, style, label, name, type,
			disabled, isRequired, errorMessage,
			isValid
		} = this.props;

		return (
			<div className={sumClasses(['container-field cutom-plus-minus', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<div style={{ float: 'left' }}>
					<svg width="32" height="32" {...{
						onClick: () => { this.plusMinus('min'); },
						style: { opacity: this.state.value === 0 ? 0.3 : 1 },
						className: 'box-shadow noselect'
					}}>
						<circle cx="16" cy="16" r="16" fill="rgb(50, 63, 72)"/>
						<text x="50%" y="21" fill="#FFF" text-anchor="middle">-</text>
					</svg>
					<div style={{ float: 'left' }}>
						<input {...{
							type,
							name,
							id: name,
							value: this.state.value,
							disabled,
							onKeyPress: (e) => { this.handleKeyPress(e); },
							onChange: this.onChange.bind(this),
							onBlur: this.onBlur.bind(this),
							style: { border: 'none', background: 'none', width: 40, textAlign: 'center' }
						}} />
					</div>
					<svg width="32" height="32" {...{
						onClick: () => { this.plusMinus('plus'); },
						style: {},
						className: 'box-shadow noselect'
					}}>
						<circle cx="16" cy="16" r="16" fill="rgb(50, 63, 72)"/>
						<text x="50%" y="23" fill="#FFF" text-anchor="middle">+</text>
					</svg>
				</div>
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default CustomPlusMinus;
