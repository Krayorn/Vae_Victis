$(function () {

    var articlesForm = $('#articlesForm');
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
     for ( instance in CKEDITOR.instances ) CKEDITOR.instances['articleContent'].updateElement();
    }

    articlesForm.submit(function(){
        CKupdateCommentary();
        var formValid =true;
        var $this = $(this);

        var titleInput = $('#title');
        var $title = titleInput.val();

        var descriptionInput = $('#description');
        var $description = descriptionInput.val();
        var $content = CKEDITOR.instances['articleContent'].getData();

            if($title =='' || !$description || $content == '' ){
                errorArticle.html('Champs non rempli');
                formValid = false;
            }
            if($title.length <4){
                errorArticle.html('Titre trop court');
                formValid = false;
            }
        if($content.length <12){
            errorArticle.html('Contenu trop court');
            formValid = false;
        }
        var formData = new FormData(this);

        if(formValid){
         $.ajax({
            url: $this.attr('action'),
            type: $this.attr('method'),
            contentType: false,
            processData: false,
            data: formData,
            dataType: 'json', // JSON,

         success: function(data)
         {
            if(!data.success) {
                errorArticle.html(data.errors['article']);
                errorArticle.html(data.errors['title']);
                errorArticle.html(data.errors['file']);
            }
             if(data.success){
                titleInput.val('');
                CKEDITOR.instances['articleContent'].setData('');
                window.location.href="?action=home";
            }
         }
         });
         }


        return false;
    });

});/**
 * Created by Dam's on 23/04/2017.
 */
