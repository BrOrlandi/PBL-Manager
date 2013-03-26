var Status = {
	'Pendente' : 0,
	'EmAndamento' : 1,
	'Concluido' : 2
} 


var getProblema= function(){
	
	var problem_return;
	
	var problem = window.localStorage.getItem("problema");
	if(problem == null){
		var prob_new = new Problema("Problema 1", "Descrição do problema");
		var json_prob = window.JSON.stringify(prob_new);
		window.localStorage.setItem("problema",json_prob);
		problem_return = prob_new;
	}
	else
	{
		problem_return = window.JSON.parse(problem);
	}
	return problem_return;
}


var Problema = function(titulo, descricao){
	this.titulo = titulo;
	this.descricao = descricao;
	this.tarefas = new Array();
//	this.usuarios = new Array();
}

var Tarefa = function(titulo, descricao, status){
	this.titulo = titulo;
	this.descricao = descricao;
	this.status = status;
}

var Usuario = function(id,nome,email){
	this.id = id;
	this.nome = nome;
	this.email = email;
}

var cadastrarUsuario = function(nome, email){
	var users = loadUsuarios();
	var id;
	if(users.length == 0){
		id = 0;
	}
	else{
		var last = users[users.length-1];
		id = last.id + 1;	
	}
	
	var new_user = new Usuario(id,nome,email);
	
	users.push(new_user);
	users.sort(function(a,b){
		var username_a = a.nome;
		var username_b = b.nome;
		return username_a.localeCompare(username_b);
	});
	saveUsers(users);
}

var removeUser = function(id){
	var users = loadUsuarios();
	//var find = $.inArray(value, array);
	var find = $.grep(users, function(e){
		return e.id;
	});
	if(find.length == 0){
		return;
	}
	var user_remove = find[0];
	var index = users.indexOf(user_remove,0);
	users.splice(index,1);
	saveUsers(users);
}

var loadUsuarios = function(){
	
	var users_return;
	
	var users = window.localStorage.getItem("usuarios");
	if(users == null){
		var users_new = new Array();
		var json_users = window.JSON.stringify(users_new);
		window.localStorage.setItem("usuarios",json_users);
		users_return = users_new;
	}
	else
	{
		users_return = window.JSON.parse(users);
	}
	return users_return;
}

var saveUsers = function(users){
	var json = window.JSON.stringify(users);
	window.localStorage.setItem("usuarios",json);
}
