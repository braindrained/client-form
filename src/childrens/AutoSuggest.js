import React, { Component, createElement, Fragment, forwardRef } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

const el = createElement;

class AutoSuggest extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      suggestions: [],
      currentSuggestion: 0,
      value: this.props.value,
      isLoading: false
    }
  }

  onChange(e) {
    const { name, onUpdate } = this.props;
    const { value } = e.target;

    if (value.length >= 3) {
      this.setState({ isLoading: true, value: { displayValue: value } });

      if (localStorage.getItem(value) !== null) {
        this.setState({
          isLoading: false,
          suggestions: JSON.parse(localStorage.getItem(value))
        });
      } else {
        const { autoSuggestFetch, cacheResults } = this.props;
        autoSuggestFetch(value).then((response) => {
          const { data, succeed } = response;
          if (response) {
            if (cacheResults) localStorage.setItem(value, JSON.stringify(data));
            this.setState({
              isLoading: false,
              suggestions: data,
              currentSuggestion: 0
            });
          } else {
            this.setState({
              isLoading: false,
              suggestions: [],
              currentSuggestion: 0
            });
          }
        });
      }
    } else if (value === '') {
      this.setState({ value: {} });
      onUpdate({ target: { name: name, value: {} } });
		} else {
      this.setState({ value: { displayValue: value } });
    }
  }

  onKeyDown(e) {
    const { getValue, onUpdate, name } = this.props;
    const { suggestions, currentSuggestion } = this.state;
    let returnVal = {};

    switch (e.keyCode) {
      case 13:
        if (suggestions.length > 0) {
          const selectedSuggestion = suggestions[currentSuggestion];
          returnVal = getValue(suggestions[currentSuggestion]);

          this.setState({ value: returnVal, suggestions: [], currentSuggestion: -1 });
          onUpdate({ target: { name: name, value: returnVal } });
        }
        break;
      case 38:
        if (currentSuggestion === 0) break;
        returnVal = getValue(suggestions[currentSuggestion - 1]);

        this.setState({
          currentSuggestion: currentSuggestion - 1,
          value: returnVal
        });
        break;
      case 40:
        if (currentSuggestion === suggestions.length) break;
        returnVal = getValue(suggestions[currentSuggestion + 1]);

        this.setState({
          currentSuggestion: currentSuggestion + 1,
          value: returnVal
        });
        break;
      default:
        break;
    }
  }

  handleClick(item) {
    const { onUpdate, name, getValue } = this.props;
    const returnVal = getValue(item);

    onUpdate({ target: { name: name, value: returnVal } });
  }

  render() {
    const { name, label, isValid, isRequired, errorMessage, placeholder, innerRef, autoComplete, disabled, className, style } = this.props;
    const { suggestions, currentSuggestion, value, isLoading } = this.state;
    const { displayValue } = value;

    return el('div', { className: sumClasses(['container-field autosuggest', className]), style },
      el(FieldLabel, { label, name, isRequired, isValid }),
      el('input', {
        onChange: e => this.onChange(e),
        onKeyDown: e => this.onKeyDown(e),
        value: displayValue || '',
        placeholder: camelToTitle(placeholder, name),
				name,
				id: name,
        disabled,
				autoComplete,
				ref: innerRef
      }),
      el('div', { className: 'autosuggest-suggestions box-shadow' },
        suggestions.map((item, i) => {
          return el('div', {
            key: `sugg_${i}`,
            onClick: () => this.handleClick(item),
            className: currentSuggestion === i ? 'autosuggest-suggestion-selected' : 'autosuggest-suggestion'
          }, item.displayValue)
        })
      ),
      isLoading ? el('svg', { width: 48, height: 48, viewBox: '0 0 48 48', className: 'spin' },
      	el('circle', { cx: 24, cy: 24, fill: 'none', stroke: '#fff', strokeWidth: 2, r: 22, strokeDasharray: '80,20' })
      ) : null,
      el(FieldError, { isValid, errorMessage })
    );
  }
}

export default forwardRef((props, ref) =>
	el(AutoSuggest,
		Object.assign({}, props, { innerRef: ref })
	)
);