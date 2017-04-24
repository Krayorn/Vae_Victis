$(function () {

    var articlesForm = $('#articlesForm');
    var errorFields = $('#errorFields');
    var errorTitle = $('#errorTitle');
    var errorDescription= $('#errorDescription');
    var errorContent = $('#errorContent');

    var errorArticle = $('#errorArticle')

    console.log(articlesForm);

    

    articlesForm.submit(function(){
        var formValid =true;
        var $this = $(this);
        var $title = $('#title').val();
        var $titleInput = $('#title');
        console.log($title);
        var $description = $('#description').val();
        var $descriptionInput = $('#description');
        console.log($description);
        var $content = $('#content').val();
        var $contentInput = $('#content');
        console.log($content);



        if( $title == '' || $description == '' || $content == ''){
            formValid =  false;
            errorFields.html('Fields missing');

        }
        console.log(formValid);
        if(formValid){
         $.ajax({
         url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
         type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
         data: $this.serialize(),
         dataType: 'json', // JSON,

         success: function(data)
         {
             if(data.success === false) {
                 errorArticle.html(data.errors['fields']);
                 console.log('ok');
             }
             if(data.success === true){
             $titleInput.val('');
             $descriptionInput.val('');
             $contentInput.val('');
             }
         },
         error: function(response,statut,error){
             console.log(response,statut,error);
         }
         });
         }


        return false;
    });

});/**
 * Created by Dam's on 23/04/2017.
 */
