import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateUpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === 'add') {
            return;
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((response) => {
                let employee = response.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                })
            });
        }
    }

    saveEmployee = (e) => {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };
        console.log('Employee: ' + JSON.stringify(employee));

        if (this.state.id === 'add') {
            EmployeeService.createEmployee(employee).then(response => {
                this.props.history.push('/employees');
            });
        } else {
            EmployeeService.updateEmployee(this.state.id, employee).then(response => {
                this.props.history.push('/employees');
            });
        }
    }

    cancel() {
        this.props.history.push('/employees');
    }

    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) => {
        this.setState({lastName: event.target.value});
    }

    changeEmailIdHandler = (event) => {
        this.setState({emailId: event.target.value});
    }

    getFormTitle() {
        if (this.state.id === 'add') {
            return <h3 className = "text-center">Add Employee</h3>
        } else {
            return <h3 className = "text-center">Update Employee</h3>
        }
    }

    render() {
        return (
            <div>
                <div style={{marginTop: "10px"}} className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {this.getFormTitle()}
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label>First Name: </label>
                                        <input placeholder = "First Name" name = "firstName" className = "form-control"
                                        value = {this.state.firstName} onChange = {this.changeFirstNameHandler}></input>
                                    </div>
                                    <div className = "form-group">
                                        <label>Last Name: </label>
                                        <input placeholder = "Last Name" name = "lastName" className = "form-control"
                                        value = {this.state.lastName} onChange = {this.changeLastNameHandler}></input>
                                    </div>
                                    <div className = "form-group">
                                        <label>Email: </label>
                                        <input placeholder = "Email" name = "emailId" className = "form-control"
                                        value = {this.state.emailId} onChange = {this.changeEmailIdHandler}></input>
                                    </div>

                                    <button className = "btn btn-success" onClick={this.saveEmployee}>Save</button>
                                    <button className = "btn btn-danger" onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUpdateEmployeeComponent;