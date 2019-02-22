# Form component
A component exportable for standard forms
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
> git tag 0.0.4
> git push origin --tag
```
#### Import the component
Add in you package.json

`"client-form": git+ssh://git@bitbucket.org:casait/it.casa.client.form.git#0.0.4`

Install
```sh
> yarn
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
			name: 'firstName',
			limitChar: 25,
		}
	],
	sendButton: {
		text: 'Save',
		errorText: 'Error saving data',
		succeedText: 'Saved!',
		style: { minWidth: 250, margin: '0 auto', float: 'none' }
	},
	sendForm: (e) => { this.sendForm(e); }, // your function that fetch data
	key: 'randomKey',
	succeed: editSucceed, // get it from the state
	isSent: editDataSpin, // get it from the state
}}/>
```
#### Build to every page
Builds the component for production to the `examples/dist` folder.
```sh
> yarn build
```
Use it

```sh
<div id="client-form"></div>
<script type="text/javascript" src="bundle.js"></script>
```
