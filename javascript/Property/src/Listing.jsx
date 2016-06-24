'use strict';

var Properties = React.createClass({
    mixins: [Messages],

    getInitialState: function() {
        return {properties: [], loading:false};
    },

    componentDidMount: function() {
        this.loadProperties();
    },

    loadProperties: function() {
        this.setState({loading:true});
        $.getJSON('properties/Property', {}).success(function(data) {
            this.setState({properties: data, loading:false});
        }.bind(this)).fail(function(data) {
            this.setState({properties: null, loading:false});
            this.setMessage(<p><i className="fa fa-exclamation-triangle"></i> Error: failure pulling properties.</p>);
        }.bind(this));
    },

    render: function() {
        let message = this.getMessage();
        if (this.state.properties === null) {
            return (
                <div>
                    {message}
                    <h2>No properties found. Check back later.</h2>
                </div>
            );
        } else {
            return (<Loading label="properties"/>);
        }
    }
});

var PropertyList = React.createClass({
    getInitialState: function() {
        return null;
        //return {foo: bar};
    },

    getDefaultProps: function() {
        return null;
        //return {id: 0};
    },

    render: function() {
        return (
            <div></div>
        );
    }

});

ReactDOM.render(
    <Properties/>, document.getElementById('properties'));
