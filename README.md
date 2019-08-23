# Form component
A component exportable for standard forms, demo: https://braindrained.github.io/client-form/

#### Install from npm
```sh
> npm install client-form
or
> yarn add client-form
```

#### Developing
Clone, install dependencies and run the component in development mode.
```sh
> git clone git@github.com:braindrained/client-form.git client-form
> cd client-form
> yarn
> yarn start
```
Open http://localhost:3007 to view it in the browser.

#### Import the component

Import

`import Form from 'client-form';`

Use it

```sh
<Form {...{
	controls: [
		{
			control: 'text',
			type: 'text',
			name: 'firstName', // if label and placeholder are not specified this text will be the placeholder and label text decamelized
			limitChar: 25, // length check
		}
	],
	sendButton: {
		text: 'Save changes',
		style: { margin: '0 auto', float: 'none' },
	},
	sendForm: (e) => {
		const promise = new Promise((resolve, reject) => {
			yourFetch({ dataObject: e }).then((x) => {
				if (x.succeed) {
					resolve({ succeed: true, message: 'success mesage' });
				} else {
					reject({ succeed: false, message: 'error message' });
				}
			});
		});
		return promise;
	}
}}/>
```
