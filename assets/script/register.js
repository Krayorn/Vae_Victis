$(function () {
    
    $('.form-container').foxholder({
        demo: 2 //or other number of demo (1-15) you want to use
    });

    var registerForm = $('#registerForm');
    function emailValidation(email) {
        var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
    }
    function usernameValidation(username) {
        var usernameRegExp = /^[a-zA-Z0-9éèà._-]+$/;
        return usernameRegExp.test(username);
    }


    $('.arrow').click(function(){
        $('.arrow').toggleClass('none');
        $('#active').siblings().toggle("fast");
    });


    var result = $('#result');
    var button = $('.registerResult');
    var errorUsername = $('#errorUsername');
    var errorFaction = $('#errorFaction');
    var errorEmail = $('#errorEmail');
    var errorPassword = $('#errorPassword');
    var errorConfirm = $('#errorConfirm');

    var vikingCheck = $('#viking_check');
    var samuraiCheck = $('#samurai_check');
    var knightCheck = $('#knight_check');
    var neutralCheck = $('#neutral_check');

    var imgViking = $('#img_viking');
    var imgSamurai = $('#img_samurai');
    var imgKnight = $('#img_knight');
    var imgNeutral= $('#img_neutral');

    imgKnight.click(function(){
        imgKnight.addClass('border');
        imgSamurai.removeClass('border');
        imgViking.removeClass('border');
        imgNeutral.removeClass('border');
    });

    imgViking.click(function(){
        imgKnight.removeClass('border');
        imgSamurai.removeClass('border');
        imgViking.addClass('border');
        imgNeutral.removeClass('border');
    });

    imgSamurai.click(function(){
        imgKnight.removeClass('border');
        imgSamurai.addClass('border');
        imgViking.removeClass('border');
        imgNeutral.removeClass('border');
    });

    imgNeutral.click(function(){
        imgKnight.removeClass('border');
        imgSamurai.removeClass('border');
        imgViking.removeClass('border');
        imgNeutral.addClass('border');
    });

    $('#email').keyup(function () {
        if (emailValidation(this.value) === false) {
            $(this).css({
                color: 'red'
            });
        } else {
            $(this).css({
                color: 'green'
            });
        }
    });

  /*  registerForm.submit(function () {
        console.log($this);  
        var formValid = true;
        var faction = $('input:checked[name=faction]');
        var chosenFaction = [];

        if (faction.is(':checked')) {
            faction.each(function () {
                chosenFaction.push($(this).val());

            });
        }  else {
            formValid = false;
            errorFaction.data('Veuillez cocher au moins une faction');
        }

          errorUsername.data('');
        errorFaction.data('');
        errorPassword.data('');
        errorConfirm.data('');

        vikingCheck.data('');
        samuraiCheck.data('');
        knightCheck.data('');
        neutralCheck.data('');

        var form = {
            username:   $('#username').val(),
            email: $('#email').val(),
            faction: faction.val(),
            password: $('#password').val(),
            confirm: $('#confirm_password').val()

        };



        if (!usernameValidation(form.username)|| form.username.length < 4 || form.username.length > 10 ) {
            formValid = false;
            errorUsername.data('Veuillez saisir un pseudo valide');

        }
        if (form.password.length < 4) {
            formValid = false;
            errorPassword.data('Veuillez saisir un mot de passe avec au moins 6 carractères');
        }

        if (form.confirm != form.password) { // si la confirmation est différente du mot de passe

            formValid = false;
            errorConfirm.data('Veuillez saisir le même mot de passe');
        }
        if (!emailValidation(form.email)){
            formValid = false;
            errorEmail.data('Veuillez saisir un email conforme');
        }

        if (formValid) {
            var url = "?action=register"; // the script where you handle the form input.
       
            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(),
                success: function(data)
                {
                    console.log(data);
                }
            });
            return false;
        });*/

    $('#registerForm').on('submit', function(e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire
 
        var $this = $(this); // L'objet jQuery du formulaire
 
        // Je vérifie une première fois pour ne pas lancer la requête HTTP
        // si je sais que mon PHP renverra une erreur
        if($('#username').val() == '' || $('#email').val() == '' || $('#password').val() == '' || $('#confirm_password').val() == '') {
            errorUsername.text('Tous les champs ne sont pas remplis');
        } else {
            // Envoi de la requête HTTP en mode asynchrone
            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: $this.serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
                dataType: 'json', // JSON,
                success: function(data) { // Je récupère la réponse du fichier PHP
                    if(data.reponse === 'ok') {
                       console.log('Tout est bon');
                    } else {
                      errorUsername.text(data.errors['username']);
                      errorEmail.text(data.errors['email']);
                      errorPassword.text(data.errors['password']);
                      errorConfirm.text(data.errors['confirm']);
                      errorFaction.text(data.errors['faction']);
                    }
                }
            });
        }
    });

    });