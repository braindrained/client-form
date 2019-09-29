import React, { Component, createElement, Fragment, createRef } from 'react';
import { render } from 'react-dom';

import Form from '../../src';
import { makeId } from '../../src/helpers/utils';
import { tipologies, priceRanges, energy } from  './var';
import CustomComp from './CustomComp';
import './favicon.ico';

const el = createElement;

class App extends Component {

	constructor(props) {
		super(props);

		this.myForm = createRef();
	}

	componentDidMount() {
		//console.log('this', this.myForm);
	}

	render() {
		const prpMail = undefined;
		const contractTypeId = 1;

		return el(Form, {
			ref: this.myForm,
			controls: [
				{
					control: 'label',
					content: 'Form demo page',
					style: { lineHeight: '40px', clear: 'both', margin: '0 auto', fontSize: 16, marginBottom: 20 },
					className: 'noselect tabTextArea'
				},
				{
					control: 'text',
					type: 'hidden',
					name: 'categoryTypeId',
					value: 1,
				},
				{
					control: 'radio',
					name: 'genericRadio',
					label: { text: 'This is an almost real radio' },
					options: [
						{ value: undefined, label: 'Maybe', style: { width: '100%', float: 'left' }, selectedClassName: 'selected-class', disabled: true },
						{ value: true, label: 'Yes', style: { width: '100%', float: 'left' }, selectedClassName: 'selected-class', disabled: true },
						{ value: false, label: 'No', style: { width: '100%', float: 'left' }, selectedClassName: 'selected-class', disabled: true },
					],
					default: undefined,
					hideRadio: false,
				},
				{
					control: 'text',
					type: 'text',
					name: 'priceMax',
					onlyNumber: true,
					placeholder: '',
					label: {
						text: 'Price',
						changeIf: [
							{
								field: 'genericRadio',
								regEx: /^true$/,
								ifTrue: 'Weekly price',
								ifFalse: 'Price'
							}
						]
					},
					value: '',
					currency: true,
					isRequired: true,
					errorMessage: 'Mandatory field',
					unit: '€',
					autoComplete: 'new-password'
				},
				{
					control: 'listbox',
					name: 'yourFuckingFashionListbox',
					label: { text: 'A Fashion Listbox With desc' },
					options: [
						{ value: ' ', label: 'Select something...', className: 'first' },
						{ value: 1, label: 'First option', className: 'central', addLabel: `I describe you what you're selecting 'cause you're too stupid to understand just the label` },
						{ value: 2, label: 'Second option', className: 'central', addLabel: 'This is a very long description that mean nothing but I need it to test the possible length of the description of the option of this beautiful fancy listbox that make your eyes shine' },
						{ value: 3, label: 'Third option', className: 'central' },
						{ value: 4, label: 'Fourth option', className: 'central' },
						{ value: 5, label: 'Fifth option', className: 'central' },
						{ value: 6, label: 'Sixth option', className: 'central' },
						{ value: 7, label: 'Seventh option', className: 'central' },
					],
					default: ' ',
					value:	' ',
					minEl: 7,
					isRequired: true,
					errorMessage: 'Mandatory field',
				},
				{
					control: 'select',
					name: 'aNormalSelect',
					//label: { text: 'normal select' },
					options: [
						{ value: ' ', label: 'Select something...', className: 'first' },
						{ value: 1, label: 'First option', className: 'central' },
						{ value: 2, label: 'Second option', className: 'central' },
						{ value: 3, label: 'Third option', className: 'central' },
						{ value: 4, label: 'Fourth option', className: 'central' },
						{ value: 5, label: 'Fifth option', className: 'central' },
						{ value: 6, label: 'Sixth option', className: 'central' },
						{ value: 7, label: 'Seventh option', className: 'central' },
					],
					default: ' ',
					value:	' ',
				},
				{
					control: 'label',
					content: 'This is a text only label',
					style: { lineHeight: '40px', clear: 'both', margin: '0 auto', fontSize: 16, marginBottom: 20 },
					className: 'noselect tabTextArea'
				},
				{
					control: 'check',
					name: 'fakeCheckBoxWithCustomSvg',
					value: false,
					customSvg: {
						svgProps: { width: 36, height: 24, viewBox: '0 0 36 24' },
						forTrue: el(Fragment, {},
							el('rect', {
								width: 30, height: 16, rx: 8, ry: 8, x: 4, y: 4,
								style: { fill: 'rgb(0, 132, 255)', strokeWidth: 2, stroke: 'rgb(0, 132, 255)' }
							}),
							el('circle', { cx: 26, cy: 12, r: 7, style: { fill: 'rgb(255, 255, 255)' } })
						),
						forFalse: el(Fragment, {},
							el('rect', {
								width: 30, height: 16, rx: 8, ry: 8, x: 4, y: 4,
								style: { fill: 'rgb(216, 216, 223)', strokeWidth: 2, stroke: 'rgb(216, 216, 223)' } }),
							el('circle', { cx: 12, cy: 12, r: 7, style: { fill: 'rgb(255, 255, 255)' } })
						)
					}
				},
				{
					control: 'text',
					label: {
						text: 'Name',
						className: 'label-class'
					},
					placeholder: 'Name',
					type: 'text',
					name: 'firstName',
					limitChar: 25,
					autoComplete: 'new-password'
				},
				{
					control: 'listbox',
					name: 'yourFuckingFashionListboxWhitoutDesc',
					label: { text: 'A Fashion Listbox Whitout Desc' },
					options: [
						{ value: 0, label: 'Select something...' },
						{ value: 1, label: 'First option', className: 'central' },
						{ value: 2, label: 'Second option', className: 'central' },
						{ value: 3, label: 'Third option', className: 'central' },
					],
					default: 0
				},
				{
					control: 'text',
					type: 'text',
					name: 'lastName',
					limitChar: 25,
				},
				{
					control: 'text',
					type: 'text',
					name: 'age',
					onlyNumber: true,
					limitChar: 3,
					value: 4
				},
				/*{
					control: 'fakeselect',
					name: 'priceRange',
					text: 'Select something...',
					label: {
						text: 'Fake select min/max'
					},
					style: { maxHeight: 76 },
					rangesStyle: { width: 190, maxWidth: 190 },
					value: { min: '', max: '' },
					firstRange: priceRanges,
					secondRange: priceRanges,
					overlayBg: '#fff'
				},*/
				{
					control: 'text',
					type: 'text',
					name: 'prpMail',
					placeholder: '',
					label: {
						text: 'Indirizzo Email',
					},
					regEx: /(^$|^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$)/i,
					errorMessage: 'Enter a valid e-mail address please',
					limitChar: 60,
				},
				{
					control: 'plusMinus',
					type: 'text',
					name: 'roomNum',
					label: { text: 'Room number' },
					value: 0
				},
				{
					control: 'check',
					name: 'thisIsACheckBox',
					label: { text: 'This is an almost real checkbox' },
					value: false,
				},
				{
					control: 'text',
					type: 'password',
					name: 'password',
					onlyNumber: false,
					limitChar: 12,
				},
				{
					control: 'text',
					type: 'password',
					name: 'repeatPassword',
					onlyNumber: false,
					limitChar: 12,
					equalTo: 'password',
					errorMessage: 'Password must be equal',
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
					style: { lineHeight: '40px', clear: 'both', fontSize: 16, margin: '0 auto', marginBottom: 20 },
					className: 'noselect tabTextArea'
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
					placeholder: '',
					currency: true,
					onlyNumber: true,
					unit: '€'
				},
				{
					control: 'text',
					type: 'text',
					name: 'squareMeterField',
					placeholder: '',
					onlyNumber: true,
					unit: 'm²'
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
						{ name: 'listingDescIt', value: '', isRequired: true, isValid: true, label: 'Spaghetti', abbr: 'IT', placeholder: 'Italian description' },
						{ name: 'listingDescEn', value: '', isRequired: false, isValid: true, label: 'Fish & Chips', abbr: 'EN', placeholder: 'English description' },
						{ name: 'listingDescFr', value: '', isRequired: false, isValid: true, label: 'Baguettes', abbr: 'FR', placeholder: 'French description' },
						{ name: 'listingDescEs', value: '', isRequired: false, isValid: true, label: 'Tapas', abbr: 'ES', placeholder: 'Spanish description' },
						{ name: 'listingDescDe', value: '', isRequired: false, isValid: true, label: 'Würstel', abbr: 'DE', placeholder: 'German description' }
					],
					isValid: true,
					className: 'tabTextArea',
					valueAsObject: true,
					limitChar: 4000,
					errorMessage: 'Italian description is mandatory'
				},
				{
					control: 'external',
					component: CustomComp,
					name: 'thisIsACustomExternalComponent',
					key: 'thisIsACustomExternalComponent',
					value: [
						{ name: 'firstField', value: '', isRequired: true, isValid: true, placeholder: '\'cause I need a complete customized one', errorMessage: 'Mandatory field' },
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
						color: '#fff',
						marginBottom: 15
					},
					valueAsObject: true,
					exclude: false,
				},
				{
					control: 'radio',
					name: 'thisIsAFakeRadio',
					options: [
						{ value: undefined, label: '--', className: 'first' },
						{ value: true, label: 'Yes', className: 'central' },
						{ value: false, label: 'No', className: 'last' },
					],
					default: undefined,
					value: undefined,
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
					className: 'tabTextArea'
				},
				{
					control: 'label',
					name: '',
					content: 'The below component appear and change its value depending on the above selection',
					style: { clear: 'both', padding: '20px 0px 30px', margin: '0 auto', },
					className: 'tabTextArea'
				},
				{
					control: 'radio',
					name: 'energyClassId',
					options: energy.filter(o => o.type['energyClass'].indexOf(parseFloat(997)) !== -1),
					value: 0,
					default: 0,
					hideRadio: true,
					className: 'custom-energy resize-mobile tabTextArea',
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
				{
					control: 'radio',
					name: 'contractTypeId',
					label: { text: 'Contratto' },
					value: contractTypeId,
					hideRadio: false,
					options: [
						{ value: 1, label: 'Buy', style: { width: 137, float: 'left' }, selectedClassName: 'option-override' },
						{ value: 2, label: 'Rent', style: { width: 137, float: 'left' }, selectedClassName: 'option-override' },
					],
				},
				{
					control: 'check',
					name: 'hasPurchaseOption',
					//label: { text: 'This appear if the previuos selection is Rent' },
					value: false,
					hideIf: [
						{ field: 'contractTypeId', regEx: /^1$/ }
					],
				},
				{
					control: 'check',
					name: 'isAuction',
					//label: { text: `Asta` },
					value: false,
					hideIf: [
						{ field: 'contractTypeId', regEx: /^2$/ }
					]
				},
			],
			beforeButton: el('div', {
				style: { clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }
			}, 'This is a text before button'),
			sendButton: {
				text: 'Save changes',
				style: { margin: '0 auto', float: 'none' }
			},
			afterButton: el('div', {
				style: { clear: 'both', fontSize: 11, lineHeight: '30px', textAlign: 'center' }
			}, '(Look in the console for the output object)'),
			buttonContainerStyle: { textAlign: 'center' },
			sendForm: (e) => {
				console.log('sendForm', e);
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
		})
	}
}

render(<App />, document.getElementById("client-form"));
