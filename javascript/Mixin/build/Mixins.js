function Loading(props) {
    return React.createElement(
        'div',
        { style: {
                margin: '0 auto',
                textAlign: 'center'
            } },
        React.createElement(
            'h2',
            null,
            React.createElement('i', { className: 'fa fa-cog fa-spin' }),
            ' Loading ',
            props.label,
            '...'
        )
    );
};

var Messages = {
    getInitialState: function () {
        return { message: null, type: 'danger' };
    },

    clearMessage: function () {
        this.setState({ message: null });
    },

    setMessage: function (message, type) {
        this.setState({ message: message });
        if (type) {
            this.setState({ type: type });
        }
    },

    hasMessage: function () {
        return this.state.message === null;
    },

    getMessage: function () {
        if (this.state.message === null) {
            return null;
        }
        var messageType = 'alert alert-' + this.state.type;
        console.log(messageType);
        return React.createElement(
            'div',
            { className: messageType },
            this.state.message
        );
    }
};

var InputField = React.createClass({
    displayName: 'InputField',

    getDefaultProps: function () {
        return { label: '', type: 'text', name: '', value: '', change: null, required: false };
    },

    render: function () {
        let _class = this.props.required ? 'input-required' : '';
        let _required = this.props.required ? React.createElement('i', { className: 'fa fa-asterisk required' }) : null;

        return React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
                'label',
                { htmlFor: this.props.name },
                this.props.label,
                ' ',
                _required
            ),
            React.createElement('input', { id: this.props.name, type: this.props.type, name: this.props.name,
                value: this.props.value, className: 'form-control', onChange: this.props.change, 'class': _class })
        );
    }

});