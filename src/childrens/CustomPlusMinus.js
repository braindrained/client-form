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
			<div className={sumClasses(['container-field plus-minus', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<div style={{ float: 'left' }}>
					<svg {...{
						width: 30,
						height: 30,
						onClick: () => { this.plusMinus('min'); },
						style: { opacity: this.state.value === 0 ? 0.3 : 1 },
						className: 'box-shadow noselect'
					}}>
						<circle {...{ cx: 15, cy: 15, r: 15, fill: 'rgb(50, 63, 72)' }} />
						<rect {...{ width: 12.418323, height: 1.5814986, x: 8.792613, y: 14.209251 }} />
					</svg>
					<div style={{ float: 'left' }}>
						<input {...{
							type,
							name,
							id: name,
							value: this.state.value,
							disabled,
							onKeyPress: (e) => { this.handleKeyPress(e); },
							onChange: (e) => { this.onChange(e); },
							onBlur: (e) => { this.onBlur(e); },
							style: { border: 'none', background: 'none', width: 40, textAlign: 'center' }
						}} />
					</div>
					<svg {...{
						width: 30,
						height: 30,
						onClick: () => { this.plusMinus('plus'); },
						style: {},
						className: 'box-shadow noselect'
					}}>
						<circle {...{ cx: 15, cy: 15, r: 15, fill: 'rgb(50, 63, 72)' }} />
						<path {...{ fill: '#FFF', d: 'm 21.207387,15.79075 h -5.386984 v 5.386984 H 14.179598 V 15.79075 H 8.7926135 V 14.209251 H 14.179598 V 8.8222655 h 1.640805 v 5.3869855 h 5.386983 z' }} />
					</svg>
				</div>
				<FieldError {...{ isValid, errorMessage }} />
			</div>
		);
	}
}

export default CustomPlusMinus;
