const fileHandling = require('../_helpers/fileHandling');

const login = (args, req) => {
    const userData = args;
    const fileData = fileHandling.readSync('./assets/users.json');

    let users = fileData ? fileData : [];

    const userRecordIndex = users.findIndex(user => {
        return user.email == userData.email;
    });

    if (userRecordIndex === -1) {
        req.res.manualStatusCode = 401;
        throw new Error('This email is not registered');
    }

    if (users[userRecordIndex].password !== userData.password) {
        req.res.manualStatusCode = 401;
        throw new Error('password is incorrect');
    }

    return {
        email: userData.email,
        token: 'fake jwt token',
        firstName: users[userRecordIndex].firstName,
        lastName: users[userRecordIndex].lastName,
    };
};

const registration = (args, req) => {
    let usersData = args;

    const fileData = fileHandling.readSync('./assets/users.json');
    let users = fileData ? fileData : [];

    usersData.id = users.length + 1;
    usersData.role = 'user';

    const isUserExist = users.some(user => {
        return user.email == usersData.email;
    });

    if (isUserExist) {
        req.res.manualStatusCode = 409;
        throw new Error('users already exist with this email');
    }
    users.push(usersData);
    fileHandling.writeSync('./assets/users.json', users);
    return {message: 'Registration successfully'};
};

module.exports = {login, registration};
