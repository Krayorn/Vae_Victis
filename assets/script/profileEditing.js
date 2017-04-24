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

 /*   var infoFirstname = $('#infoFirstname');
    var infoLastname = $('#infoLastname');
    var infoEmail = $('#infoEmail');
    var infoUsername = $('#infoUsername');*/


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

    usernameForm.submit(function(){
        errorUsername.html('');
        var formValid = true;
        var $username = $('#usernameEditing').val();
        var $this = $(this);

        if (formValid) {

            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                dataType: 'JSON',
                success: function(data) {
                    if(data.success === false) {
                        errorUsername.html(data.errors['fields']);
                    }
                    if(data.success === true){
                        $('#usernameRecap').html('Username : ' + $username);
                        $('#usernameEditing').val('');
                        usernameForm.css('display','none');
                    }
                },
            });
        }
        return false;
    });

    emailForm.submit(function(){
        var $this = $(this);
        var formValid = true;
        errorEmail.html('');
        var $email = $('#emailEditing').val();
        if (!emailValidation($email)) {
            formValid = false;
            errorEmail.html('Veuillez saisir un email valide');
        }

        if(formValid){
            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                dataType: 'JSON',
                success: function(data) {
                    if(data.success === false) {
                        errorEmail.html(data.errors['fields']);
                    }
                    if(data.success === true){
                        $('#emailRecap').html('Email : ' + $email);
                        $('#emailEditing').val('');
                        emailForm.css('display','none');
                    }
                },
            });            
        }
        return false;
    });

    firstnameForm.submit(function(){
        errorFirstname.html('');
        var formValid = true;
        var $this = $(this);

        var $firstname = $('#firstnameEditing').val();
        if (!nameValidation($firstname) ) {
            formValid = false;
            errorFirstname.html('Veuillez saisir un prénom valide');
        }
        if (formValid) {
            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                dataType: 'json', 
                success: function(data) { 
                    if(data.success === false) {
                        errorFirstname.html(data.errors['fields']);
                    }
                    if(data.success === true){
                        $('#firstnameRecap').html('Firstname : ' + $firstname);
                        $('#firstnameEditing').val('');
                        firstnameForm.css('display','none');
                    }
                },
            });
        }
        return false;

    });

   lastnameForm.submit(function(){
        var formValid = true;
        errorLastname.html('');
        var $this = $(this);
        var $lastname = $('#lastnameEditing').val();
        if(!nameValidation($lastname)){
            formValid = false;
            errorLastname.html('Veuillez saisir un nom de famille valide');
        }
        if (formValid) {
            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                dataType: 'json', 
                success: function(data) {
                    if(data.success === false) {
                        errorLastname.html(data.errors['fields']);
                    }
                    if(data.success === true){
                        $('#lastnameRecap').html('Lastname : ' + $lastname);
                        $('#lastnameEditing').val('');
                        lastnameForm.css('display','none');
                    }
                },
            });
        }        
      return false;
    });

    factionForm.submit(function(){
        var formValid = true;
        var $this = $(this);
        var $faction = $('#factionEditing').val();
        errorFaction.html('');

        if($faction == ''){
            formValid = false;
            errorFaction.html('Veuillez saisir un numéro de téléphone valide') ;
        }
        if(formValid){
            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                dataType: 'json', 
                success: function(data) {
                    if(data.success === false) {
                        errorFaction.html(data.errors['fields']);
                    }
                    if(data.success === true){
                        console.log($faction);
                        $('#factionRecap').html('Faction : ' + $faction);
                        factionForm.css('display','none');
                    }
                },
            });
        }
        return false;
    });

});
/**
 * 
 */
