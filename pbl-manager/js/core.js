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

var Tarefa = function(id, titulo, descricao, status, data_entrega){
	this.id = id;
	this.titulo = titulo;
	this.descricao = descricao;
	this.status = status;
	this.data_criacao = $.now();
	this.data_entrega = data_entrega;
}

var Usuario = function(id,nome,email){
	this.id = id;
	this.nome = nome;
	this.email = email;
}

var cadastrarUsuario = function(nome, email){
	var users_data = loadUsuarios();
	
	users_data.lastID++;
	
	var new_user = new Usuario(users_data.lastID,nome,email);
	
	users_data.users.push(new_user);
	users_data.users.sort(function(a,b){
		var username_a = a.nome;
		var username_b = b.nome;
		return username_a.localeCompare(username_b);
	});
	saveUsers(users_data);
}

var removeUser = function(id){
	var users_data = loadUsuarios();
	//var find = $.inArray(value, array);
	var find = $.grep(users_data.users, function(e){
		return e.id == id;
	});
	if(find.length == 0){
		//alert('Not Found');
		return;
	}
	var user_remove = find[0];
	var index = users_data.users.indexOf(user_remove,0);
	users_data.users.splice(index,1);
	saveUsers(users_data);
}

var loadUsuarios = function(){
	
	var users_return;
	
	var users = window.localStorage.getItem("usuarios");
	if(users == null){
		var users_data = new Object();
		var users_new = new Array();
		users_data.lastID = -1;
		users_data.users = users_new;
		saveUsers(user_data);
		users_return = users_data;
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

var cadastrarTarefa = function(titulo, desc,status,data_entrega){
	var tarefas_data = loadTarefas();
	
	tarefas_data.lastID++;

	var new_tarefa = new Tarefa(tarefas_data.lastID,titulo,desc,status,data_entrega);
	
	tarefas_data.tarefas.push(new_tarefa);
	tarefas_data.tarefas.sort(function(a,b){
		var status_a = a.status;
		var status_b = b.status;
		var dif = status_a - status_b;
		if(dif != 0)
		{
			return dif;
		}
		else
		{
			return a.data_criacao - b.datacriacao;
		}
	});
	saveTarefas(tarefas_data);
}

var removeTarefa = function(id){
	var tarefas_data = loadTarefas();
	//var find = $.inArray(value, array);
	var find = $.grep(tarefas_data.tarefas, function(e){
		return e.id == id;
	});
	if(find.length == 0){
		//alert('Not Found');
		return;
	}
	var tarefa_remove = find[0];
	var index = tarefas_data.tarefas.indexOf(tarefa_remove,0);
	tarefas_data.tarefas.splice(index,1);
	saveTarefas(tarefas_data);
}


var loadTarefas = function(){
	
	var tarefas_return;
	
	var tarefas = window.localStorage.getItem("tarefas");
	if(tarefas == null){
		var tarefas_data = new Object();
		var tarefas_new = new Array();
		tarefas_data.lastID = -1;
		tarefas_data.tarefas = tarefas_new;
		saveTarefas(tarefas_data);
		tarefas_return = tarefas_data;
	}
	else
	{
		tarefas_return = window.JSON.parse(tarefas);
	}
	return tarefas_return;
}

var saveTarefas = function(tarefas){
	var json = window.JSON.stringify(tarefas);
	window.localStorage.setItem("tarefas",json);
}
