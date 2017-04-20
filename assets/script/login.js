$(function () {
    var loginForm = $('#loginForm');
    var errorUsername = $('#errorUsername');


    function usernameValidation(username) {
        var usernameRegExp = /^[a-zA-Z0-9éèà._-]+$/;
        return usernameRegExp.test(username);
    }   

    loginForm.on('submit', function(e) {
    e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

    var $this = $(this); // L'objet jQuery du formulaire

    $('#errorUsername').text('');
    $('#errorPassword').text('');

    // Je vérifie une première fois pour ne pas lancer la requête HTTP
    // si je sais que mon PHP renverra une erreur
    if($('#username').val() == '' || $('#password').val() == '') {
        errorUsername.text('Tous les champs ne sont pas remplis');
    } else {
        // Envoi de la requête HTTP en mode asynchrone
        console.log($this.attr('action'), $this.attr('method'));
        $.ajax({
            url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
            type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
            data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
            dataType: 'json', // JSON,
            success: function(data) { // Je récupère la réponse du fichier PHP
                if(data.success === false){
                    errorUsername.text(data.errors['username']);
                    $('#errorPassword').text(data.errors['password']);
                }
                else{
                    console.log('frites');
                }
            }
        });
    }
});


});
