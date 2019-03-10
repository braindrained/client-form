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
		const prpMail = undefined;

		return (
	    <Form {...{
				controls: [
					/*
					{
						control: 'label',
						name: 'label-1',
						content: 'This is a text only label',
						style: { lineHeight: '40px', clear: 'both', width: '100%', fontSize: 16, marginBottom: 20 },
						className: 'noselect'
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
						control: 'text',
						type: 'number',
						name: 'age',
						onlyNumber: true,
						limitChar: 3
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
						name: 'prpMail',
						placeholder: '',
						label: {
							text: 'Indirizzo Email',
						},
						regEx: /(^$|^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$)/i,
						errorMessage: 'Inserisci un indirizzo mail valido',
						limitChar: 60,
					},
					{
						control: 'plusMinus',
						type: 'number',
						name: 'roomNum',
						label: {
							text: 'N. Locali',
						},
						value: 0,
					},
					{
						control: 'check',
						name: 'thisIsACheckBox',
						label: { text: 'This is an almost real checkbox' },
						value: false,
						hideCheck: false,
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
						control: 'label',
						name: 'label-2',
						content: el('div', { style: { color: '#fff', background: 'rgb(50, 63, 72)', paddingLeft: 8 } }, 'This is an element based label'),
						style: { lineHeight: '40px', clear: 'both', width: '100%', fontSize: 16, marginBottom: 20 },
						className: 'noselect'
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
						type: 'number',
						name: 'currencyField',
						currency: true,
						onlyNumber: true,
					},
					{
						control: 'tabTextArea',
						name: 'aMultipleDescriptionFieldThatStripHTMLCauseWeDontLikeHTMLInTextArea',
						label: {
							style: {
								display: 'none'
							}
						},
						value: [
							{ name: 'listingDescIt', value: '', isRequired: true, isValid: true, label: 'Italiano', abbr: 'IT', placeholder: 'Inserisci qui la descrizione' },
							{ name: 'listingDescEn', value: '', isRequired: false, isValid: true, label: 'Inglese', abbr: 'EN', placeholder: 'Descrizione inglese' },
							{ name: 'listingDescFr', value: '', isRequired: false, isValid: true, label: 'Francese', abbr: 'FR', placeholder: 'Descrizione francese' },
							{ name: 'listingDescEs', value: '', isRequired: false, isValid: true, label: 'Spagnolo', abbr: 'ES', placeholder: 'Descrizione spagnolo' },
							{ name: 'listingDescDe', value: '', isRequired: false, isValid: true, label: 'Tedesco', abbr: 'DE', placeholder: 'Descrizione tedesco' }
						],
						isValid: true,
						isRequired: true,
						errorMessage: 'The italian description is mandatory',
						className: 'tabTextArea',
						valueAsObject: true,
						limitChar: 4000
					},
					{
						control: 'external',
						component: CustomComp,
						name: 'thisIsACustomExternalComponent',
						key: 'thisIsACustomExternalComponent',
						value: [
							{ name: 'firstField', value: '', isRequired: true, isValid: true, placeholder: '\'cause I need a complete customized one', errorMessage: 'Campo obbligatorio' },
							{ name: 'secondFieldWithEmptyPlaceholder', value: '', isRequired: false, isValid: true, placeholder: '', },
						],
						isValid: true,
						isRequired: true,
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
							color: '#fff',
							marginBottom: 15
						},
						valueAsObject: true,
						exclude: false
					},
					*/
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
						name: 'energyClass',
						options: energy.filter(o => o.value === 997 || o.value === 998 || o.value === 0 || o.value === 9 || o.value === 10 || o.value === 11).map(item => Object.assign({}, item, { style: { width: 'auto', float: 'left', marginRight: 15 } })),
						value: 0,
						default: 0,
						hideRadio: false,
						style: { width: '100%' }
					},
					{
						control: 'label',
						name: '',
						content: 'The below component change is vale depending on the above selection',
						style: { clear: 'both', width: '100%', height: 40, lineHeight: '40px' },
					},
					{
						control: 'radio',
						name: 'energyClassId',
						options: energy.filter(o => o.type.indexOf(parseFloat(997)) !== -1),
						value: 0,
						default: 0,
						hideRadio: true,
						style: { width: '100%' },
						className: 'custom-energy',
						hide: true,
						hideIf: [
							{ field: 'energyClass', regEx: /^(0|9|10|11)$/ }
						],
						optionIf: [
							{
								field: 'energyClass',
								options: energy
							},
						],
					},
				],
				beforeButton: el('div', {
					style: { clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }
				}, 'This is a text before button'),
				sendButton: {
					text: 'Save changes',
					style: { margin: '0 auto', float: 'none', paddingLeft: 40, paddingRight: 40 },
				},
				afterButton: el('div', {
					style: { clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }
				}, '(Look in the console for the output object)'),
				buttonContainerStyle: { textAlign: 'center' },
				sendForm: (e) => {
					console.log(e);
					var promise = new Promise((resolve, reject) => {
			      window.setTimeout(() => {
			        resolve({ succeed: true, message: 'Saved!' });
			      }, 2000);
			    });
			    return promise;
				},
				key: makeId(),
				formStyle: {
					maxWidth: 540,
					margin: '0 auto'
				},
				noUndefined: false
			}}/>
		)
	}
}

render(<App />, document.getElementById("client-form"));
