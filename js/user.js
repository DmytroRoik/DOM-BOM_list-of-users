function User(firstName,lastName,salary,position){
	this.firstName=firstName;
	this.lastName=lastName;
	this.salary=salary;
	this.position=position;
}
User.prototype.isEquals = function(user){
	if(user.firstName==this.firstName&&user.lastName==this.lastName)return true;
	else return false; 
};