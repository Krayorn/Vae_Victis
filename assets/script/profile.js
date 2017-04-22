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


    var errorFirstname = $('#errorFirstname');
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
        errorFirstname.html('');

        var formValid = true;


        var $firstname = $('#firstnameEditing').val();




        if (!nameValidation($firstname) ) {
            formValid = false;
            errorFirstname.html('Veuillez saisir un prénom valide');
        }
        return formValid;
    });

    usernameForm.submit(function(){
        errorUsername.html('');
        var formValid = true;
        var $username = $('#usernameEditing').val();
        if (!usernameValidation($username) ) {
            formValid = false;
            errorUsername.html('Veuillez saisir un pseudo valide');
            console.log('bot ok');
        }
        return formValid;
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
