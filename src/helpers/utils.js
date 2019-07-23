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
		item.hideIf.map((v) => {
			const control = controls.filter(o => o.name === v.field);
			let controlValue = '';
			if (control[0].control === 'check') {
				controlValue = control[0].value ? control[0].value : control[0].default;
			} else {
				controlValue = control[0].value ? control[0].value : '';
				controlValue = controlValue === '' ? control[0].default : controlValue;
				controlValue = controlValue ? controlValue : '';
			}
			if (control.length > 0 && controlValue.toString().match(v.regEx) !== null) hide = true;
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
		console.log('error', e);
		return item.options;
	}
};
