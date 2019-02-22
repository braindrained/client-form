// @flow
import React from 'react';
import PropTypes from 'prop-types';

class CustomTextareaWithTab extends React.Component<any, any> {

	static defaultProps = {
		value: [],
		errorMessage: null,
		isRequired: false,
		onUpdate: null
	};

	state = {
		tabs: this.props.tabs,
		value: this.props.value,
		selected: 0,
	};

	filterTabs(obj: Object) {
		if (this === obj.name) {
			return true;
		}
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
		const { className, style, device, name, isValid, tabs, value, limitChar } = this.props;

		return (
			<div className={`field-container ${className}`} style={style}>
				<div className="field-container-tabs" id={name}>
					{ this.state.tabs.map((item, i) => (
						<div {...{
							key: item.name,
							style: {
								borderRadius: i === 0 ? '4px 0px 0px 0px' : i === 4 ? '0px 4px 0px 0px' : '0px',
								textAlign: device === 'desktop' ? 'left' : 'center',
							},
							className: this.state.selected === i ? 'field-container-tabs-item field-container-tabs-item-selected' : 'field-container-tabs-item',
							onClick: this.selectTab.bind(this, i),
							role: 'button'
						}}>
							<div className="noselect">
								{device === 'desktop' ? item.label : item.abbr}
							</div>
						</div>
					))}
				</div>
				{ value.map((item, i) => (
					<div {...{
						key: item.name,
						style: {
							width: '100%',
							float: 'left',
							display: this.state.selected === i ? 'inline-block' : 'none',
							position: 'relative'
						}
					}}>
						<div>
							<textarea {...{
								placeholder: tabs[i].placeholder,
								className: 'large-field',
								name: item.name,
								id: item.name,
								onChange: (e) => { this.onChange(e); },
								value: item.value,
								style: {
									borderRadius: '0px 4px 4px',
									height: 200,
									resize: 'none',
									border: !isValid ? '1px solid #e4002b' : '1px solid #949da2'
								},
								rows: 2,
								cols: 20
							}} />
						</div>
						<div style={{ textAlign: 'right',
							position: 'absolute',
							width: '100%'
						}}>
							{ item.value.length }/{limitChar}
						</div>
					</div>
				))}
				<span className="validation-error">
					{ !isValid ? this.props.errorMessage : '' }
				</span>
			</div>
		);
	}
}

CustomTextareaWithTab.propTypes = {
	value: PropTypes.instanceOf(Object),
	errorMessage: PropTypes.string,
	isRequired: PropTypes.bool,
	onUpdate: PropTypes.func,
};

CustomTextareaWithTab.defaultProps = {
	value: [],
	errorMessage: null,
	isRequired: false,
	onUpdate: null,
};

export default CustomTextareaWithTab;
