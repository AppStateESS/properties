'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Manager = React.createClass({
    displayName: 'Manager',

    mixins: [Messages],

    getInitialState: function () {
        return { managers: [], loading: false, admin: true };
    },

    componentDidMount: function () {
        this.load();
    },

    load: function () {
        this.setState({ loading: true });
        $.getJSON('properties/Manager', {}).done(function (data) {
            this.setState({ managers: data, loading: false });
        }.bind(this)).fail(function (data) {
            this.setState({ managers: null, loading: false });
            this.setMessage('Error: failure pulling managers');
        }.bind(this));
    },

    render: function () {
        if (this.state.loading) {
            return React.createElement(Loading, { label: 'managers' });
        } else {
            let message = this.getMessage();

            return React.createElement(
                'div',
                null,
                React.createElement(ManagerForm, null),
                message,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement('input', { className: 'form-control', type: 'text', placeholder: 'Search for managers...' })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-2' },
                        this.state.admin ? React.createElement(
                            'button',
                            { className: 'btn btn-success', 'data-toggle': 'modal', 'data-target': '#reactModal' },
                            React.createElement('i', { className: 'fa fa-plus' }),
                            '  Add manager'
                        ) : null
                    )
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
        let listRows = null;
        if (!this.props.managers || this.props.managers.length === 0) {
            return React.createElement(
                'h2',
                null,
                'No managers found.'
            );
        } else {
            listRows = this.props.managers.map(function (value, key) {
                return React.createElement(ManagerRow, _extends({ key: value.id }, value));
            });
        }
        return React.createElement(
            'div',
            null,
            React.createElement(
                'table',
                { className: 'table table-striped' },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            null,
                            React.createElement('input', { type: 'checkbox' })
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Company'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Contact'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Phone No.'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Last logged'
                        ),
                        React.createElement(
                            'th',
                            null,
                            'Active'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    listRows
                )
            )
        );
    }

});

var ManagerRow = React.createClass({
    displayName: 'ManagerRow',


    getDefaultProps: function () {
        return { id: 0 };
    },

    render: function () {
        let phone = this.props.phone.replace(/(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4})/g, '($1) $2-$3');
        let call = 'tel:+1' + this.props.phone;
        let email = 'mailto:' + this.props.email_address;
        let lastLog = 'Never';
        let companyName = this.props.company_name;
        let active = this.props.active === '1' ? React.createElement('i', { className: 'text-success fa fa-lg fa-check-circle' }) : React.createElement('i', { className: 'text-danger fa fa-lg fa-times-circle' });

        if (this.props.last_log > 0) {
            let lastDate = new Date(this.props.last_log * 1000);
            lastLog = lastDate.toDateString();
        }
        if (this.props.company_url.length > 0) {
            companyName = React.createElement(
                'a',
                { href: this.props.company_url },
                companyName
            );
        }

        return React.createElement(
            'tr',
            null,
            React.createElement(
                'td',
                null,
                React.createElement('input', { type: 'checkbox' })
            ),
            React.createElement(
                'td',
                null,
                companyName
            ),
            React.createElement(
                'td',
                null,
                React.createElement(
                    'a',
                    { href: email },
                    this.props.first_name,
                    ' ',
                    this.props.last_name,
                    ' ',
                    React.createElement('i', { className: 'fa fa-envelope-o' })
                )
            ),
            React.createElement(
                'td',
                null,
                React.createElement(
                    'a',
                    { href: call },
                    phone
                )
            ),
            React.createElement(
                'td',
                null,
                lastLog
            ),
            React.createElement(
                'td',
                null,
                active
            )
        );
    }

});

