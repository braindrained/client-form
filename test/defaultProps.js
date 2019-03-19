export const defaultProps = {
	controls: [
		{
			control: 'text',
			type: 'text',
			name: 'age',
			onlyNumber: true,
			limitChar: 3,
			value: 4
		},
		{
			control: 'text',
			type: 'text',
			name: 'name',
			value: ''
		},
		{
			control: 'text',
			type: 'password',
			name: 'password',
			onlyNumber: false,
			limitChar: 12,
			errorMessage: 'Mandatory field',
			isRequired: true
		},
	],
	sendButton: { text: 'Save' },
	sendForm: (e) => {
		var promise = new Promise((resolve, reject) => {
			window.setTimeout(() => {
				resolve({ succeed: true, message: 'Saved!' });
			}, 2000);
		});
		return promise;
	},
};
