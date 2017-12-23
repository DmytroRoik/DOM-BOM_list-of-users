createForm();
document.getElementsByClassName('addEmployee')[0].onclick=function () {
	
};

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

var usersList={
	users: [],
	limit: 10,
	getCountOfUser: function () {
		return users.length;
	},
	isUserAdded: function (user) {
		if(this.getCountOfUser()<limit&&this.getAvgSalary()<2000){ this.users.push(user);return true;}
		else return false;
	},
	getAvgSalary: function () {
		let sum=0;
		if (getCountOfUser()==0)return 0;
		for(let el in this.users){
			sum+=el.salary;
		}
		return sum/this.getCountOfUser();
	},
	isUserPresent: function (user) {
		for(let el of this.users){
			if(el.isEquals(user))return true;
		}
		return false;
	}
}

function createForm(){
	var $form = document.createElement('form');
		$form.innerHTML=
			'<label for="firstName">First Name: '+
				'<input type="text" id="firstName"></label><br>'+
			'<label for="lastName">Last Name: '+
				'<input type="text" id="lastName"></label><br>'+
			'<label for="salary">Salary : '+
				'<input type="number" id="salary"></label><br>'+
			'<label for="position">Position : '+
				'<input type="text" id="position"></label><br>'+
				'<input type="submit" value="Create">';
				document.body.append($form);
	$form.addEventListener('submit',createUser);
	var $tablo=document.createElement('div');
	    	$tablo.classList.add('tablo');
		 	$tablo.innerHTML="<label id='employeesCount' >0 </label>"+
						'<label id="avgSalary">0</label>';
		document.body.append($tablo);
}

function createUser(){
	event.preventDefault();
	var uFirstName=document.getElementById('firstName').value;
	var uLastName=document.getElementById('lastName').value;
	var uSalary = document.getElementById('salary').value;
	var uPosition=document.getElementById('position').value;
	var errors="";
	if(!isValid(uFirstName)){
		errors+='First Name, ';
	}
	if(!isValid(uLastName)){
		errors+='Last Name, ';
	}
	if(!isValid(uSalary)){
		errors+='Salary, ';
	}
	if(!isValid(uPosition)){
		errors+='Position, ';
	}

	if(errors==""){//users data is good
		console.log(usersList.isUserPresent(uFirstName,uLastName));
		var user=new User(uFirstName,uLastName,uSalary,uPosition);
		if(usersList.isUserPresent(user))
			{
				alert('This user have duplicate');return;
			}
		else usersList.users.push(user);
	}else {
		alert("Invalid data: "+errors);
		return;
	}
}
function isValid(value) {
	if(value=="")return false;
	var regex;
	if(isNaN(value)) regex=/^[A-Z|a-z]/;
	else regex= /^[0-9]/;

	for(let el of value)
		if(!regex.test(el))return false;

	return true;
}


