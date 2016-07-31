
function saveUser() {
	var su = new Array();
	function log_in(username, password) {
		this.username = username;
		this.password = password;
	} 
	su.add = function(un, pw) {
		this.push(new log_in(un, pw));
	};
	su.save = function() {
		var juser = JSON.stringify(this);
		localStorage.setItem('user',juser);
	};
	su.get = function() {
		if(localStorage.getItem('user')) {
			var u = localStorage.getItem('user');
			var u_data = JSON.parse(u);
			for(var i = 0; i<u_data.length; i++) {
				this.add(u_data[i].username, u_data[i].password);
			}
		}
		else {

		}
	};
	su.confirm = function(un, pw) {
		if(this.length) {
			for(var i = 0; i<this.length; i++) {
				if(this[i].username == un && this[i].password == pw) {
					return un;
				}
			}
		}
		else {
			return false;
		}
	};
	su.setkey = function(username) {
		localStorage.setItem('keyname',username);
		var a = location.href.split('/');
		a[a.length-1] = 'todo.html';
		location.href = a.join('/');
	}
	return su;
}


function logcontroller() {
	var self = this; 
	var login = document.getElementById('login');
	var sign = document.getElementById('sign');
	var user = document.getElementById('username');
	var pass = document.getElementById('password'); 
	var Suser = document.getElementById('Susername');
	var Spass = document.getElementById('Spassword');
	var consign = document.getElementById('consign');
	var exit = document.getElementById('exit');
	var m = new saveUser();
	var v = logview();
	m.get();
	login.onclick = function() {
		if(user.value && pass.value) {
			if(m.confirm(user.value, pass.value)) {
				m.setkey(user.value);
			}
			else {
				alert('Sorry, This is Not a Legal User!');
			}
		}
		else {
			alert('Sorry,U cant let them blank!');
		}
	}
	sign.onclick = function() {
		v.sign();
	}
	exit.onclick = function() {
		v.exit();
	}
	consign.onclick = function() {
	 	if(!m.confirm(Suser.value, Spass.value)) {
	 		m.add(Suser.value, Spass.value);
	 	 	Suser.value = '';
	 	 	Spass.value = '';
	 	 	alert('OK! Now U r a Legal User');
	 	}
	 	else {
	 		alert('This User Has Been herE!!!!!');
	 	}
	}
	window.onbeforeunload = function() {
		m.save();
	}
}


function logview() {
	var lg = document.getElementById('loginW');
	var sg = document.getElementById('signW');
	return {
		sign: function() {
			lg.style.display = 'none';
			sg.style.display = 'inline-block';
		},
		exit: function() {
			lg.style.display = 'inline-block';
			sg.style.display = 'none';
		}
	};
}

new logcontroller();