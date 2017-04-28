$(function () {

    var articlesForm = $('#articlesForm');
    var errorFields = $('#errorFields');
    var errorTitle = $('#errorTitle');
    var errorDescription= $('#errorDescription');
    var errorContent = $('#errorContent');
    var errorArticle = $('#errorArticle');  

    function switch_tab($tabs, $content){
        $('.content').css('display', 'none');
        $content.css('display', 'block');
        $('.tabs').removeClass('active');
        $tabs.addClass('active');
    }

    $('#profile_user_info').click(function(){
        switch_tab($('#profile_user_info'), $('#user_info'))
    });

    $('#profile_user_article').click(function(){
        switch_tab($('#profile_user_article'), $('#user_article'))
    });

    $('#profile_new_article').click(function(){
        switch_tab($('#profile_new_article'), $('#new_article'))
    });

function CKupdateCommentary(){
     for ( instance in CKEDITOR.instances ) CKEDITOR.instances['article_content'].updateElement(); 
    }

    articlesForm.submit(function(){
        CKupdateCommentary()
        var formValid =true;
        var $this = $(this);
        var $title = $('#title').val();
        var $titleInput = $('#title');
        var $description = $('#description').val();
        var $descriptionInput = $('#description');
        var $contentInput = $('#contentInput');
        var $content = CKEDITOR.instances['article_content'].getData();


        var formData = new FormData(this);


        // if( $title == '' || $description == '' || $content == ''){
        //     formValid =  false;
        //     errorFields.html('Fields missing');
        //
        // }

        if(formValid){
         $.ajax({
            url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
            type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
            contentType: false, // obligatoire pour de l'upload
            processData: false, // obligatoire pour de l'upload
            data: formData,
            dataType: 'json', // JSON,

         success: function(data)
         {
             console.log(data);

            if(data.success === false) {
                errorArticle.html(data.errors['article']);
                 errorFields.html(data.errors['title']);
            }
             if(data.success === true){
                $titleInput.val('');
                $descriptionInput.val('');
              //  window.location.href="?action=home";
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
