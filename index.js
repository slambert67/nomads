var globalMembers = new Array();

$(document).ready(function () {

    var theTemplate;
    $("#ladderBtn").bind( "click",
                          function (event) {
                            console.log("hello");
                            $("#main").load("http://192.168.0.14:8080/ladder.html", function(){
                              var theTemplateScript = $("#name-template").html();
                              theTemplate = Handlebars.compile(theTemplateScript);
                            });
                          });

    $("#newMember").bind("click",
        function (event) {
            $("#main").load("http://192.168.0.14:8080/newMember.html", function () {
                null;
            });
    });

    db.init();

    $("form").submit(function (event) {
        alert("hello world");
        event.preventDefault();
    });
    $("#main").on( "click",
                   function( event ) {

                      switch(event.target.id) {
                          case "addMemberBtn":
                                console.log("add member button");
                                //db.init();
                                db.addMember();
                                break;  
                          default:
                              var filename = "http://192.168.0.14:8080/" + event.target.id + ".html";
                              $("#ladderMain").load(filename, function () {
                                  //db.init();

                                  db.getMembers()
                                      .then(function (myData) {
                                          console.log("got my data",myData);
                                          myData.forEach(function (x) {
                                              var theData = x.data();
                                              console.log("breakpoint");
                                              $("#" + event.target.id + "Ladder").
                                                  append(theTemplate({
                                                      "theContext": {
                                                          fullname: theData.id.forename + " " + theData.id.surname,
                                                          rating: theData.ladder.med.currentRating
                                                      }
                                                  }));
                                          });
                                      });
                                  db.getMembers()
                                      .then(function (myData) {
                                          console.log("got my data", myData);
                                          myData.forEach(function (x) {
                                              var theData = x.data();
                                              console.log("breakpoint");
                                              $("#" + event.target.id + "Ladder").
                                                  append(theTemplate({
                                                      "theContext": {
                                                          fullname: theData.id.forename + " " + theData.id.surname,
                                                          rating: theData.ladder.med.currentRating
                                                      }
                                                  }));
                                          });
                                      });
                                  db.getMembers()
                                      .then(function (myData) {
                                          console.log("got my data", myData);
                                          myData.forEach(function (x) {
                                              var theData = x.data();
                                              console.log("breakpoint");
                                              $("#" + event.target.id + "Ladder").
                                                  append(theTemplate({
                                                      "theContext": {
                                                          fullname: theData.id.forename + " " + theData.id.surname,
                                                          rating: theData.ladder.med.currentRating
                                                      }
                                                  }));
                                          });
                                      });
                                  db.getMembers()
                                      .then(function (myData) {
                                          console.log("got my data", myData);
                                          myData.forEach(function (x) {
                                              var theData = x.data();
                                              console.log("breakpoint");
                                              $("#" + event.target.id + "Ladder").
                                                  append(theTemplate({
                                                      "theContext": {
                                                          fullname: theData.id.forename + " " + theData.id.surname,
                                                          rating: theData.ladder.med.currentRating
                                                      }
                                                  }));
                                          });
                                      });
                              });
                      }   
                   })  
    });
	  


