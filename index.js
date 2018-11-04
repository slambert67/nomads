var globalMembers = new Array();

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

                           db.getMembers()
                           .then ( function(myData) {
                               console.log("got my data");
                               myData.forEach ( function(x) {                                 
                                   var theData = x.data();
                                   console.log("breakpoint");
                                   $("#" + event.target.id + "Ladder").
                                   append(theTemplate({ "theContext": { pos: theData.id.memberNumber, 
                                                                        name: theData.id.forename, 
                                                                        rating: theData.ladder.med.currentRating } }));
                               });
                           });
                       });
    
                   })
    
    });
	  


