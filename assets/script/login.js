$(function () {
    var loginForm = $('#loginForm');
    var errorUsername = $('#errorUsername');
    var errorPassword = $('#errorPassword');


    function usernameValidation(username) {
        var usernameRegExp = /^[a-zA-Z0-9éèà._-]+$/;
        return usernameRegExp.test(username);
    }

    loginForm.submit(function (e) {
        e.preventDefault();
    var formValid = true;
    var $username = $('#username').val();

    var $this = $(this);
    errorUsername.html('');
    errorPassword.html('');
    /*if(!usernameValidation($username)){
        formValid = false;
        errorUsername.html('Veuillez saisir un pseudo valide');
        console.log('Username');
    }*/

    if( $username == '' || $('#password').val() == '') {
        formValid = false;
            errorUsername.html('Tous les champs ne sont pas remplis');
    }

    if (formValid) {
        // Envoi de la requête HTTP en mode asynchrone
        $.ajax({
            url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
            type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
            data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
            dataType: 'json', // JSON,
            success: function(data) { 
                if(data.success === false) {
                    errorUsername.html(data.errors['username']);
                    errorPassword.html(data.errors['password']);
                }
                else{
                    document.location.href="?action=home";
                }
            }


        });
    }
});


});
