$(function () {



    function emailValidation(email) {
        var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
    }
    function nameValidation(name) {

        var nameRegExp = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
        return nameRegExp.test(name);
    }
    function usernameValidation(username) {
        var usernameRegExp = /^[a-zA-Z0-9éèà._-]+$/;
        return usernameRegExp.test(username);
    }


    var firstnameForm = $('#firstnameForm');
    var lastnameForm = $('#lastnameForm');
    var emailForm = $('#emailForm');
    var factionForm = $('#factionForm');
    var usernameForm = $('#usernameForm');


    var errorFirstnameEditing = $('#errorFirstnameEditing');
    var errorLastname = $('#errorLastname');
    var errorEmail = $('#errorEmail');
    var errorUsername = $('#errorUsername');
    var errorFaction= $('#errorFaction');

    var parameterFirstname = $('#parameterFirstname');
    var parameterUsername = $('#parameterUsername');
    var parameterLastname = $('#parameterLastname');
    var parameterEmail = $('#parameterEmail');
    var parameterFaction = $('#parameterFaction');


    parameterFirstname.click(function(){
        firstnameForm.css('display','block')

    });
    parameterLastname.click(function() {
        lastnameForm.css('display','block')
    });
    parameterEmail.click(function() {
        emailForm.css('display','block')
    });
    parameterFaction.click(function() {
        factionForm.css('display','block')
    });
    parameterUsername.click(function() {
        usernameForm.css('display','block')
    });
    firstnameForm.submit(function(){
        errorFirstnameEditing.html('');

        var formValid = true;
        var $this = $(this);

        var $firstname = $('#firstnameEditing').val();




      /*  if (!nameValidation($firstname) ) {
            formValid = false;
            errorFirstname.html('Veuillez saisir un prénom valide');
        }*/
        if (formValid) {
            // Envoi de la requête HTTP en mode asynchrone

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                dataType: 'json', // JSON,
                success: function(data) { // Je récupère la réponse du fichier PHP

                    if(data.success === false) {
                        errorFirstnameEditing.html(data.errors['fields']);


                    }
                },
                error: function(response,statut,error){
                    console.log(response,statut,error);
                }
            });
        }
        return false;

    });

    usernameForm.submit(function(){
        errorUsername.html('');
        var formValid = true;
        var $username = $('#usernameEditing').val();
        var $this = $(this);
     /*   if (!usernameValidation($username) ) {
            formValid = false;
            errorUsername.html('Veuillez saisir un pseudo valide');
            console.log('bot ok');
        }*/
     console.log(formValid);
        if (formValid) {
            // Envoi de la requête HTTP en mode asynchrone

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                success: function(data) { // Je récupère la réponse du fichier PHP

                    if(data.success === false) {
                        errorUsername.html(data.errors['fields']);
                        console.log('ok');


                    }
                },
                error: function(response,statut,error){
                    console.log(response,statut,error);
                }
            });
        }
        return false;
    });





    lastnameForm.submit(function(){
        var formValid = true;

        errorLastname.html('');

        var $lastname = $('#lastnameEditing').val();

        if(!nameValidation($lastname)){
            formValid = false;
            errorLastname.html('Veuillez saisir un nom de famille valide');
        }
      return formValid;
    });

    emailForm.submit(function(){
        var formValid = true;
        errorEmail.html('');
        var $email = $('#emailEditing').val();
        if (!emailValidation($email)) {
            formValid = false;
            errorEmail.html('Veuillez saisir un email valide');
        }
        return formValid;
    });


    factionForm.submit(function(){
        var formValid = true;

        var $faction = $('#factionEditing').val();
            console.log($faction);
        errorFaction.html('');

        if($faction == ''){
            formValid = false;
            errorFaction.html('Veuillez saisir un numéro de téléphone valide') ;
        }


        return formValid;
    });

});
/**
 * Created by Dam's on 22/04/2017.
 */
