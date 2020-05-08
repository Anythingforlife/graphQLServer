var {buildSchema} = require('graphql');
const {createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee} = require('../components/employee');

const schema = buildSchema(`
type User {
  id: String
  name: String
}

type Employee {
    id: String,
    employee_name: String,
    employee_salary: String,
    employee_age: Int,
    profile_image: String,
}

type EmployeeList {
  data : [Employee],
  total: Int
}

type SuccessMessage {
    message : String,
    total: Int
  }

type Query {
  getEmployee(id: String!) : Employee,
  getEmployees(currentPage: Int!, perPage:Int!): EmployeeList
}

type Mutation {
  updateEmployee(id: String!, employee_name: String , employee_salary : String , employee_age : Int,profile_image : String ) : SuccessMessage,
  createEmployee(employee_name: String , employee_salary : String , employee_age : Int,profile_image : String ) : SuccessMessage,
  deleteEmployee(id: String!) : SuccessMessage
 }
`);

const root = {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
};

module.exports = {schema, root};
