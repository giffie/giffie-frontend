import React from 'react';

export default class SearchResults extends React.Component {

    render () {

        if ( this.props.results && this.props.pager ) {

            return (
                <div className="search-results">
                    {
                        this.props.results.map( function ( result ) {

                            var divStyle = {
                                backgroundImage: 'url("'+ result.images.fixed_width.url +'")'
                            };

                            return (
                            <div key={result.id} className="search-result__item" style={ divStyle }></div>
                            );
                        })
                    }
                </div>
            );

        } else {

            return (
                <div className="search-results"></div>
            );
        }
    }
}