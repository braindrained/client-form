// @flow
import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

// flow-disable-next-line
import './TownAutoSuggest.scss';

const renderSuggestion = suggestion => (<span>{suggestion.description}</span>);

class TownAutoSuggest extends React.Component<any, any> {

	static defaultProps = {
		description: '',
		townId: '',
		actions: null,
		jwt: '',
		onChange: null
	};

	state = {
		value: this.props.description,
		suggestions: [],
		isLoading: false,
		townId: this.props.townId,
		townZones: []
	};

	loadSuggestions(value: string) {
		this.setState({
			isLoading: true,
		});

		if (value.length >= 3) {
			this.props.actions.searchTown({
				jwt: this.props.jwt,
				search: value,
			}).then((x) => {
				if (x.value.response.succeed && x.value.response.data.length > 0) {
					this.setState({
						isLoading: false,
						suggestions: x.value.response.data
					});
				}
				return {};
			});
		}
	}

	onChange = (event: Object, { newValue }: { newValue: string }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }: { value: string }) => {
		this.loadSuggestions(value);
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});

		this.props.onChange({
			target: {
				name: 'suburb',
				value: {
					suburb: this.state.value,
					townId: this.state.townId,
					townZones: this.state.townZones
				}
			}
		});
	};

	getSuggestionValue = (suggestion: Object) => {
		this.setState({
			townId: suggestion.townId,
			townZones: suggestion.townZones
		});
		return suggestion.description;
	}

	render() {
		const { value, suggestions, isLoading } = this.state;
		const inputProps = {
			placeholder: 'Comune',
			value,
			onChange: this.onChange
		};

		return (
			<div>
				<div className="status" style={isLoading ? {} : { display: 'none' }}>
					&nbsp;
				</div>
				<Autosuggest {...{
					suggestions,
					onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
					onSuggestionsClearRequested: this.onSuggestionsClearRequested,
					getSuggestionValue: this.getSuggestionValue,
					renderSuggestion,
					highlightFirstSuggestion: true,
					inputProps
				}} />
			</div>
		);
	}
}

TownAutoSuggest.propTypes = {
	description: PropTypes.string,
	townId: PropTypes.string,
	actions: PropTypes.instanceOf(Object),
	jwt: PropTypes.string,
	onChange: PropTypes.func
};

TownAutoSuggest.defaultProps = {
	description: '',
	townId: '',
	actions: null,
	jwt: '',
	onChange: null
};

export default TownAutoSuggest;
