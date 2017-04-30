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

    var modal = $('#myModal');
    var span = $(".close")[0];
    var contentCommentaryEdit;

    var idHidden = $('#idHidden');
    commentaryEdition.click(function () {
        var contentCommentary = $(this).parent().parent().children('.commentary_content').html();
         contentCommentaryEdit = $(this).parent().parent().children('.commentary_content');
        var idCommentary = $(this).parent().parent().children('.idCommentary').html();
        idHidden.val(idCommentary);
        modal.css('display', 'block');
        CKEDITOR.instances['contentCommentaryEdition'].setData(contentCommentary);
    });

    var commentaryFormEdition = $('#commentaryFormEdition');
    var errorCommentaryEdition = $('.errorCommentaryEdition');
    commentaryFormEdition.submit(function () {
        $this = $(this);
        var formValid = true;
        var idCommentary = idHidden.val();
        var commentaryData = CKEDITOR.instances['contentCommentaryEdition'].getData();
        if(idCommentary == '' || commentaryData == '' ){
            formValid = false;
            errorCommentaryEdition.html('Champs non remplis');
        }
        if(formValid){
        $.ajax({
            url: $this.attr('action'),
            type: $this.attr('method'),
            data: {id: idCommentary, commentaryEditing: commentaryData},
            dataType: 'json', // JSON,
            success: function (data) {
                if (data.success) {
                    modal.css('display','none');
                    contentCommentaryEdit.html(commentaryData);
                }
                if(!data.success){
                    errorCommentaryEdition.html(data.errors['field'])
                    errorCommentaryEdition.html(data.errors['length'])
                }
            }
        });
        }
        return false;
    });

// When the user clicks on <span> (x), close the modal
    if (span) {
        span.onclick = function () {
            modal.css('display', 'none');
        };
    }
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
    var articleContent = $('.articleContent');
    var articleContentEdition = $('#articleContentEdition');
    var titleEdition = $('#articleTitleEdition');
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
        var titleEdition = $('#articleTitleEdition').val();
        var articleContentEdition = CKEDITOR.instances['articleContentEdition'].getData();
        if(titleEdition == '' || articleContentEdition == ''){
            resultEdition.html('Champs manquants');
            formValid = false;
        }
        if(titleEdition.length <4){
            resultEdition.html('Titre trop court');
            formValid = false;
        }
        if(articleContentEdition.length <4){
            resultEdition.html(' Contenu trop court');
            formValid = false;
        }
        if (formValid) {
            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {
                    titleEditing: titleEdition,
                    contentEditing: articleContentEdition
                },
                dataType: 'json', // JSON,
                success: function (data) {
                    if (data.success) {
                        titleContent.html(titleEdition);
                        articleContent.html(articleContentEdition);
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
        if($content == ''){
            resultCommentary.html('Contenu manquant');
            formValid = false;
        }
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
        idCommentaryToDelete.val(idCommentary);
        label.css('display', 'block');
        commentaryDeleteToHide.css('display', 'none');
    });
var errorDeleteCommentary = $('.errorDeleteCommentary');
    formDeleteCommentary.submit(function () {
        var $this = $(this);
        var $idCommentary = idCommentaryToDelete.val();
        var formValid = true;
        if($idCommentary == ''){
            errorDeleteCommentary.html('Une erreur c\'est produite');
            formValid  = false;
        }
       if (formValid) {
            $.ajax({
                url: $this.attr('action'), // Le nom du fichier indiqué dans le formulaire
                type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                data: {idCommentaryToDelete:$idCommentary },
                dataType: 'json', // JSON,
                success: function (data) {
                    if (data.success) {
                        commentaryToHide.css('display','none');
                    }
                    if(!data.success){
                        errorDeleteCommentary.html(data.error['field']);
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
                        window.location = "?action=home";
                    }
                }
            });
        }


        return false;
    });

});