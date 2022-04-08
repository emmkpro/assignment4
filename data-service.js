const { response } = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://DaFuzzyOgre:Flavory15@capstone.qdnab.mongodb.net/Capstone?retryWrites=true&w=majority");

const Employee = mongoose.model('Employee', Schema({
    employeeNum: Number, 
    firstName: String,
    lastName: String,
    email: String,
    SSN: String,
    addressStreet: String,
    addressCity: String,
    addressState: String,
    addressPostal: String,
    maritalStatus: String,
    isManager: Boolean,
    employeeManagerNum: Number,
    status: String,
    hireDate: String
  }));

  const Department = mongoose.model('Department', Schema({
        departmentId: Number,
        departmentName: String
      }));
function getRandomInt(max) {
        return Math.floor(Math.random() * max);
}

module.exports.getAllEmployees = function(){
    return new Promise(function (resolve, reject) { 
       Employee.find({})
       .exec()
       .then((employeeObj) => {
        employeeObj = employeeObj.map(value => value.toObject());
        resolve(employeeObj);
        
    })})};



module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) { 
        if (employeeData.length == 0)
        {
            reject("No employee Data")
        }
        employeeData.isManager = (employeeData.isManager) ? true : false;
        let employeeNum= getRandomInt(100000);
        employeeData.employeeNum = employeeNum;
        Object.keys(employeeData).forEach(
            (key) => (employeeData[key] === "") ? employeeData[key] = null : employeeData[key]
        );

        console.log(employeeData);
        const doc = new Employee(employeeData);
        doc.save();
        resolve(employeeData);
    })};

   


module.exports.getEmployeeByNum = function (num) {
    return new Promise(function (resolve, reject) { 
        Employee.find({employeeNum: num})
       .exec()
       .then((employeeByNum) => {
        employeeByNum = employeeByNum.map(value => value.toObject());
        if (err){
            reject("Error Finding Data")
        }
        else {
            resolve(employeeByNum);
        }
})})};


module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
       Employee.find({status: status})
       .exec()
       .then((employeeByStatus) => {
        employeeByStatus = employeeByStatus.map(value => value.toObject());
        if (err){
            reject("Error Finding Data")
        }
        else {
            resolve(employeeByStatus);
        }
})})};



module.exports.getEmployeesByDepartment = function (department) {
    return new Promise(function (resolve, reject) { 
        Employee.find({departmentId: department})
        .exec()
        .then((employeeByDepartment) => {
         employeeByDepartment = employeeByDepartment.map(value => value.toObject());
         if (err){
             reject("Error Finding Data")
         }
         else {
             resolve(employeeByDepartment);
         }
})})};


module.exports.getEmployeesByManager = function (manager) {
    return new Promise(function (resolve, reject) { 
        Employee.find({employeeManagerNum: manager})
        .exec()
        .then((employeeByManager) => {
         employeeByManager = employeeByManager.map(value => value.toObject());
         if (err){
             reject("Error Finding Data")
         }
         else {
             resolve(employeeByManager);
         }
})})};

module.exports.getDepartments = function (){
    return new Promise(function (resolve, reject) { 
        Department.find({})
       .exec()
       .then((departmentObj) => {
        departmentObj = departmentObj.map(value => value.toObject());
        resolve(departmentObj);
    })})};

    module.exports.getDepartmentById = function (id) {
        return new Promise(function (resolve, reject) {
           Department.find({departmentId: id})
           .exec()
           .then((departmentById) => {
            departmentById = departmentById.map(value => value.toObject());
            if (err){
                reject("Error Finding Data")
            }
            else {
                resolve(departmentById);
            }
    })})};

    module.exports.deleteDepartmentById = function (id) {
        return new Promise(function (resolve, reject) {
           Department.deleteOne({departmentId: id})
            if (err){
                reject("Error Finding Data")
            }
            else {
                resolve(`Department: ${id} was deleted`);
            }
    })};



module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) { 
        employeeData.isManager = (employeeData.isManager) ? true : false;
        Object.keys(employeeData).forEach(
            (key) => (employeeData[key] === "") ? employeeData[key] = null : employeeData[key]
        );
        Employee.updateOne({employeeNum: employeeData.employeeNum}, 
            {Employee:employeeData});
            
        
            if (err)
            {
                reject(`An employee number of ${employeeData.employeeByNum} was not found`)
            }
            else{
                resolve(`The employee has been updated`);
            }
        })};

        module.exports.updateDepartment = function (departmentData) {
            return new Promise(function (resolve, reject) {                
                Department.updateOne({departmentId: departmentData.departmentId}, 
                    {Department:departmentData});
                departmentData.departmentId = (departmentData.departmentId) ? departmentData.departmentId : null;
                departmentData.departmentName = (departmentData.departmentName) ? departmentData.departmentName : null;             
                if (err)
            {
                reject(`A department ID of ${departmentData.departmentId} was not found`)
            }
            else{
                resolve(`The employee has been updated`);
            }
            })};
            module.exports.addDepartment = function (departmentData) {
                return new Promise(function (resolve, reject) { 
                    if (departmentData.length == 0)
                    {
                        reject("No Department Data")
                    }
                    
                    departmentData.departmentId = getRandomInt(1000000)
                    departmentData.departmentName = (departmentData.departmentName) ? departmentData.departmentName : null;
                    const doc = new Department(departmentData);
                    doc.save()
                    resolve(departmentData);
                })};
            