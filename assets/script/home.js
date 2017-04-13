$(function () {

    var articlesForm = $('#articlesForm');

    console.log(articlesForm);
    articlesForm.submit(function(){
        var formValid =true;
        var choosenTags = [];
        var $title = $('#title').val();
        var $description = $('#description').val();
        var $content = $('#content').val();
        var $tagFaction = $('#tagFaction').val();
        var $tagTypes = $('#tagTypes').val();

        choosenTags.push($tagFaction,$tagTypes);
        console.log(choosenTags);

            var url = '?action=home';
            $.ajax({
                type: "POST",
                url: url,
                data: {
                    date : '2002-09-24' ,
                    title:$title,
                   description:$description,
                    content:$content,
                    nbr_commentary: 0 ,
                    update_date: '2002-09-24',
                    tags:choosenTags
                },
                success: function(response)
                {
                    console.log(response);

                },
                error: function(response){
                    console.log('error');
                }
            });

        return false;
    });

});