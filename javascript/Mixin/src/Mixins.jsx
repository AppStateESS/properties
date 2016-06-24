function Loading(props) {
    return (
        <div style={{
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <h2>
                <i className="fa fa-cog fa-spin"></i>
                &nbsp;Loading {props.label}...
            </h2>
        </div>
    );
};

var Messages = {
    getInitialState: function() {
        return {message: null, type: 'danger'};
    },

    clearMessage: function() {
        this.setState({message: null});
    },

    setMessage: function(message, type) {
        this.setState({message: message});
        if (type) {
            this.setState({type: type});
        }
    },

    hasMessage: function() {
        return this.state.message === null;
    },

    getMessage: function() {
        if (this.state.message === null) {
            return null;
        }
        var messageType = 'alert alert-' + this.state.type;
        console.log(messageType);
        return (
            <div className={messageType}>{this.state.message}</div>
        );
    }
};

var InputField = React.createClass({
    getDefaultProps: function() {
        return {label: '', type: 'text', name: '', value: '', change: null, required: false};
    },

    render: function() {
        let _class = this.props.required ? 'input-required' : '';
        let _required = this.props.required ? <i className='fa fa-asterisk required'></i> : null;

        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label} {_required}</label>
                <input id={this.props.name} type={this.props.type} name={this.props.name}
                    value={this.props.value} className="form-control" onChange={this.props.change} class={_class}/>
            </div>
        );
    }

});
