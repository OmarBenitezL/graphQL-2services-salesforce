const buildApiRestfulControllers = require('./helpers');
const rp = require('./Request');
const restfulBoilerplate = buildApiRestfulControllers('student');
module.exports = restfulBoilerplate

