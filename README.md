# Form component
A component exportable for standard forms, demo: https://braindrained.github.io/client-form/

#### Install from npm
```sh
> yarn add client-form
```

#### Developing
Clone, install dependencies and run the component in the development mode.
```sh
> git clone git@bitbucket.org:casait/it.casa.client.form.git client-form
> cd client-form
> yarn
> yarn start
```
Open http://localhost:3007 to view it in the browser.
#### Export the component
```sh
> yarn transpile
> git tag <version>
> git push origin --tag
```
#### Install and Import the component
Install
```sh
> yarn add git+ssh://git@bitbucket.org:casait/it.casa.client.form.git#<tag-version>
```
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
		text: 'Save', // button value
		errorText: 'Error saving data', // button value on error
		succeedText: 'Saved!', // button value on success
		style: { minWidth: 250, margin: '0 auto', float: 'none' }
	},
	sendForm: (e) => { this.sendForm(e); }, // your function that fetch data
	key: 'randomKey',
	succeed: editSucceed, // bool, get it from the state
	isSent: editDataSpin, // bool, get it from the state
}}/>
```
#### Build to every environment
Builds the component for production to the `examples/dist` folder.
```sh
> yarn build
```
Use it

```sh
<div id="client-form"></div>
<script type="text/javascript" src="bundle.js"></script>
```
