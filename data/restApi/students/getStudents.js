const login = require('../login/Auth');
const buildApiRestfulControllers = require('../helpers/helpers');

const getStudent = (id) => {
  return buildApiRestfulControllers('student', process.env.serviceCookie).get({ id })
  .then( response => {
    const student = response.data.map(student => {
      const mapped = {};
      mapped.id = student.id;
      mapped.firstName = student.firstName;
      mapped.country = student.country;
      return mapped;
    });
    return student[0];
  });
};

module.exports = getStudent;