$(document).ready(function () {

    var theTemplate;
    $("#ladderBtn").bind( "click",
                          function (event) {
                            console.log("hello");
                            $("#main").load("http://192.168.56.1:8080/ladder.html", function(){
                              var theTemplateScript = $("#name-template").html();
                              theTemplate = Handlebars.compile(theTemplateScript);
                            });
                          });

    /*$("#ladderNav").on( "click",
                          function (event) {
                            //$("#main").load("http://192.168.56.1:8080/ladder.html");
                            console.log("hello");
                            console.log(evt.target);
                          });

    $("#med").on( "click",
                          function (event) {
                            //$("#main").load("http://192.168.56.1:8080/ladder.html");
                            console.log("hello");
                            console.log(evt.target);
                          });*/

    $("#main").on( "click",
                          function (event) {
                            var filename = "http://192.168.56.1:8080/" + event.target.id + ".html";
                            console.log("file = ", event.target.id);
                            $("#ladderMain").load(filename, function() {
                              $("#" + event.target.id + "Ladder").append( theTemplate({"theText":event.target.id}) );
                            });
                          });
	  


});