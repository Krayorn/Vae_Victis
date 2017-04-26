$(function () {
    function CKupdateArticleEdition(){
        for ( instance in CKEDITOR.instances )
            CKEDITOR.instances['articleContentEdition'].updateElement();
    }function CKupdateCommentary(){
        for ( instance in CKEDITOR.instances )
            CKEDITOR.instances['contentCommentary'].updateElement();
    }

    var articlesFormEdition = $('#articlesFormEdition');
    var commentaryForm = $('#commentaryForm');
    var errorCommentary = $('#errorCommentary');
    var imgEditionArticle= $('#imgEditionArticle');
    var fullContentCommentary = $('#fullContentCommentary');
    var formEdition = $('#formEdition');
    var resultEdition = $('#resultEdition');
    var titleContent = $('#titleContent');
    var descriptionContent = $('#descriptionContent');
    var articleContent = $('#articleContent');
    var articleContentEdition = $('#articleContentEdition');
    var titleEdition = $('#titleEdition');
    var descriptionEdition = $('#descriptionEdition');

    formEdition.css('display','none');
    imgEditionArticle.click(function(){
        fullContentCommentary.css('display','none');
        formEdition.css('display','block');
        titleEdition.val(titleContent.html());
        descriptionEdition.val(descriptionContent.html());
        CKEDITOR.instances['articleContentEdition'].setData(articleContent.html());
    });

    articlesFormEdition.submit(function(){
        CKupdateArticleEdition();
        var formValid = true;
        var  $this = $(this);
        var $titleEdition = $('#titleEdition').val();
        var $descriptionEdition = $('#descriptionEdition').val();

        var $articleContentEdition = CKEDITOR.instances['articleContentEdition'].getData();

        console.log($articleContentEdition);
        console.log($titleEdition);
        if(formValid){

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {titleEditing :$titleEdition,descriptionEditing:$descriptionEdition,contentEditing : $articleContentEdition},
                dataType: 'json', // JSON,

                success: function(data)
                {
                    console.log('yo');

                    if(data.success === true){
                        resultEdition.html('L\'article à bien été modifié');
                        // titleContent.html($titleEdition);
                        // descriptionContent.html($descriptionEdition);
                        // articleContent.html($articleContentEdition);


                    }else{
                        resultEdition.html(data.errors['field']);
                        resultEdition.html(data.errors['content']);
                    }

                },
                error: function(response,statut,error){
                    console.log(response,statut,error);
                }
            });
        }


        return false;
    });


    commentaryForm.submit(function(){
        CKupdateCommentary();
        var formValid = true;
       var  $this = $(this);
       var divCommentary = $('#commentary');
       // var $contentCommentary = $('#contentCommentary').val();
       // var $contentCommentaryInput = $('#contentCommentary');
    /*    if($contentCommentary === ''){
            formValid = '';
            errorCommentary.html('Field missing');
        }*/
    var $content = CKEDITOR.instances['contentCommentary'].getData();
    console.log($content);
        if(formValid){

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {content : $content},
                dataType: 'json', // JSON,

                success: function(data)
                {
                    console.log('yo');

                     if(data.success === true){
                         console.log('c ok');


                        divCommentary.append($content);
                        divCommentary.classList.add('commentary_content');


                     }
                }
            });
        }


        return false;
    });


});