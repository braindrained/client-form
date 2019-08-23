import React, { Component, createElement, Fragment, forwardRef } from 'react';
import FieldLabel from './childrenComponents/FieldLabel';
import FieldError from './childrenComponents/FieldError';
import { camelToTitle, sumClasses } from '../helpers/utils';

const el = createElement;

class AutoSuggest extends Component {

  constructor(props){
    super(props);
    const { value, autoComplete } = this.props;

    this.state = {
      suggestions: [],
      currentSuggestion: 0,
      value: value || {},
      isLoading: false,
      autoComplete
    }
  }

  onChange(e) {
    const { isLoading } = this.state;
    const { name, onUpdate, timeOut } = this.props;
    const { value } = e.target;

    if (value.length >= 3 && isLoading === false) {
      this.setState({ isLoading: true, value: { displayValue: value } });

      if (sessionStorage.getItem(value) !== null) {
        this.setState({
          isLoading: false,
          suggestions: JSON.parse(sessionStorage.getItem(value)),
          currentSuggestion: 0
        });
      } else {
        const { autoSuggestFetch, cacheResults } = this.props;
        autoSuggestFetch(value).then((response) => {
          const { data, succeed } = response;
          if (succeed) {
            if (cacheResults) sessionStorage.setItem(value, JSON.stringify(data));
            this.setState({
              suggestions: data,
              currentSuggestion: 0,
            });
          } else {
            this.setState({
              suggestions: [],
              currentSuggestion: 0,
            });
          }
          setTimeout(() => {
            try {
              this.setState({ isLoading: false });
            } catch (e) {
              console.log('setTimeout error', e);
            }
          }, timeOut);
        });
      }
    } else if (value === '') {
      this.setState({ value: {} });
      // onUpdate({ target: { name: name, value: {} } });
		} else {
      this.setState({ value: { displayValue: value } });
      // onUpdate({ target: { name: name, value: {} } });
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
        if (currentSuggestion === suggestions.length - 1) break;
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

  onFocus(e) {
    const { autoComplete } = this.props;
    this.setState({ autoComplete });
  }

  handleClick(item) {
    const { onUpdate, name, getValue } = this.props;
    const returnVal = getValue(item);
    this.setState({ value: returnVal, suggestions: [], currentSuggestion: -1 });

    onUpdate({ target: { name: name, value: returnVal } });
  }

  render() {
    const { name, label, isValid, isRequired, errorMessage, placeholder, innerRef, disabled, className, style } = this.props;
    const { suggestions, currentSuggestion, value, isLoading, autoComplete } = this.state;
    const { displayValue } = value;

    return el('div', { className: sumClasses(['container-field autosuggest', className]), style },
      el(FieldLabel, { label, name, isRequired, isValid }),
      el('input', {
        onChange: e => this.onChange(e),
        onKeyDown: e => this.onKeyDown(e),
        onFocus: e => this.onFocus(e),
        value: displayValue || '',
        placeholder: camelToTitle(placeholder, name),
				name,
				id: name,
        disabled,
				autoComplete,
				ref: innerRef,
        style: isValid === false ? { border: '1px solid #e4002b' } : {}
      }),
      el('div', { className: 'autosuggest-suggestions box-shadow' },
        suggestions.map((item, i) => {
          return el('div', {
            key: `sugg_${i}`,
            onClick: () => this.handleClick(item),
            onTouchEnd: () => this.handleClick(item),
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