var ManagerForm = React.createClass({
    displayName: 'ManagerForm',

    mixins: [CheckValues],

    getInitialState: function () {
        return {
            id: 0,
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email_address: '',
            company_name: '',
            company_address: '',
            company_url: '',
            times_available: '',
            errorFree: false
        };
    },

    resetForm: function () {
        this.setState(this.getInitialState());
        $('.managerForm form input').removeClass('error-highlight');
        $('.managerForm form input').attr('placeholder', '');
        $('#reactModal').modal('hide');
    },

    getDefaultProps: function () {
        return {
            id: 0,
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email_address: '',
            company_name: '',
            company_address: '',
            company_url: '',
            times_available: '',
            update: null,
            resetModal: null
        };
    },

    componentDidMount: function () {
        this.setState(this.props);
    },

    copyUsername: function (username) {
        if (this.isEmail(username) && this.isEmpty(this.state.email_address)) {
            this.setState({ email_address: username });
        }
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

    save: function () {
        let success = function () {
            $.post('properties/Manager/', {
                id: this.state.id,
                username: this.state.username,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                email_address: this.state.email_address,
                company_name: this.state.company_name,
                company_address: this.state.company_address,
                company_url: this.state.company_url,
                times_available: this.state.times_available
            }, 'json').done(function (data) {
                this.resetForm();
            }.bind(this)).fail(function (data) {});
        }.bind(this);

        this.resetErrors();
        this.checkValues(success);
    },

    duplicateUsername: function () {
        return $.getJSON('properties/Manager/checkUsername', {
            username: this.state.username
        });
    },

    duplicateEmail: function () {
        return $.getJSON('properties/Manager/checkEmail', {
            email_address: this.state.email_address
        });
    },

    checkPassword: function () {
        if (this.isEmpty(this.state.password)) {
            this.flagBlankInput($('#managerPassword'));
            return false;
        } else {
            return true;
        }
    },

    checkFirstName: function () {
        if (this.isEmpty(this.state.first_name)) {
            this.flagBlankInput($('#managerFirstName'));
            return false;
        } else {
            return true;
        }
    },

    checkLastName: function () {
        if (this.isEmpty(this.state.last_name)) {
            this.flagBlankInput($('#managerLastName'));
            return false;
        } else {
            return true;
        }
    },

    checkPhone: function () {
        if (this.isEmpty(this.state.phone)) {
            this.flagBlankInput($('#managerPhone'));
            return false;
        } else if (!this.isPhone(this.state.phone)) {
            let phone = $('#managerPhone');
            this.flagBadFormat(phone, 'Phone must be seven or more numeric characters');
            return false;
        } else {
            return true;
        }
    },

    checkUsername: function (event, callback) {
        if (this.isEmpty(this.state.username)) {
            this.flagBlankInput($('#managerUsername'));
            return false;
        } else if (this.state.username.match(/\s/)) {
            this.flagBadFormat($('#managerUsername'), 'No spaces allowed in username');
            return false;
        } else {
            let dupe = this.duplicateUsername();
            dupe.done(function (data) {
                if (data.duplicate) {
                    this.flagBadFormat($('#managerUsername'), 'Username already in use.');
                    return false;
                } else {
                    this.copyUsername(this.state.username);
                    if (callback !== undefined) {
                        callback();
                    }
                    return true;
                }
            }.bind(this));
        }
    },

    checkEmailAddress: function (event, callback) {
        if (this.isEmpty(this.state.email_address)) {
            this.flagBlankInput($('#managerEmailAddress'));
            return false;
        } else if (!this.isEmail(this.state.email_address)) {
            this.flagBadFormat($('#managerEmailAddress'), 'Incorrect email formatting.');
            return false;
        } else {
            let dupe = this.duplicateEmail();
            dupe.done(function (data) {
                if (data.duplicate) {
                    this.flagBadFormat($('#managerEmailAddress'), 'Email address already in use.');
                    return false;
                } else {
                    if (callback !== undefined) {
                        callback();
                    }
                    return true;
                }
            }.bind(this));
        }
    },

    checkCompanyName: function () {
        if (this.isEmpty(this.state.company_name)) {
            let companyName = $('#managerCompanyName');
            if (this.state.first_name.length > 0 && this.state.last_name.length > 0) {
                this.flagBadFormat(companyName, 'Company name must not be blank. Name used.');
                this.setState({ company_name: this.state.first_name + ' ' + this.state.last_name });
                return true;
            } else {
                this.flagBadFormat(companyName, 'Company name must not be blank.');
                return false;
            }
        } else {
            return true;
        }
    },

    checkValues: function (success) {
        let checkEmail = function () {
            this.checkEmailAddress(null, function () {
                if (this.checkPassword() && this.checkFirstName() && this.checkLastName() && this.checkPhone() && this.checkCompanyName()) {
                    success();
                }
            }.bind(this));
        }.bind(this);
        this.checkUsername(null, checkEmail);
    },

    addTestData: function () {
        this.setState({
            username: 'tommy',
            password: 'password',
            first_name: 'Tommy',
            last_name: 'Tutone',
            phone: '828-123-1233',
            email_address: 'Tom@aol.com',
            company_name: 'Tommy Place',
            company_address: '123 Elm Street',
            company_url: 'http://google.com',
            times_available: '8am to 5pm'
        });
    },

    render: function () {
        let testButton = React.createElement(
            'button',
            { className: 'btn btn-warning', onClick: this.addTestData },
            'Test'
        );
        let button = React.createElement(
            'button',
            { className: 'btn btn-success', onClick: this.save },
            React.createElement('i', { className: 'fa fa-floppy-o' }),
            ' Save'
        );
        let footer = React.createElement(
            'span',
            null,
            button,
            testButton
        );
        let managerForm = React.createElement(
            'div',
            { className: 'managerForm' },
            React.createElement(
                'form',
                null,
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'username', _id: 'managerUsername', label: 'Username',
                            value: this.state.username, change: this.setUsername,
                            blur: this.checkUsername, required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { type: 'password', name: 'password', _id: 'managerPassword',
                            label: 'Password', value: this.state.password, change: this.setPassword,
                            blur: this.checkPassword, required: true })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'first_name', _id: 'managerFirstName',
                            label: 'First name', value: this.state.first_name,
                            change: this.setFirstName, blur: this.checkFirstName, required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'last_name', _id: 'managerLastName',
                            label: 'Last name', value: this.state.last_name,
                            change: this.setLastName, blur: this.checkLastName, required: true })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'phone', _id: 'managerPhone', label: 'Phone',
                            value: this.state.phone, change: this.setPhone, blur: this.checkPhone,
                            required: true })
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-6' },
                        React.createElement(InputField, { name: 'email_address', _id: 'managerEmailAddress',
                            label: 'Email', value: this.state.email_address, change: this.setEmailAddress,
                            blur: this.checkEmailAddress, required: true })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(
                        'div',
                        { className: 'col-sm-12' },
                        React.createElement(InputField, { name: 'company_name', _id: 'managerCompanyName',
                            label: 'Company name', value: this.state.company_name,
                            change: this.setCompanyName, blur: this.checkCompanyName }),
                        React.createElement(InputField, { name: 'company_address', _id: 'managerCompanyAddress',
                            label: 'Company address', value: this.state.company_address,
                            change: this.setCompanyAddress }),
                        React.createElement(InputField, { name: 'company_url', _id: 'managerCompanyUrl',
                            label: 'Company URL', value: this.state.company_url,
                            change: this.setCompanyUrl }),
                        React.createElement(
                            'label',
                            { htmlFor: 'm-times-available' },
                            'Times available'
                        ),
                        React.createElement('textarea', { id: 'm-times-available', className: 'form-control',
                            name: 'times_available', _id: 'managerTimesAvailable',
                            value: this.state.times_available, onChange: this.setTimesAvailable })
                    )
                )
            )
        );
        return React.createElement(Modal, { body: managerForm, header: 'Create manager', footer: footer, onClose: this.resetForm });
    }
});
ReactDOM.render(React.createElement(Manager, null), document.getElementById('manager'));