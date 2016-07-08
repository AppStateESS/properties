'use strict';

var Manager = React.createClass({
    mixins: [Messages],

    getInitialState: function() {
        return {managers: [], loading: false, admin: true};
    },

    componentDidMount: function() {
        this.load();
    },

    load: function() {
        this.setState({loading: true});
        $.getJSON('properties/Manager', {})
        .done(function(data) {
            this.setState({managers: data, loading: false});
        }.bind(this))
        .fail(function(data) {
            this.setState({managers: null, loading: false});
            this.setMessage('Error: failure pulling managers');
        }.bind(this));
    },

    render: function() {
        if (this.state.loading) {
            return (<Loading label="managers"/>);
        } else {
            let message = this.getMessage();

            return (
                <div>
                    <ManagerForm/>
                    {message}
                    <div className="row">
                        <div className="col-sm-6">
                            <input className="form-control" type="text" placeholder="Search for managers..."/>
                        </div>
                        <div className="col-sm-2">
                            {this.state.admin ? (
                                    <button className="btn btn-success" data-toggle="modal" data-target="#reactModal">
                                        <i className="fa fa-plus"></i>&nbsp; Add manager</button>
                            ) : null}
                        </div>
                    </div>
                    <ListManagers managers={this.state.managers}/>
                </div>
            );
        }
    }

});

var ListManagers = React.createClass({
    getInitialState: function() {
        return null;
    },

    getDefaultProps: function() {
        return {managers: []};
    },

    render: function() {
        let listRows = null;
        if (!this.props.managers || this.props.managers.length === 0) {
            return <h2>No managers found.</h2>;
        } else {
            listRows = this.props.managers.map(
                function(value, key) {
                    return <ManagerRow key={value.id} {...value} />;
                }
            );
        }
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th><input type="checkbox"/></th>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Phone No.</th>
                            <th>Last logged</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listRows}
                    </tbody>
                </table>
            </div>
        );
    }

});

var ManagerRow = React.createClass({

    getDefaultProps: function() {
        return {id: 0};
    },

    render: function() {
        let phone = this.props.phone.replace(/(\d{3})[^\d]{0,7}(\d{3})[^\d]{0,7}(\d{4})/g, '($1) $2-$3');
        let call = 'tel:+1' + this.props.phone;
        let email = 'mailto:' + this.props.email_address;
        let lastLog = 'Never';
        let companyName = this.props.company_name;
        let active = this.props.active === '1' ? <i className="text-success fa fa-lg fa-check-circle"></i> : <i className="text-danger fa fa-lg fa-times-circle"></i>;

        if (this.props.last_log > 0) {
            let lastDate = new Date(this.props.last_log*1000);
            lastLog = lastDate.toDateString();
        }
        if (this.props.company_url.length > 0) {
            companyName = <a href={this.props.company_url}>{companyName}</a>;
        }

        return (
            <tr>
                <td><input type="checkbox"/></td>
                <td>
                    {companyName}
                </td>
                <td>
                    <a href={email}>{this.props.first_name} {this.props.last_name} <i className="fa fa-envelope-o"></i></a>
                </td>
                <td>
                    <a href={call}>{phone}</a>
                </td>
                <td>
                    {lastLog}
                </td>
                <td>
                    {active}
                </td>
            </tr>
        );
    }

});

