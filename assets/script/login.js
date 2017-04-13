$(function () {
    var loginForm = $('#loginForm');
    var errorUsername = $('#errorUsername');


    function usernameValidation(username) {
        var usernameRegExp = /^[a-zA-Z0-9éèà._-]+$/;
        return usernameRegExp.test(username);
    }

    loginForm.submit(function () {
        errorUsername.html('');
        var formValid = true;
        var $username = $('#username').val();
        if(!usernameValidation($username) ||$username.length < 4 || $username.length > 10    ){
            formValid= false;
            errorUsername.html('Veuillez rentrer un pseudo valide');
        }
        if(formValid){
            var url = '?action=login';
            $.ajax({
                type: "POST",
                url: url,
                data: loginForm.serialize(), // serializes the form's elements.
                success: function(data)
                {
                    window.location.href= '?action=home';
                }
            });
        }
    return false
    });


});
