import $ from 'jquery';
import React from 'react';
import {SearchResults} from 'giffie-frontend/js/SearchResults.js';

export class SearchView extends React.Component {

    constructor ( props ) {
        super( props );

        this.state = {
            q: '',
            results: [],
            pagination: {}
        };

        // @see https://facebook.github.io/react/docs/reusable-components.html#no-autobinding
        this.handleInputChange = this.handleInputChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    componentDidMount () {

    }

    handleInputChange ( e ) {
        this.setState({
            q: e.target.value
        });
    }

    handleSubmit ( e ) {
        e.preventDefault();
        e.stopPropagation();

        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q='+ this.state.q.replace(/\s/ig, '+'),
            dataType: 'json'
        }).then( results => {

            this.setState({
                results: results.data,
                pager: results.pagination
            });

        }, function () {
            this.setState({
                results: []
            });
        });
    }

    render () {

        return (
            <div id="app">
                <header className="main-header"><img src="assets/img/logo.svg" /></header>
                <form className="search-form" onSubmit={ this.handleSubmit }>
                    <div className="search-form__input-container">
                        <input type="text" id="q" value={ this.state.q }
                               onChange={ this.handleInputChange } className="search-form__input" placeholder="Zoek op giffie..." />
                    </div>
                    <div className="search-form__submit-container">
                        <input type="submit" className="search-form__submit" value="Zoek" />
                    </div>
                </form>
                <SearchResults results={ this.state.results } pager={ this.state.pager } />
            </div>
        );
    }
}