var ManagerForm = React.createClass({
    mixins: [CheckValues],

    getInitialState: function() {
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
            times_available: ''
        };
    },

    resetForm: function() {
        this.setState(this.getInitialState());
        $('#reactModal').modal('hide');
    },

    getDefaultProps: function() {
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
            resetModal : null,
        };
    },

    componentDidMount: function() {
        this.setState(this.props);
    },

    copyUsername: function(username) {
        if (this.isEmail(username) && this.isEmpty(this.state.email_address)) {
            this.setState({email_address: username});
        }
    },

    setUsername: function(e) {
        this.setState({username: e.target.value});
    },

    setPassword: function(e) {
        this.setState({password: e.target.value});
    },

    setFirstName: function(e) {
        this.setState({first_name: e.target.value});
    },

    setLastName: function(e) {
        this.setState({last_name: e.target.value});
    },

    setPhone: function(e) {
        this.setState({phone: e.target.value});
    },

    setEmailAddress: function(e) {
        this.setState({email_address: e.target.value});
    },

    setCompanyName: function(e) {
        this.setState({company_name: e.target.value});
    },

    setCompanyAddress: function(e) {
        this.setState({company_address: e.target.value});
    },

    setCompanyUrl: function(e) {
        this.setState({company_url: e.target.value});
    },

    setTimesAvailable: function(e) {
        this.setState({times_available: e.target.value});
    },

    save: function() {
        this.resetErrors();
        if (this.checkValues()) {
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
            }, 'json')
            .done(function(data) {
                this.resetForm();
            }.bind(this))
            .fail(function(data){

            });
        }
    },

    duplicateUsername: function() {
        return $.getJSON('properties/Manager/checkUsername', {
        	username : this.state.username,
        });
    },

    duplicateEmail: function() {
        return $.getJSON('properties/Manager/checkEmail', {
        	email_address : this.state.email_address,
        });
    },

    checkUsername : function() {
        if (this.isEmpty(this.state.username)) {
            this.flagBlankInput($('#managerUsername'));
            return false;
        } else if (this.state.username.match(/\s/)) {
            this.flagBadFormat($('#managerUsername'), 'No spaces allowed in username');
            return false;
        } else {
            let dupe = this.duplicateUsername();
            dupe.done(function(data){
                if (data.duplicate) {
                    this.flagBadFormat($('#managerUsername'), 'Username already in use.');
                    return false;
                } else {
                    this.copyUsername(this.state.username);
                    return true;
                }
            }.bind(this));
        }
    },

    checkPassword: function() {
        if (this.isEmpty(this.state.password)) {
            this.flagBlankInput($('#managerPassword'));
            return false;
        } else {
            return true;
        }
    },

    checkFirstName: function() {
        if (this.isEmpty(this.state.first_name)) {
            this.flagBlankInput($('#managerFirstName'));
            return false;
        } else {
            return true;
        }
    },

    checkLastName: function() {
        if (this.isEmpty(this.state.last_name)) {
            this.flagBlankInput($('#managerLastName'));
            return false;
        } else {
            return true;
        }
    },

    checkPhone : function() {
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

    checkEmailAddress: function() {
        if (this.isEmpty(this.state.email_address)) {
            this.flagBlankInput($('#managerEmailAddress'));
            return false;
        } else if (!this.isEmail(this.state.email_address)) {
            this.flagBadFormat($('#managerEmailAddress'), 'Incorrect email formatting.');
            return false;
        } else {
            let dupe = this.duplicateEmail();
            dupe.done(function(data){
                if (data.duplicate) {
                    this.flagBadFormat($('#managerEmailAddress'), 'Email address already in use.');
                    return false;
                } else {
                    return true;
                }
            }.bind(this));
        }
    },

    checkCompanyName : function() {
        if (this.isEmpty(this.state.company_name)) {
            let companyName = $('#managerCompanyName');
            if (this.state.first_name.length > 0 && this.state.last_name.length > 0) {
                this.flagBadFormat(companyName, 'Company name must not be blank. Name used.');
                this.setState({company_name : this.state.first_name + ' ' + this.state.last_name});
                return true;
            } else {
                this.flagBadFormat(companyName, 'Company name must not be blank.');
                return false;
            }
        } else {
            return true;
        }
    },

    checkValues: function() {
        let errorFree = true;

        if (!this.checkPassword()) {
            errorFree = false;
        }

        if (!this.checkFirstName()) {
            errorFree = false;
        }

        if (!this.checkLastName()) {
            errorFree = false;
        }

        if (!this.checkPhone()) {
            errorFree = false;
        }

        if (!this.checkCompanyName()) {
            errorFree = false;
        }

        if (!this.checkUsername()) {
            errorFree = false;
        }

        if (!this.checkEmailAddress()) {
            errorFree = false;
        }

        console.log(errorFree);
        return errorFree;
    },

    addTestData: function() {
        this.setState({
            username : 'tommy',
            password : 'password',
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

    render: function() {
        let testButton = <button className="btn btn-warning" onClick={this.addTestData}>Test</button>;
        let button = <button className="btn btn-success" onClick={this.save}>
            <i className="fa fa-floppy-o"></i>&nbsp;Save</button>;
        let footer = <span>{button}{testButton}</span>;
        let managerForm = (
            <div className="managerForm">
                <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputField name="username" _id="managerUsername" label="Username"
                                value={this.state.username} change={this.setUsername}
                                blur={this.checkUsername} required={true}/>
                        </div>
                        <div className="col-sm-6">
                            <InputField type="password" name="password" _id="managerPassword"
                                label="Password" value={this.state.password} change={this.setPassword}
                                blur={this.checkPassword} required={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputField name="first_name" _id="managerFirstName"
                                label="First name" value={this.state.first_name}
                                change={this.setFirstName} blur={this.checkFirstName} required={true}/>
                        </div>
                        <div className="col-sm-6">
                            <InputField name="last_name" _id="managerLastName"
                                label="Last name" value={this.state.last_name}
                                change={this.setLastName} blur={this.checkLastName} required={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputField name="phone" _id="managerPhone"  label="Phone"
                                value={this.state.phone} change={this.setPhone} blur={this.checkPhone}
                                required={true}/>
                        </div>
                        <div className="col-sm-6">
                            <InputField name="email_address" _id="managerEmailAddress"
                                label="Email" value={this.state.email_address} change={this.setEmailAddress}
                                blur={this.checkEmailAddress} required={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <InputField name="company_name" _id="managerCompanyName"
                                label="Company name" value={this.state.company_name}
                                change={this.setCompanyName} blur={this.checkCompanyName}/>
                            <InputField name="company_address" _id="managerCompanyAddress"
                                label="Company address" value={this.state.company_address}
                                change={this.setCompanyAddress}/>
                            <InputField name="company_url" _id="managerCompanyUrl"
                                label="Company URL" value={this.state.company_url}
                                change={this.setCompanyUrl}/>
                            <label htmlFor="m-times-available">Times available</label>
                            <textarea id="m-times-available" className="form-control"
                                name="times_available" _id="managerTimesAvailable"
                                value={this.state.times_available} onChange={this.setTimesAvailable}/>
                        </div>
                    </div>
                </form>
            </div>
        );
        return <Modal body={managerForm} header='Create manager' footer={footer}/>;
    }
});
ReactDOM.render(
    <Manager/>, document.getElementById('manager'));
