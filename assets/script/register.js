$(function () {

     var registerForm = $('#registerForm');
    function emailValidation(email) {
        var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
    }
    function usernameValidation(username) {
        var usernameRegExp = /^[a-zA-Z0-9éèà._-]+$/;
        return usernameRegExp.test(username);
    }

    var result = $('#result');
    var button = $('.none');
    button.css('display','none');
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
                borderColor: 'red',
                color: 'red'
            });
        } else {
            $(this).css({
                borderColor: 'green',
                color: 'green'
            });
        }
    });
    registerForm.submit(function () {
        var formValid = true;
        var faction = $('input:checked[name=faction]');
        var chosenFaction = [];

        if (faction.is(':checked')) {
            faction.each(function () {
                chosenFaction.push($(this).val());

            });
        }  else {
            formValid = false;
            errorFaction.html('Veuillez cocher au moins une faction');
        }

        errorUsername.html('');
        errorFaction.html('');
        errorPassword.html('');
        errorConfirm.html('');

        vikingCheck.html('');
        samuraiCheck.html('');
        knightCheck.html('');
        neutralCheck.html('');

        var form = {
            username:   $('#username').val(),
            email: $('#email').val(),
            faction: faction.val(),
            password: $('#password').val(),
            confirm: $('#confirm_password').val()

        };

        $('#img_knight').click(function(){

        });

        if (!usernameValidation(form.username)|| form.username.length < 4 || form.username.length > 10 ) {
            formValid = false;
            errorUsername.html('Veuillez saisir un pseudo valide');

        }
        if (form.password.length < 4) {
            formValid = false;
            errorPassword.html('Veuillez saisir un mot de passe avec au moins 6 carractères');
        }

        if (form.confirm != form.password) { // si la confirmation est différente du mot de passe

            formValid = false;
            errorConfirm.html('Veuillez saisir le même mot de passe');
        }
        if (!emailValidation(form.email)){
            formValid = false;
            errorEmail.html('Veuillez saisir un email conforme');
        }

        if (formValid) {
            registerForm.slideToggle("slow", function () {
                button.css('display','block');
                result.css('display','block');

                result.html('<br>'+'Vos informations : <br>' + 'Pseudo  :' + form.username + '<br>' + 'Email :' +
                    form.email + '<br>' + 'Faction : ' + form.faction+ '<br>' +  'Mot de passe : ' + form.password);
                $('#yes').click(function () {


                    var url = "?action=register"; // the script where you handle the form input.

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: registerForm.serialize(), // serializes the form's elements.
                        success: function(data)
                        {
                            window.location.href= '?action=home';
                        }
                    });





                });
                $('#no').click(function () {
                    registerForm.slideDown();

                    console.log('banane');
                    button.css('display','none');
                    result.css('display','none');


                });
            });




        }
        return false;
    });

});