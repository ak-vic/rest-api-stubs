/* eslint-disable no-unused-vars */
const Service = require('./Service');
const DalService = require('./DalService');

/**
* Create a user
*
* user User  (optional)
* returns User
* */
const createUser = ( user ) => new Promise(
  async (resolve, reject) => {
    try {
      user.body.id = 9999;
      resolve(Service.successResponse(
        user.body,
        201
      ));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete user
*
* id Integer 
* no response value expected for this operation
* */
const deleteUser = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get user by id
*
* id Integer 
* returns User
* */
const getUserById = ({ id }) => new Promise(
  async (resolve, reject) => {
    try {
      const users = DalService.getUserById(id);
      if(!users || users.length < 1){
        reject(Service.notFoundResponse());
      }
      resolve(Service.successResponse(
        users[0]
      ));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get user by name
*
* name String 
* returns User
* */
const getUserByName = ({ name }) => new Promise(
  async (resolve, reject) => {
    try {
      const users = DalService.getUserByName(name);
      if(!users || users.length < 1){
        reject(Service.notFoundResponse());
      }
      resolve(Service.successResponse(
        users[0]
      ));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all users
*
* returns List
* */
const getUsers = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse(DalService.getUsers())
      );
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update user
*
* id Integer 
* user User  (optional)
* no response value expected for this operation
* */
const updateUser = ({ id, user }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        id,
        user,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  createUser,
  deleteUser,
  getUserById,
  getUserByName,
  getUsers,
  updateUser,
};
