class Manager {
    constructor(name, id, email, officeNumber) {
      this.name = name;
      this.id = id;
      this.email = email;
      this.officeNumber = officeNumber
      this.role = "Manager"
    }
    getRole() {
      return this.role
    }
  
    getOfficeNumber() {
      return this.officeNumber
    }
  }
  
  module.exports = Manager