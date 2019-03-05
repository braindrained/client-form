import React from 'react';
import { render } from 'react-dom';

import Form from '../../src';
import { makeId } from '../../src/helpers/utils';
import { tipologies, priceRanges, energy } from  './var';
import CustomComp from './CustomComp';
import './favicon.ico'

const el = React.createElement;

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
	    <Form {...{
				controls: [
					{
						control: 'label',
						name: 'label-1',
						content: 'This is a text only label',
						style: { lineHeight: '40px', clear: 'both', width: '100%', fontSize: 16, marginBottom: 20 },
						className: 'tabTextArea noselect'
					},
					{
						control: 'text',
						label: {
							text: 'Nome',
							className: 'label-class'
						},
						placeholder: 'Nome',
						type: 'text',
						name: 'firstName',
						limitChar: 25,
						errorMessage: 'Mandatory field',
						isRequired: true
					},
					{
						control: 'text',
						type: 'text',
						name: 'lastName',
						limitChar: 25,
						errorMessage: 'Mandatory field',
						isRequired: true
					},
					{
						control: 'fakeselect',
						name: 'priceRange',
						text: 'Seleziona...',
						label: {
							text: 'Fake select min/max'
						},
						style: { maxHeight: 76 },
						rangesStyle: { width: 190, maxWidth: 190 },
						value: { min: '', max: '' },
						firstRange: priceRanges,
						secondRange: priceRanges,
						overlayBg: '#fff'
					},
					{
						control: 'text',
						type: 'text',
						name: 'age',
						onlyNumber: true,
						limitChar: 3
					},
					{
						control: 'plusMinus',
						type: 'text',
						name: 'roomNum',
						label: {
							text: 'N. Locali',
						},
						value: 0,
					},
					{
						control: 'select',
						name: 'propertyTypeId',
						hideRadio: true,
						options: tipologies.filter(o => o.type.indexOf(parseFloat(1)) !== -1),
						value: '',
						optionIf: [],
					},
					{
						control: 'radio',
						name: 'thisIsAFakeRadio',
						options: [
							{ value: '', label: 'N.i.', className: 'first' },
							{ value: true, label: 'Sì', className: 'central' },
							{ value: false, label: 'No', className: 'last' },
						],
						default: '',
						value: '',
						hideRadio: true,
						className: 'custom-radio-container',
					},
					{
						control: 'radio',
						name: 'genericRadio',
						label: { text: 'This is an almost real radio' },
						options: [
							{ value: '', label: 'N.i.', style: { width: '100%', float: 'left' } },
							{ value: true, label: 'Sì', style: { width: '100%', float: 'left' } },
							{ value: false, label: 'No', style: { width: '100%', float: 'left' } },
						],
						default: '',
						value: '',
						hideRadio: false,
					},
					{
						control: 'text',
						type: 'text',
						name: 'anotherText',
						onlyNumber: false,
						placeholder: 'Another text input',
						label: { text: 'Another text input with limitChar 25' },
						value: '',
						limitChar: 25,
					},
					{
						control: 'check',
						name: 'thisIsACheckBox',
						label: { text: 'This is an almost real checkbox' },
						value: false,
						hideCheck: false,
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
					{
						control: 'text',
						type: 'password',
						name: 'repeatPassword',
						onlyNumber: false,
						limitChar: 12,
						equalTo: 'password',
						errorMessage: 'Must be equal',
					},
					{
						control: 'label',
						name: 'label-2',
						content: el('div', { style: { color: '#fff', background: 'rgb(50, 63, 72)', paddingLeft: 8 } }, 'This is an element based label'),
						style: { lineHeight: '40px', clear: 'both', width: '100%', fontSize: 16, marginBottom: 20 },
						className: 'tabTextArea noselect'
					},
					{
						control: 'textArea',
						name: 'thisIsATextArea',
						value: '',
						limitChar: 1000,
					},
					{
						control: 'text',
						type: 'text',
						name: 'aMinimalTextField',
					},
					{
						control: 'label',
						name: 'label-3',
						style: { clear: 'both', width: '100%' }
					},
					{
						control: 'text',
						type: 'text',
						name: 'currencyField',
						currency: true,
						onlyNumber: true,
					},
					{
						control: 'tabTextArea',
						name: 'aMultipleDescriptionFieldThatStripHTMLCauseWeDontLikeHTMLInTextArea',
						value: [
							{ name: 'listingDescIt', value: '', isRequired: false, isValid: true, label: 'Italiano', abbr: 'IT', placeholder: 'Inserisci qui la descrizione' },
							{ name: 'listingDescEn', value: '', isRequired: false, isValid: true, label: 'Inglese', abbr: 'EN', placeholder: 'Descrizione inglese' },
							{ name: 'listingDescFr', value: '', isRequired: false, isValid: true, label: 'Francese', abbr: 'FR', placeholder: 'Descrizione francese' },
							{ name: 'listingDescEs', value: '', isRequired: false, isValid: true, label: 'Spagnolo', abbr: 'ES', placeholder: 'Descrizione spagnolo' },
							{ name: 'listingDescDe', value: '', isRequired: false, isValid: true, label: 'Tedesco', abbr: 'DE', placeholder: 'Descrizione tedesco' }
						],
						isValid: true,
						errorMessage: 'The italian description is mandatory',
						className: 'tabTextArea',
						valueAsObject: true,
						limitChar: 4000
					},
					{
						control: 'external',
						component: CustomComp,
						props: {
							name: 'thisIsACustomExternalComponent',
							key: 'thisIsACustomExternalComponent',
							value: [
								{ name: 'firstField', value: '', isRequired: false, isValid: true, placeholder: '\'cause I need a complete customized one', },
								{ name: 'secondFieldWithEmptyPlaceholder', value: '', isRequired: false, isValid: true, placeholder: '', },
							],
							isValid: true,
							className: 'container-field tabTextArea',
							style: {
								background: 'rgb(50, 63, 72)',
								clear: 'both',
								borderRadius: 4,
								marginTop: 20,
								position: 'relative',
								clear: 'both',
								display: 'inline-block',
								padding: 20,
								color: '#fff'
							},
							valueAsObject: true
						},
						exclude: false
					},
				],
				textBeforeButton: el('div', {
					style: { clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }
				}, 'This is a text before button'),
				sendButton: {
					text: 'Save',
					errorText: 'Error saving data',
					succeedText: 'Saved!',
					style: { minWidth: 250, margin: '0 auto', float: 'none' }
				},
				textAfterButton: el('div', {
					style: { clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }
				}, 'Look in the console for the output object'),
				buttonContainerStyle: { textAlign: 'center' },
				sendForm: (e) => {
					console.log(e);
					var promise = new Promise((resolve, reject) => {
			      window.setTimeout(() => {
			        resolve({ succeed: true });
			      }, 2000);
			    });
			    return promise;
				},
				key: makeId(),
				formStyle: {
					maxWidth: 560,
					margin: '0 auto'
				},
				noUndefined: false
			}}/>
		)
	}
}

render(<App />, document.getElementById("client-form"));
