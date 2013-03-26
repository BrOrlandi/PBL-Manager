$(document).on("pageinit", function(){

//$('#listlist').
var prob = getProblema();

$('#problema').html(prob.titulo);
$('#prob_desc').html(prob.descricao);
$('#n_tarefas').html(prob.tarefas.length);

var users = loadUsuarios();

$('#n_usuarios').html(users.length);

users.forEach(function(user){
	$('#lista_usuarios').append('<li user_id="'+user.id+'"><a href="#">'+user.nome+'<p></p><p>'+user.email+'</p></a></li>');
});
$('#lista_usuarios').listview('refresh');


$('#button_cadastrar_usuario').click(function() {
	var nome = $('#nome_usuario').val();
	var email = $('#email_usuario').val();
	cadastrarUsuario(nome,email);
});

//removeUser(1);

});
