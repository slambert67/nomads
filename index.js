$(document).ready(function () {

    var theTemplate;
    $("#ladderBtn").bind( "click",
                          function (event) {
                            console.log("hello");
                            $("#main").load("http://192.168.0.19:8080/ladder.html", function(){
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
                   function( event ) {
                       var filename = "http://192.168.0.19:8080/" + event.target.id + ".html";
                       $("#ladderMain").load(filename, function() {
                           db.init();
                           var members = db.getMembers();
                           $.each( members, function() {

                               /*fdb.collection("members").add(this)
                               .then (function (docref) {alert ("success")})
                               .catch (function(error) {alert("error")});*/
                               $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 1, name: this.id.forename, rating: this.ladder.med.currentRating }}) );                              
                           });
                       });
    
                   })
    
    });
	  


