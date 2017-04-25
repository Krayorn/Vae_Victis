$(function () {

    var commentaryForm = $('#commentaryForm');
    var errorCommentary = $('#errorCommentary');
    commentaryForm.submit(function(){
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
                        $newCommentary = '<div class="commentary"><div class="commentary_info_user">My New Commentary !</div><div class="commentary_content">' + $content +'</div></div>';
                        divCommentary.append($newCommentary);
                        divCommentary.addClass('commentary_content');
                     }
                }
            });
        }


        return false;
    });


});