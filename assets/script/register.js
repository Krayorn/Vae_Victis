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



    registerForm.submit(function (e) {
    e.preventDefault();
        errorUsername.html('');
        errorEmail.html('');
        errorPassword.html('');
        errorConfirm.html('');
        errorFaction.html('');
        var $this = $(this);
 

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
        if(!faction){
            formValid = false;
            errorFaction.html('Veuillez saisir une faction conforme');
        }

        if (formValid) {

            $.ajax({
                url: $this.attr('action'),
                type: $this.attr('method'),
                data: $this.serialize(),
                dataType: 'json',
                success: function(data) {
                    if(data.success === false) {
                        errorUsername.html(data.errors['username']);
                        errorEmail.html(data.errors['email']);
                        errorPassword.html(data.errors['password']);
                        errorConfirm.html(data.errors['confirm']);
                        errorFaction.html(data.errors['faction']);
                    }
                    else{
                        document.location.href="?action=login";
                    }
                }
            });
        }
    });

    });