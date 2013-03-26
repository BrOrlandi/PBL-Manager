$(document).on("pageinit", function(){

//$('#listlist').
var prob = getProblema();

$('#problema').html(prob.titulo);
$('#prob_desc').html(prob.descricao);

var users_data = loadUsuarios();

$('#n_usuarios').html(users_data.users.length);

users_data.users.forEach(function(user){
	$('#lista_usuarios').append('<li user_id="'+user.id+'"><a href="#">'+user.nome+'<p></p><p>'+user.email+'</p></a></li>');
});
$('#lista_usuarios').listview('refresh');


$('#button_cadastrar_usuario').click(function() {
	var nome = $('#nome_usuario').val();
	var email = $('#email_usuario').val();
	cadastrarUsuario(nome,email);
});


var tarefas_data = loadTarefas();

$('#n_tarefas').html(tarefas_data.tarefas.length);
tarefas_data.tarefas.forEach(function(tarefa){
	$('#lista_tarefas').append('<li tarefa_id="'+tarefa.id+'" class="'+ applyClass(tarefa) +'"><a href="#">'+tarefa.titulo+'<p></p><p>'+tarefa.descricao+'</p><p class="ui-li-aside">'+formatTarefaStatus(tarefa.status)+'<br/>'+formatTarefaDataEntrega(tarefa.data_entrega)+'</p></a></li>');
});
$('#lista_tarefas').listview('refresh');

$('#button_cadastrar_tarefa').click(function() {
	var nome = $('#nome_tarefa').val();
	var desc = $('#desc_tarefa').val();
	var status = $('#status_tarefa').val();
	var data = $('#data_entrega_tarefa').val();
	cadastrarTarefa(nome,desc,status,data);
});

});


var applyClass = function(tarefa){
	var status = tarefa.status;

	if (status == Status.Pendente) {
		return 'pendente';
	} else if (status == Status.EmAndamento) {
		return 'emandamento';
	} else if (status == Status.Concluido) {
		return 'concluido';
	}

}

var formatTarefaStatus = function(status){	
	if(status == Status.Pendente){
		return 'Pendente';
	}
	else if(status == Status.EmAndamento){
		return 'Em andamento';
	}
	else if(status == Status.Concluido){
		return 'Concluído';
	}
}

/*
var formatTarefaStatus = function(status){	
	if(status == Status.Pendente){
		return '<span style=" color: #0097dd">Pendente</span>';
	}
	else if(status == Status.EmAndamento){
		return '<span style=" color: #f7b500">Em andamento</span>';
	}
	else if(status == Status.Concluido){
		return '<span style=" color: #00e500">Concluido</span>';
	}
}
*/


var formatTarefaDataEntrega= function(data){
	var date = new Date(data);
	//return date.toLocaleDateString();
	var day = date.getDate();
	var day_f = day > 9? day : '0'+day;
	var month = date.getMonth() +1;
	var month_f = month > 9? month : '0'+month;
	return date.toDateString(); 
	//return  day_f + '/' + month_f;
}
