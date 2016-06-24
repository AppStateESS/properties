'use strict';

var Manager = React.createClass({
    mixins: [Messages],

    getInitialState: function() {
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

    componentDidMount: function() {
        this.load();
    },

    load: function() {
        this.setState({loading: true});
        $.getJSON('properties/Manager', {}).success(function(data) {
            this.setState({managers: data, loading: false});
        }.bind(this)).fail(function(data) {
            this.setState({managers: null, loading: false});
            this.setMessage(
                <p>
                    <i className="fa fa-exclamation-triangle"></i>&nbsp; Error: failure pulling managers.</p>
            );
        }.bind(this));
    },

    render: function() {
        if (this.state.loading) {
            return (<Loading label="managers"/>);
        } else {
            let message = this.getMessage();
            let managerForm = <ManagerForm manager={this.state.currentManager}/>;
            let button = <button className="btn btn-success"><i className="fa fa-floppy-o"></i>&nbsp;Save</button>;
            return (
                <div>
                    <Modal body={managerForm} header='Create manager' footer={button}/> {message}
                    <button className="btn btn-success btn-lg" data-toggle="modal" data-target="#reactModal">
                        <i className="fa fa-plus"></i>&nbsp; Add manager</button>
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
        if (this.props.managers.length === 0) {
            return <h2>No managers found. Check back later.</h2>;
        } else {
            let listRows = this.state.list.map(function(value, key) {
                <ManagerRow key = {value.id} {...value} />
            });
            return (
                <div>{listRows}</div>
            );
        }
    }

});

var ManagerRow = React.createClass({

    getDefaultProps: function() {
        return {id: 0};
    },

    render: function() {
        return (
            <div></div>
        );
    }

});

var ManagerForm = React.createClass({
    getInitialState: function() {
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

    getDefaultProps: function() {
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

    componentDidMount: function() {
        this.setState(this.props);
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

    render: function() {
        return (
            <div class="managerForm">
                <form>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputField name="username" label="Username" value={this.state.username} change={this.setUsername} required={true}/>
                        </div>
                        <div className="col-sm-6">
                            <InputField type="password" name="password" label="Password" value={this.state.password} change={this.setPassword} required={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputField name="first_name" label="First name" value={this.state.first_name} change={this.setFirstName} required={true}/>
                        </div>
                        <div className="col-sm-6">
                            <InputField name="last_name" label="Last name" value={this.state.last_name} change={this.setLastName} required={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputField name="phone" label="Phone" value={this.state.phone} change={this.setPhone} required={true}/>
                        </div>
                        <div className="col-sm-6">
                            <InputField name="email_address" label="Email" value={this.state.email_address} change={this.setEmailAddress} required={true}/>
                        </div>
                    </div>
                    <InputField name="company_name" label="Company name" value={this.state.company_name} change={this.setCompanyName}/>
                    <InputField name="company_address" label="Company address" value={this.state.company_address} change={this.setCompanyAddress}/>
                    <InputField name="company_url" label="Company URL" value={this.state.company_url} change={this.setCompanyUrl}/>
                    <label htmlFor="m-times-available">Times available</label>
                    <textarea id="m-times-available" className="form-control" name="times_available" value={this.state.times_available} onChange={this.setTimesAvailable}/>
                </form>
            </div>
        );
    }
});
ReactDOM.render(
    <Manager/>, document.getElementById('manager'));
