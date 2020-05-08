var {buildSchema} = require('graphql');
const {createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee} = require('../components/employee');

const {login, registration} = require('../components/authentication');

const schema = buildSchema(`
type User {
    id: Int!,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
}

type LoginSuccess {
    email : String, 
    token : String,
    firstName : String, 
    lastName : String
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
  deleteEmployee(id: String!) : SuccessMessage,
  login(email : String! , password: String!) : LoginSuccess,
  registration(firstName : String , lastName : String, email : String! , password: String!) : SuccessMessage  
 }
`);

const root = {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    login,
    registration,
};

module.exports = {schema, root};
