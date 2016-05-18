import Stapes from 'stapes';
import $ from 'jquery';

export default Stapes.subclass({

    constructor: function ( $container ) {

        this.$container = $container;

        this.state = {
            path: '',
            query: ''
        };

        this.bindNavigationStateHandlers();
    },

    bindNavigationStateHandlers: function () {
        window.addEventListener('popstate', this.checkNavigationState.bind( this ) );
    },

    checkNavigationState: function () {

        var state = this.getNavigationState();

        if ( JSON.stringify( state ) !== JSON.stringify( this.state ) ) {
            this.state = state;
            this.handleNavigationState( this.state );
        }
    },

    getNavigationState: function () {
        return {
            path: document.location.pathname,
            query: ( (document.location.search)? document.location.search.substr(1) : ''  )
        }
    },

    /**
     * @param state
     *    @param {String} state.path - The current path, with a leading /
     *    @param {String} state.query - Everything after the ? of the URL, if available
     */
    handleNavigationState: function ( state ) {
        console.log('handleNavigationState: overide this method in your subclass');
    }
});