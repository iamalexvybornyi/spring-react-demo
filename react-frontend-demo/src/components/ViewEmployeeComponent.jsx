import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }

        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        this.props.history.push('/employees');
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((response) => {
            this.setState({
                employee: response.data
            });
        });
    }

    render() {
        return (
            <div>
                <div style={{marginTop: "10px"}} className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Employee First Name: </label>
                            <input readonly disabled name = "firstName" className = "form-control"
                                        value = {this.state.employee.firstName}></input>
                        </div>
                        <br></br>
                        <div className="row">
                            <label>Employee Last Name: </label>
                            <input readonly disabled name = "lastName" className = "form-control"
                                        value = {this.state.employee.lastName}></input>
                        </div>
                        <br></br>
                        <div className="row">
                            <label>Employee Email: </label>
                            <input readonly disabled name = "emailId" className = "form-control"
                                        value = {this.state.employee.emailId}></input>
                        </div>
                    </div>
                    <div style={{marginTop: "10px", marginBottom: "10px", border: "none"}} className="card col-md-6 offset-md-3">
                        <button className = "btn btn-primary" onClick={this.goBack}>Back</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ViewEmployeeComponent;