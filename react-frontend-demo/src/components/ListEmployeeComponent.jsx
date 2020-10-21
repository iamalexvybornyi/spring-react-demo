import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState({ employees: response.data })
        });
    }

    addEmployee() {
        this.props.history.push('/add-update-employee/add');
    }

    editEmployee(id) {
        this.props.history.push(`/add-update-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then((response) => {
            this.setState({
                employees: this.state.employees.filter(employee => employee.id !== id)
            });
        });
    }

    viewEmployee(id) {
        this.props.history.push(`view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <h2 className = "text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" style = {{marginBottom: "10px"}} onClick={this.addEmployee}>Add Employee</button>
                </div>
                    <div className = "row" style = {{overflow: "auto", height: "400px"}}>
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th>Employee First Name</th>
                                    <th>Employee Last Name</th>
                                    <th>Employee Email Id</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                            <td> { employee.firstName} </td>
                                            <td> { employee.lastName} </td>
                                            <td> { employee.emailId} </td>
                                            <td>
                                                <button className = "btn btn-info" onClick = { () => this.editEmployee(employee.id)}>Update</button>
                                                <button style = {{marginLeft: "10px"}} className = "btn btn-info" onClick = { () => this.viewEmployee(employee.id)}>View</button>
                                                <button style = {{marginLeft: "10px"}} className = "btn btn-danger" onClick = { () => this.deleteEmployee(employee.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;