// @flow
import moment from 'moment';

moment.locale('it');

export const parseBool = (val: any, noNull: ?boolean) => {
	if (noNull) return val !== null && val !== undefined ? val : false;
	return val !== null && val !== undefined ? val.toString() : '';
};

export const replaceBool = (val: any) => val === '' ? null : (val === 'true' || val === 'on' || val === true);

export const replaceInt = (val: any) => val && val !== '' ? parseFloat(val) : null;

export const formatCurrency = (val: string) => val && val !== '' ? parseFloat(val.toString().replace(/[.]/g, '')) : null;

export const setEmpty = (val: any) => val !== null && val !== undefined ? val : '';

export const replaceVar = (template: string, variables: Object) => template.replace(new RegExp('{([^{]+)}', 'g'), (_unused, varName) => variables[varName]);

export const flatten = (input: Object) => {
	const output = {};
	Object.keys(input).forEach((key) => {
		if (key.toString() !== 'jwt' && key.toString() !== 'suburb' && key.toString() !== 'zone' && key.toString() !== 'region' && key.toString() !== 'province' && key !== 'projectProfileId') {
			const value = input[key];
			if (typeof value === 'object' && value !== null) {
				Object.keys(input[key]).forEach((keyChild) => {
					if (keyChild.toString() !== 'suburb' && keyChild.toString() !== 'zone' && keyChild.toString() !== 'region' && keyChild.toString() !== 'province' && keyChild !== 'townZone') {
						const valueChild = input[key][keyChild];
						output[keyChild] = valueChild;
					} else if (keyChild === 'townZone') {
						Object.keys(input[key][keyChild]).forEach((keyChildChild) => {
							if (keyChildChild.toString() === 'townZoneId') {
								const valueChildChild = input[key][keyChild][keyChildChild];
								output[keyChildChild] = valueChildChild;
							}
						});
					}
				});
			} else {
				output[key] = value === 'null' ? null : value;
			}
		}
	});
	return output;
};

export const formatDateIt = (date: string) => {
	if (moment(date, 'DD/MM/YYYY').isValid()) return date;

	const d = date ? new Date(date) : new Date();
	const day = d.getDate();
	const month = d.getMonth() + 1;
	const year = d.getFullYear();
	let nd = `${day}/${month}/${year}`;

	nd = nd.replace(/\d+/g, m => m.length === 1 ? '0'.substr(m.length - 1) + m : m);

	return nd;
};

export const dateObject = (date: string) => {
	const dateParts = date.split('/');
	return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
};

export const arrayToObject = (e: any) => {
	const newObject = {};
	e.map((item) => {
		newObject[item.name] = item.value;
		return null;
	});
	return newObject;
};

export const makeId = () => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 5; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const notEmpty = (val: any) => val !== null && val !== undefined && val !== '';

export const camelToTitle = (str: string, name: string) => {
    return str === null ? name.replace(/([A-Z][a-z]+)/g, " $1") // Words beginning with UC
    .replace(/([A-Z][A-Z]+)/g, " $1") // "Words" of only UC
    .replace(/([^A-Za-z ]+)/g, " $1") // "Words" of non-letters
		.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
		: str;
};

export const sumClasses = (classes: Array<string>) => {
	const filteredClasses = classes.filter(o => o !== '');
	let returnEach = '';
	filteredClasses.map((item, i) => {
		returnEach += i === filteredClasses.length - 1 ? `${item}` : `${item} `;
		return null;
	});
	return returnEach;
};
