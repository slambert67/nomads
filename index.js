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
                          function (event) {
                            var filename = "http://192.168.0.19:8080/" + event.target.id + ".html";
                            $("#ladderMain").load(filename, function() {
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 1, name: "Steve Lambert", rating: 1400 }}) );
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 2, name: "Wayne Cunningham", rating: 1300 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 3, name: "Andrew lark", rating: 1200 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 1, name: "Steve Lambert", rating: 1400 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 2, name: "Wayne Cunningham", rating: 1300 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 3, name: "Andrew lark", rating: 1200 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 1, name: "Steve Lambert", rating: 1400 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 2, name: "Wayne Cunningham", rating: 1300 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 3, name: "Andrew lark", rating: 1200 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 2, name: "Wayne Cunningham", rating: 1300 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 3, name: "Andrew lark", rating: 1200 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 1, name: "Steve Lambert", rating: 1400 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 2, name: "Wayne Cunningham", rating: 1300 } }));
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 3, name: "Andrew lark", rating: 1200 } }));
                            });
                            
                          });
	  


});