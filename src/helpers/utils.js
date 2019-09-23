// @flow
export const makeId = () => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 5; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const camelToTitle = (str: string, name: string) => str === null || str === undefined ?
	name.replace(/([a-z\d])([A-Z])/g, '$1  $2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2')
		.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
	: str;

export const sumClasses = (classes: Array<string>) => {
	const filteredClasses = classes.filter(o => o !== '' && o !== undefined);
	let returnEach = '';
	filteredClasses.map((item, i) => {
		returnEach += i === filteredClasses.length - 1 ? `${item}` : `${item} `;
		return null;
	});
	return returnEach;
};

/* eslint-disable-next-line */
export const isInt = (value: any) => !isNaN(value) && (x => (x | 0) === x)(parseFloat(value));

export const notEmpty = (val: any) => val !== null && val !== undefined && val !== '';

export const hideField = (item: Object, controls: Array<Object>) => {
	try {
		if (!item.hideIf) return false;
		let hide = false;
		item.hideIf.map(v => {
			const control = controls.filter(o => o.name === v.field);
			if (!control[0].hide) {
				let controlValue = '';
				if (control[0].control === 'check') {
					controlValue = control[0].value ? control[0].value : control[0].default;
				} else if (control[0].control !== 'check') {
					if (control[0].value === 0) {
						controlValue = control[0].value;
					} else {
						controlValue = control[0].value ? control[0].value : '';
						controlValue = controlValue === '' ? control[0].default : controlValue;
						controlValue = controlValue || '';
					}
				}
				if (v.regEx && control.length > 0 && v.regEx.test(controlValue.toString())) hide = true;
				if (!v.regEx && control.length > 0 && v.values.indexOf(controlValue) !== -1) hide = true;
			}
			return null;
		});
		return hide;
	} catch (e) {
		return false;
	}
};

export const optionsIf = (item: Object, controls: Array<Object>, el: Object) => {
	try {
		let options;
		item.optionIf.map((v, i) => {
			if (i === 0) options = v.options;
			const control = controls.filter(o => o.name === v.field);
			if (control.length > 0) {
				if (el.target.name === v.field) item.value = '';
				const controlValue = control[0].value !== '' ? control[0].value : control[0].default;
				options = options.filter(o => o.type[v.field].indexOf(parseFloat(controlValue)) !== -1);
			}
			return null;
		});
		return options;
	} catch (e) {
		console.log('optionsIf error', e);
		return item.options;
	}
};

export const valuesOf = (item: Object, controls: Array<Object>) => {
	try {
		item.valueOf.map(v => {
			const control = controls.filter(o => o.name === v.field);
			item[v.propTo] = v.do(control[0][v.propFrom]);
			return null;
		});
		return item;
	} catch (e) {
		console.log('valuesOf error', e);
		return item;
	}
};

export const output = (controls: Array<Object>, excludeHidden: boolean) => {
	const formObject = {};
	controls.filter(o => o.control !== 'label' && o.exclude !== true && (excludeHidden === true ? !o.hide : true)).map(item => {
		let { value } = item;
		const { valueAsObject, currency, name } = item;
		if (typeof value === 'object' && valueAsObject) {
			const valueObject = {};
			value.map(itemx => {
				valueObject[itemx.name] = itemx.value;
				return null;
			});
			value = valueObject;
		}
		if (currency && value !== undefined && value !== null && value !== '' && value !== 0 && !isInt(value)) {
			value = value.replace(/\./g, '');
		}
		value = value === undefined || value === null ? null : value.toString() === 'true' ? true : value.toString() === 'false' ? false : value;
		formObject[name] = value;
		return null;
	});
	return formObject;
};

export const findFirstRequired = (element, name) => {
	if (element.childNodes) {
		for (let i = 0; i < element.childNodes.length; i++) {
			if (element.childNodes[i].name === name) element.childNodes[i].focus();
			findFirstRequired(element.childNodes[i], name);
		}
	}
};

export const merge = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);
