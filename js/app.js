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
		return this.users.length;
	},
	addUser: function (user) {
		//console.log(this.getCountOfUser(),this.getAvgSalary(),this.limit)
		if(this.getCountOfUser()<this.limit&&this.getAvgSalary()<2000){ this.users.push(user);}
		else alert("No free space in table");
	},
	getAvgSalary: function () {
		if (this.getCountOfUser()==0)return 0;
		console.log(this.getCountOfUser())
		let sum=0;
		for(let el of this.users){
			console.log(this.getCountOfUser(),el);
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

function createUser(){
	event.preventDefault();
	var uFirstName=document.getElementById('firstName').value;
	var uLastName=document.getElementById('lastName').value;
	var uSalary = document.getElementById('salary').value;
	var uPosition=document.getElementById('position').value;

	var errors="";
	if(!isValid(uFirstName)) errors+='First Name, ';
	if(!isValid(uLastName))  errors+='Last Name, ';
	if(!isValid(uSalary  ))  errors+='Salary, ';
	if(!isValid(uPosition))	 errors+='Position, ';

	if(errors==""){//users data is good
		var user=new User(uFirstName,uLastName,uSalary,uPosition);

		if(usersList.isUserPresent(user)){
				alert('This user have duplicate');return;//user is a present
			}
			else{
				usersList.addUser(user);
				showUsersInList();
				ShowForm(false);
			}
		}
		else {
			alert("Invalid data: "+errors);
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

	function showUsersInList () {
		var $list=document.getElementsByClassName('employeeList')[0];
		var header=$list.children[0];
		$list.innerHTML='';
		$list.append(header);

		if(usersList.users.length==0)return;
		for(var el of usersList.users){
			
			var $li=document.createElement('li'),
			$firstName=document.createElement('span'),
			$lastName=document.createElement('span'),
			$salary=document.createElement('span'),
			$position=document.createElement('span');

			$firstName.classList.add('employeeFirstName');
			$lastName.classList.add('employeeLastName');
			$salary.classList.add('employeeSalary');
			$position.classList.add('employeePosition');

			$firstName.innerText=el.firstName;
			$lastName.innerText=el.lastName;
			$salary.innerText='$'+el.salary;
			$position.innerText=el.position;
			$li.append($firstName,$lastName,$salary,$position);

			$list.append($li);
		}
	}

	function ShowForm () {
		var $form=document.getElementById('emploeeForm');
		$form.classList.toggle('visible');
		$form.reset();
	}
	document.getElementsByClassName('addEmployee')[0].addEventListener('click', ShowForm);

