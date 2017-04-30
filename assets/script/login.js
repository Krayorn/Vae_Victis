$(function () {
    var loginForm = $('#loginForm');
    var errorUsername = $('#errorUsername');
    var errorPassword = $('#errorPassword');

    loginForm.submit(function (e) {
        e.preventDefault();
    var formValid = true;
    var $username = $('#username').val();

    var $this = $(this);
    errorUsername.html('');
    errorPassword.html('');


    if( $username == '' || $('#password').val() == '') {
        formValid = false;
            errorUsername.html('Tous les champs ne sont pas remplis');
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
