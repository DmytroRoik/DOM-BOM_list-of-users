var usersList={
	users: [],
	limit: 10,
	addUser: function (user) {
		if(this.users.length<this.limit&&this.getAvgSalary()<2000){ this.users.push(user);}
		else alert("Count of Employee more than "+this.limit+" or average salary more than 2000");
	},
	isUserCanBeAdded: function  () {
		return this.users.length<this.limit;
	},
	getAvgSalary: function () {
		if (this.users.length==0)return 0;
		let sum=0;

		for(let el of this.users){
			sum+= +el.salary;
		}
		return sum/this.users.length;
	},
	isUserPresent: function (user) {
		for(let el of this.users){
			if(el.isEquals(user))return true;
		}
		return false;
	}
}

//
document.getElementById('limitUser').value=usersList.limit;
//
function setListInfo () {
	var $countOfUserSpan=document.querySelector('.tablo .listInfo span');
	var $avgSalarySpan=document.querySelectorAll('.tablo .listInfo span')[1];

		$countOfUserSpan.innerText=""+usersList.users.length;
		$avgSalarySpan.innerText="$"+usersList.getAvgSalary();
}

function setLimit(){
	var $limit=document.getElementById('limitUser');
	if(isValid($limit.value))usersList.limit=$limit.value;
	else alert('limit is invalid');
	$limit.value=usersList.limit;
	allowCreateUser(usersList.isUserCanBeAdded());
}
function createUser(){
	event.preventDefault();
	if(!usersList.isUserCanBeAdded()){
		alert("No free space in table1")
		return;
	}
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
				setListInfo();
				document.getElementById('limitUser').min=usersList.users.length;
			}
		}
		else {
			alert("Invalid data: "+errors);
		}
		allowCreateUser(usersList.isUserCanBeAdded());
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
		allowCreateUser(usersList.isUserCanBeAdded());
	}
	function allowCreateUser(isCanAdd){
		if(isCanAdd){
			document.querySelector('form button').disabled=false;
		}
		else document.querySelector('form button').disabled=true;
	}


