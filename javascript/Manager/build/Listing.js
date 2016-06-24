'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Manager = React.createClass({
    displayName: 'Manager',

    mixins: [Messages],

    getInitialState: function () {
        return {
            managers: [],
            loading: false,
            currentManager: {
                username: null,
                first_name: null,
                last_name: null,
                phone: null,
                email_address: null,
                company_name: null,
                company_address: null,
                company_url: null,
                times_available: null
            }
        };
    },

    componentDidMount: function () {
        this.load();
    },

    load: function () {
        this.setState({ loading: true });
        $.getJSON('properties/Manager', {}).success(function (data) {
            this.setState({ managers: data, loading: false });
        }.bind(this)).fail(function (data) {
            this.setState({ managers: null, loading: false });
            this.setMessage(React.createElement(
                'p',
                null,
                React.createElement('i', { className: 'fa fa-exclamation-triangle' }),
                '  Error: failure pulling managers.'
            ));
        }.bind(this));
    },

    render: function () {
        if (this.state.loading) {
            return React.createElement(Loading, { label: 'managers' });
        } else {
            let message = this.getMessage();
            let managerForm = React.createElement(ManagerForm, { manager: this.state.currentManager });
            let button = React.createElement(
                'button',
                { className: 'btn btn-success' },
                React.createElement('i', { className: 'fa fa-floppy-o' }),
                ' Save'
            );
            return React.createElement(
                'div',
                null,
                React.createElement(Modal, { body: managerForm, header: 'Create manager', footer: button }),
                ' ',
                message,
                React.createElement(
                    'button',
                    { className: 'btn btn-success btn-lg', 'data-toggle': 'modal', 'data-target': '#reactModal' },
                    React.createElement('i', { className: 'fa fa-plus' }),
                    '  Add manager'
                ),
                React.createElement(ListManagers, { managers: this.state.managers })
            );
        }
    }

});

var ListManagers = React.createClass({
    displayName: 'ListManagers',

    getInitialState: function () {
        return null;
    },

    getDefaultProps: function () {
        return { managers: [] };
    },

    render: function () {
        if (this.props.managers.length === 0) {
            return React.createElement(
                'h2',
                null,
                'No managers found. Check back later.'
            );
        } else {
            let listRows = this.state.list.map(function (value, key) {
                React.createElement(ManagerRow, _extends({ key: value.id }, value));
            });
            return React.createElement(
                'div',
                null,
                listRows
            );
        }
    }

});

var ManagerRow = React.createClass({
    displayName: 'ManagerRow',


    getDefaultProps: function () {
        return { id: 0 };
    },

    render: function () {
        return React.createElement('div', null);
    }

});

var ManagerForm = React.createClass({
    displayName: 'ManagerForm',

    getInitialState: function () {
        return {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email_address: '',
            company_name: '',
            company_address: '',
            company_url: '',
            times_available: ''
        };
    },

    getDefaultProps: function () {
        return {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email_address: '',
            company_name: '',
            company_address: '',
            company_url: '',
            times_available: ''
        };
    },

    componentDidMount: function () {
        this.setState(this.props);
    },

    setUsername: function (e) {
        this.setState({ username: e.target.value });
    },

    setPassword: function (e) {
        this.setState({ password: e.target.value });
    },

    setFirstName: function (e) {
        this.setState({ first_name: e.target.value });
    },

    setLastName: function (e) {
        this.setState({ last_name: e.target.value });
    },

    setPhone: function (e) {
        this.setState({ phone: e.target.value });
    },

    setEmailAddress: function (e) {
        this.setState({ email_address: e.target.value });
    },

    setCompanyName: function (e) {
        this.setState({ company_name: e.target.value });
    },

    setCompanyAddress: function (e) {
        this.setState({ company_address: e.target.value });
    },

    setCompanyUrl: function (e) {
        this.setState({ company_url: e.target.value });
    },

    setTimesAvailable: function (e) {
        this.setState({ times_available: e.target.value });
    },

    render: function () {
        return React.createElement(
            'div',
            { 'class': 'managerForm' },
            React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'username', label: 'Username', value: this.state.username, change: this.setUsername, required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { type: 'password', name: 'password', label: 'Password', value: this.state.password, change: this.setPassword, required: true })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'first_name', label: 'First name', value: this.state.first_name, change: this.setFirstName, required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'last_name', label: 'Last name', value: this.state.last_name, change: this.setLastName, required: true })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'phone', label: 'Phone', value: this.state.phone, change: this.setPhone, required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'email_address', label: 'Email', value: this.state.email_address, change: this.setEmailAddress, required: true })
                    )
                ),
                React.createElement(InputField, { name: 'company_name', label: 'Company name', value: this.state.company_name, change: this.setCompanyName }),
                React.createElement(InputField, { name: 'company_address', label: 'Company address', value: this.state.company_address, change: this.setCompanyAddress }),
                React.createElement(InputField, { name: 'company_url', label: 'Company URL', value: this.state.company_url, change: this.setCompanyUrl }),
                React.createElement(
                    'label',
                    { htmlFor: 'm-times-available' },
                    'Times available'
                ),
                React.createElement('textarea', { id: 'm-times-available', className: 'form-control', name: 'times_available', value: this.state.times_available, onChange: this.setTimesAvailable })
            )
        );
    }
});
ReactDOM.render(React.createElement(Manager, null), document.getElementById('manager'));