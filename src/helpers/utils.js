// @flow
import moment from 'moment';

moment.locale('it');

export const makeId = () => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 5; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const notEmpty = (val: any) => val !== null && val !== undefined && val !== '';

export const camelToTitle = (str: string, name: string) => str === null ? name.replace(/([A-Z][a-z]+)/g, ' $1') // Words beginning with UC
	.replace(/([A-Z][A-Z]+)/g, ' $1') // "Words" of only UC
	.replace(/([^A-Za-z ]+)/g, ' $1') // "Words" of non-letters
	.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
	: str;

export const sumClasses = (classes: Array<string>) => {
	const filteredClasses = classes.filter(o => o !== '');
	let returnEach = '';
	filteredClasses.map((item, i) => {
		returnEach += i === filteredClasses.length - 1 ? `${item}` : `${item} `;
		return null;
	});
	return returnEach;
};
