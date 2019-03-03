// @flow
import React from 'react';
import { sumClasses } from '../helpers/utils';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';

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

		return (
			<div className={sumClasses(['container-field', className])} style={style}>
				<FieldLabel {...{ label, name, isRequired, isValid }} />
				<div className="container-field-tabs" id={name}>
					{ this.state.value.map((item, i) => (
						<div {...{
							key: item.name,
							style: {
								borderRadius: i === 0 ? '2px 0px 0px 0px' : i === 4 ? '0px 2px 0px 0px' : '0px',
								textAlign: 'left',
							},
							className: this.state.selected === i ? 'container-field-tabs-item container-field-tabs-item-selected' : 'container-field-tabs-item',
							onClick: this.selectTab.bind(this, i),
							role: 'button'
						}}>
							<div className="noselect">
								<span className="tab-label">{item.label}</span>
								<span className="tab-abbr">{item.abbr}</span>
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
									border: !isValid ? '1px solid #e4002b' : '1px solid #d8dbdf'
								},
								rows: 2,
								cols: 20
							}} />
						</div>
						<div className="limit-char noselect">
							{item.value.length}/{limitChar}
						</div>
					</div>
				))}
				<FieldError {...{ isValid, errorMessage, style: { paddingRight: 60 } }} />
			</div>
		);
	}
}

export default CustomTextareaWithTab;
