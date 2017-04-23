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
        console.log($title);

        var $description = $('#description').val();
        console.log($description);
        var $content = $('#content').val();
        console.log($content);
        var $tagFaction = $('#tagFaction').val();
        var $tagTypes = $('#tagTypes').val();

        choosenTags.push($tagFaction,$tagTypes);
        console.log(choosenTags);
        if( $title == '' || $description == '' || $content == ''){
            formValid =  false;
            errorFields.html('Fields missing');

        }
        console.log(formValid);
      /*  if(formValid){
         $.ajax({
         url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
         type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
         data: $this.serialize(),
         dataType: 'json', // JSON,

         success: function(response,statut,error)
         {
         console.log(data.errors['field']);
         console.log(data.errors['username']);

         },
         error: function(response,statut,error){
         console.log(response,statut,error);
         }
         });
         }*/


        return formValid;
    });

});/**
 * Created by Dam's on 23/04/2017.
 */
