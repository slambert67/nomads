jQuery(document).ready(function ($) {

/*$(".nbcNav").on("click", function(evt) {
    console.log("home nav clicked");
    console.log(evt.currentTarget);
    $(evt.currentTarget).addClass("active");
});*/

    db.init();
    console.log("db initialised");


    db.readGlobals()
    .then(
        function() {
            var globs = db.getGlobals();
            globs.forEach(function (doc) {
                $("#impnotice").html(doc.data().important_notice);
            });
        }
    );
});