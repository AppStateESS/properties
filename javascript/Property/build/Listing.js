'use strict';

var Properties = React.createClass({
    displayName: 'Properties',

    mixins: [Messages],

    getInitialState: function () {
        return { properties: [], loading: false };
    },

    componentDidMount: function () {
        this.loadProperties();
    },

    loadProperties: function () {
        this.setState({ loading: true });
        $.getJSON('properties/Property', {}).success(function (data) {
            this.setState({ properties: data, loading: false });
        }.bind(this)).fail(function (data) {
            this.setState({ properties: null, loading: false });
            this.setMessage(React.createElement(
                'p',
                null,
                React.createElement('i', { className: 'fa fa-exclamation-triangle' }),
                ' Error: failure pulling properties.'
            ));
        }.bind(this));
    },

    render: function () {
        let message = this.getMessage();
        if (this.state.properties === null) {
            return React.createElement(
                'div',
                null,
                message,
                React.createElement(
                    'h2',
                    null,
                    'No properties found. Check back later.'
                )
            );
        } else {
            return React.createElement(Loading, { label: 'properties' });
        }
    }
});

var PropertyList = React.createClass({
    displayName: 'PropertyList',

    getInitialState: function () {
        return null;
        //return {foo: bar};
    },

    getDefaultProps: function () {
        return null;
        //return {id: 0};
    },

    render: function () {
        return React.createElement('div', null);
    }

});

ReactDOM.render(React.createElement(Properties, null), document.getElementById('properties'));