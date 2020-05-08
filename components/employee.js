const fileHandling = require('../_helpers/fileHandling');
const errorHandler = require('../_helpers/errorHandler');

const createEmployee = (args, req) => {
    try {
        const employee = args;
        const fileData = fileHandling.readSync('./assets/employees.json');
        let employees = fileData ? fileData : [];
        const total = employees.length;
        employee.id = total + 1;
        employees.push(employee);
        fileHandling.writeSync('./assets/employees.json', employees);
        return {message: 'employee added'};
    } catch (error) {
        errorHandler(req, error);
    }
};

const getEmployees = (args, req) => {
    const perPage = args.perPage;
    const query = null;
    const currentPage = args.currentPage;
    const age = null;

    try {
        let employees = fileHandling.readSync('./assets/employees.json');

        if (args.query) {
            employees = employees.filter(employee => employee.employee_name.includes(query));
        }

        if (args.age) {
            employees = employees.filter(employee => parseInt(employee.employee_age) <= parseInt(age));
        }
        const total = employees.length;
        const startIndex = perPage * (currentPage - 1);
        const endIndex = perPage * currentPage;
        return {data: employees.slice(startIndex, endIndex), total: total};
    } catch (error) {
        req.res.statusCode = req.res.statusCode ? req.res.statusCode : 500;
        throw new Error(error);
    }
};

const getEmployee = (args, req) => {
    try {
        const id = args.id;
        const employees = fileHandling.readSync('./assets/employees.json');
        const employee = employees.find(employee => parseInt(employee.id) === parseInt(id));
        if (employee) return employee;
        req.res.manualStatusCode = 404;
        throw new Error(`Employee record not found with ${id} id `);
    } catch (error) {
        errorHandler(req, error);
    }
};

const updateEmployee = (args, req) => {
    try {
        const id = args.id;
        const employees = fileHandling.readSync('./assets/employees.json');
        const index = employees.findIndex(employee => {
            return parseInt(employee.id) === parseInt(id);
        });

        if (index === -1) {
            req.res.manualStatusCode = 404;
            throw new Error(`Employee record not found with ${id} id `);
        }
        employees[index] = args;

        fileHandling.writeSync('./assets/employees.json', employees);

        return {message: 'employee record updated'};
    } catch (error) {
        errorHandler(req, error);
    }
};

const deleteEmployee = (args, req) => {
    try {
        const id = args.id;
        const employees = fileHandling.readSync('./assets/employees.json');
        const index = employees.findIndex(employee => {
            return parseInt(employee.id) === parseInt(id);
        });

        if (index === -1) {
            req.res.manualStatusCode = 404;
            throw new Error(`Employee record not found with ${id} id `);
        }
        employees.splice(index, 1);
        fileHandling.writeSync('./assets/employees.json', employees);
        return {message: 'employee record deleted'};
    } catch (error) {
        errorHandler(req, error);
    }
};
module.exports = {createEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee};
