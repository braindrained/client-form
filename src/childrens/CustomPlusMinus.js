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
			disabled, isRequired, errorMessage, textAfter,
			isValid
		} = this.props;

		return (
			<div className={sumClasses(['field-container cutom-plus-minus', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<div style={{ float: 'left' }}>
					<div {...{
						onClick: () => { this.plusMinus('min'); },
						style: {
							float: 'left',
							width: 30,
							lineHeight: '30px',
							borderRadius: 15,
							backgroundColor: '#323f48',
							color: '#fff',
							fontWeight: 700,
							textAlign: 'center',
							fontSize: 16,
							marginRight: 30,
							cursor: 'pointer',
							opacity: this.state.value === 0 ? 0.3 : 1
						},
						className: 'box-shadow noselect'
					}}>
						-
					</div>
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
					<div {...{
						onClick: () => { this.plusMinus('plus'); },
						style: { float: 'left', width: 30, lineHeight: '30px', borderRadius: 15, backgroundColor: '#323f48', color: '#fff', fontWeight: 700, textAlign: 'center', fontSize: 16, marginLeft: 25, cursor: 'pointer' },
						className: 'box-shadow noselect'
					}}>
						+
					</div>
				</div>
				<FieldError {...{ isValid, errorMessage }} />
				{ textAfter ? (
					<div style={textAfter.style}>
						{textAfter.text}
					</div>) : null }
			</div>
		);
	}
}

export default CustomPlusMinus;
