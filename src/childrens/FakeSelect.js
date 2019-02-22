// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ClickOutHandler from 'react-onclickout';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { sumClasses } from '../helpers/utils';

// flow-disable-next-line
import './FakeSelect.scss';

class FakeSelect extends React.Component<any, any> {

	static defaultProps = {
		value: null,
		onUpdate: null,
		name: '',
		className: '',
		style: {},
		label: {},
		text: '',
		firstRange: null,
		secondRange: null,
		rangesStyle: null
	};

	state = {
		value: this.props.value,
		displaySelect: true
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.value !== nextProps.value) return true;
		if (this.state.value !== nextState.value) return true;
		if (this.state.displaySelect !== nextState.displaySelect) return true;
    return false;
	}

	onClick(val: boolean) {
		if (val !== this.state.displaySelect) {
			this.setState({
				displaySelect: val
			});
		}
	}

	onChange(event: Object) {
		const val = {
			min: event.target.name === 'min' ? event.target.value : this.props.value.min,
			max: event.target.name === 'max' ? event.target.value : this.props.value.max
		};
		this.setState({
			value: val
		});
		this.props.onUpdate({
			target: {
				name: this.props.name,
				value: val
			}
		});
	}

	render() {
		const { className, style, label, text, firstRange, secondRange, rangesStyle, isRequired, name, errorMessage } = this.props;
		const { displaySelect, value } = this.state;
		const maxRange = this.props.value.min === '' ? secondRange : secondRange.filter(o => o.value > this.props.value.min || o.value === '');
		const { isValid } = this.state;

		return (
			<div className={sumClasses(['field-container', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }}/>
				<div {...{
					className: 'select-style noselect',
					onClick: () => { this.onClick(false); },
					style: { zIndex: displaySelect ? 1 : 0, paddingLeft: 8 }
				}}>

						{
							value.min !== '' && value.max !== '' ?
								`${value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')} -
								${value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
								:
								value.min !== '' && value.max === '' ?
									`da ${value.min.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
									:
									value.min === '' && value.max !== '' ?
										`fino a ${value.max.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
										:
										text
						}

				</div>
				<FieldError {...{ isValid, errorMessage }} />
				<ClickOutHandler onClickOut={() => { this.onClick(true); }} style={{ maxHeight: 57 }}>
					<div className="fake-cont" style={{ width: style.maxWidth, opacity: displaySelect ? '0' : '1', zIndex: displaySelect ? -1 : 1 }}>
						<div className="min-max">Min</div>
						<div className="select-style" style={Object.assign({}, rangesStyle, { marginBottom: 15, float: 'right' })}>
							<select name="min" id="min" value={this.props.value.min} onChange={(o) => { this.onChange(o); }}>
								{
									firstRange.map(item => <option value={item.value} key={`f_${item.value}`}>{item.text}</option>)
								}
							</select>
						</div>
						<div className="clear" />
						<div className="min-max">Max</div>
						<div className="select-style" style={Object.assign({}, rangesStyle, { marginBottom: 15, float: 'right' })}>
							<select name="max" id="max" value={this.props.value.max} onChange={(o) => { this.onChange(o); }}>
								{
									maxRange.map(item => <option value={item.value} key={`f_${item.value}`}>{item.text}</option>)
								}
							</select>
						</div>
					</div>
				</ClickOutHandler>
			</div>
		);
	}
}

FakeSelect.propTypes = {
	value: PropTypes.instanceOf(Object),
	onUpdate: PropTypes.func,
	name: PropTypes.string,
	className: PropTypes.string,
	style: PropTypes.instanceOf(Object),
	label: PropTypes.instanceOf(Object),
	text: PropTypes.string,
	firstRange: PropTypes.instanceOf(Object),
	secondRange: PropTypes.instanceOf(Object),
	rangesStyle: PropTypes.instanceOf(Object)
};

FakeSelect.defaultProps = {
	value: null,
	onUpdate: null,
	name: '',
	className: '',
	style: {},
	label: {},
	text: '',
	firstRange: null,
	secondRange: null,
	rangesStyle: null
};

export default FakeSelect;
