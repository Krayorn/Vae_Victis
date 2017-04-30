$(function () {
    function CKupdateArticleEdition() {
        for (instance in CKEDITOR.instances)
            CKEDITOR.instances['articleContentEdition'].updateElement();
    }

    function CKupdateCommentary() {
        for (instance in CKEDITOR.instances)
            CKEDITOR.instances['contentCommentary'].updateElement();
    }

    var commentaryEdition = $('.commentaryEdition');
    var $this = $(this);
///////////////////////////////////
    // Get the modal
    var modal = $('#myModal');


// Get the <span> element that closes the modal
    var span = $(".close")[0];
    var commentaryContent = $('.commentary_content');
// When the user clicks on the button, open the modal
    var idHidden = $('#idHidden');
    commentaryEdition.click(function () {
        var contentCommentary = $(this).parent().parent().children('.commentary_content').html();
        var idCommentary = $(this).parent().parent().children('.idCommentary').html();
        var commentaryToEdit = $(this).parent().parent().children('.idCommentary');
        idHidden.val(idCommentary);
        modal.css('display', 'block');
        CKEDITOR.instances['contentCommentaryEdition'].setData(contentCommentary);
    });

    var commentaryFormEdition = $('#commentaryFormEdition');

    commentaryFormEdition.submit(function () {
        $this = $(this);
        var commentary =  commentaryEdition.parent().parent().children('.commentary_content').html();

        var idCommentary = idHidden.val();
        var commentaryData = CKEDITOR.instances['contentCommentaryEdition'].getData();
        console.log(commentaryData);
        $.ajax({
            url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
            type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
            data: {id: idCommentary, commentaryEditing: commentaryData},
            dataType: 'json', // JSON,
            success: function (data) {

                if (data.success === true) {
                    modal.css('display','none');
                    commentary.html(commentaryData);
                }
            }
        });
        return false;
    });

// When the user clicks on <span> (x), close the modal
    if (span) {
        span.onclick = function () {
            modal.css('display', 'none');
        };
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.css('display', 'none');
        }
    };


    var articlesFormEdition = $('#articlesFormEdition');
    var commentaryForm = $('#commentaryForm');
    var errorCommentary = $('#errorCommentary');
    var editArticle = $('#editArticle');
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
    editArticle.click('slideToggle',function(){
        fullContentCommentary.css('display','none');
        formEdition.css('display','block');
        titleEdition.val(titleContent.html());
        descriptionEdition.val(descriptionContent.html());
        CKEDITOR.instances['articleContentEdition'].setData(articleContent.html());
    });

    articlesFormEdition.submit(function () {
        CKupdateArticleEdition();
        var formValid = true;
        var $this = $(this);
        var $titleEdition = $('#articleTitleEdition').val();
        var $articleContentEdition = CKEDITOR.instances['articleContentEdition'].getData();

        if (formValid) {

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {
                    titleEditing: $titleEdition,
                    contentEditing: $articleContentEdition
                },
                dataType: 'json', // JSON,

                success: function (data) {

                    if (data.success === true) {
                        titleContent.html($titleEdition);
                        articleContent.html($articleContentEdition);
                        formEdition.css('display','none');
                        fullContentCommentary.css('display','block');

                    } else {
                        resultEdition.html(data.errors['field']);
                        resultEdition.html(data.errors['content']);
                    }

                }
            });
        }


        return false;
    });


    commentaryForm.submit(function () {
        CKupdateCommentary();
        var formValid = true;
        var $this = $(this);
       var resultCommentary = $('#resultCommentary');
        var $content = CKEDITOR.instances['contentCommentary'].getData();
        if (formValid) {

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {content: $content},
                dataType: 'json', // JSON,

                success: function (data) {

                    if (data.success) {
                        resultCommentary.html('Commentaire posté');
                        $('#commentary').append('<div class="commentary"><div class="commentary_user_info">Votre Dernier Commentaire !</div>'+
                        '<div class="commentary_content">' + $content +'</div></div>');
                        CKEDITOR.instances['contentCommentary'].setData('');
                    }
                    if (!data.success) {
                        resultCommentary.html(data.errors['field'])
                    }

                }
            });
        }


        return false;
    });

    var formDeleteCommentary = $('.formDeleteCommentary');
    var commentaryDelete = $('.commentaryDelete');
    var idCommentaryToDelete = $('#idCommentaryToDelete');
    var commentaryToHide ;
    commentaryDelete.click(function(){
        var idCommentary = $(this).parent().parent().children('.idCommentary').html();
        var commentaryDeleteToHide = $(this).parent().children('.commentaryDelete');
        var label = $(this).parent().parent().children().children('.formDeleteCommentary');
         commentaryToHide = $(this).parent().parent();

        console.log(label);
        idCommentaryToDelete.val(idCommentary);
        label.css('display', 'block');
        commentaryDeleteToHide.css('display', 'none');
    });

    formDeleteCommentary.submit(function () {
        var $this = $(this);
        console.log(commentaryToHide);
        var $idCommentary = idCommentaryToDelete.val();
        var formValid = true;
       if (formValid) {
            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {idCommentaryToDelete:$idCommentary },
                dataType: 'json', // JSON,
                success: function (data) {
                    if (data.success === true) {
                        commentaryToHide.css('display','none');
                    }
                }
            });
        }
        return false;
    });

    var formDeleteArticle = $('#formDeleteArticle');

    formDeleteArticle.submit(function () {


        var formValid = true;
        var $this = $(this);
        if (formValid) {

            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post),
                data:{articleDelete: 't'},
                dataType: 'json', // JSON,

                success: function (data) {
                    if (data.success === true) {
                    }
                }
            });
        }


        return false;
    });

});