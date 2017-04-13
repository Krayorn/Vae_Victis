$(function () {

    var articlesForm = $('#articlesForm');

    console.log(articlesForm);
    articlesForm.submit(function(){
        var choosenTags = [];
        var $title = $('#title').val();
        var $description = $('#description').val();
        var $content = $('#content').val();
        var $tagFaction = $('#tagFaction').val();
        var $tagTypes = $('#tagTypes').val();
        console.log($tagFaction);
        console.log($tagTypes);
        console.log($title);
        console.log($description);
        console.log($content);
        return false;
    });

});