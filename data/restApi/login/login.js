const login = require('../login/Auth');
const loging = async () => {
    const response = await login('user', "pass");
    process.env.serviceCookie = response.cookie;
    console.log('loged on gendata :D');
};
module.exports = loging;