$(function () {

    var articlesForm = $('#articlesForm');
    var errorFields = $('#errorFields');
    var errorTitle = $('#errorTitle');
    var errorDescription= $('#errorDescription');
    var errorContent = $('#errorContent');

    console.log(articlesForm);
    articlesForm.submit(function(){
        var formValid =true;
        var $this = $(this);
        var choosenTags = [];
        var $title = $('#title').val();
        var $description = $('#description').val();
        var $content = $('#content').val();
        var $tagFaction = $('#tagFaction').val();
        var $tagTypes = $('#tagTypes').val();

        choosenTags.push($tagFaction,$tagTypes);
        console.log(choosenTags);
            if( $title == '' || $description == '' || $content == ''){
                formValid =  false;
                errorFields.html('Fields missing');

            }
console.log(formValid);
            if(formValid){
                $.ajax({
                    url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                    type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                    dataType: 'json', // JSON,
                    data: {

                        title:$title,
                        description:$description,
                        content:$content,
                        tags:choosenTags
                    },
                    success: function(response)
                    {
                        console.log(data.errors['field']);
                        console.log(data.errors['username']);

                    },
                    error: function(response){
                        console.log('error');
                    }
                });
            }


        return false;
    });

});