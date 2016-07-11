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

var CheckValues = {
    isEmpty: function (value) {
        return value === '' || value === null;
    },

    isEmail: function (value) {
        return value.match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i);
    },

    isPhone: function (value) {
        return value.replace(/[^\d]/, '').length >= 7;
    },

    flagBlankInput: function (node) {
        node.attr('placeholder', 'May not be blank').addClass('error-highlight');
    },

    flagBadFormat: function (node, message) {
        let tempId = this.randomId();
        node.addClass('error-highlight');
        node.after('<span id="' + tempId + '" class="error-label label label-danger">' + message + '</span>');
        node.focus(function () {
            $(this).css('borderColor', 'inherit');
            $('#' + tempId).remove();
        });
    },

    resetErrors: function () {
        $('.error-label').remove();
        $('.error-highlight').removeClass('error-highlight');
    },

    randomId: function () {
        return (Math.random().toString(36) + '00000000000000000').slice(2, 10);
    }
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
        let icon = '';
        switch (this.state.type) {
            case 'danger':
                icon = 'fa fa-exclamation-triangle';
                break;

            case 'success':
                icon = 'fa fa-thumbs-o-up';
                break;

            case 'info':
                icon = 'fa fa-info-circle';
                break;

            case 'warning':
                icon = 'fa fa-hand-paper-o';
                break;
        }

        let messageType = 'alert alert-dismissible alert-' + this.state.type;
        return React.createElement(
            'div',
            { className: messageType, role: 'alert' },
            React.createElement(
                'button',
                { type: 'button', onClick: this.clearMessage, className: 'close', 'data-dismiss': 'alert', 'aria-label': 'Close' },
                React.createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '×'
                )
            ),
            React.createElement('i', { className: icon }),
            ' ',
            this.state.message
        );
    }
};

var InputField = React.createClass({
    displayName: 'InputField',

    getDefaultProps: function () {
        return { label: '', type: 'text', name: '', value: '', change: null, blur: null, required: false, _id: null, autocomplete: false };
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
            React.createElement('input', { id: this.props._id, type: this.props.type, name: this.props.name,
                value: this.props.value, className: 'form-control', onChange: this.props.change,
                onBlur: this.props.blur, autoComplete: this.props.autocomplete, 'class': _class })
        );
    }
});