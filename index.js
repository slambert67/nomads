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
                            $("#" + event.target.id).addClass("btnpressed");
                              fdb.collection("users").add({
                                  first: "Ada",
                                  last: "Lovelace",
                                  born: 1815
                              })
                                  .then(function (docRef) {
                                      console.log("Document written with ID: ", docRef.id);
                                      fdb.collection("users").get().then((querySnapshot) => {
                                          querySnapshot.forEach((doc) => {
                                              console.log(`${doc.id} => ${doc.data()}`);
                                          });
                                      });
                                  })
                                  .catch(function (error) {
                                      console.error("Error adding document: ", error);
                                  });
                              //firebase.database().ref('members/' + 1).set({ "firstname": "occulus", "bocculus": "lambert" })
                              //var members = db.getMembers();
 //firebase.database().ref('members').push().set(members)
                              //firebase.database().ref('members/' + '777').set(members[0])                       
                                 // .then(function (snapshot) {
                                     // console.log("success");
                                     // success(); // some success method
                                  //}, function (error) {
                                    //  console.log('error' + error);
                                      //error(); // some error method
                                  //});
                             // firebase.database().ref('members/' + '888').set(members[1])
                                  //.then(function (snapshot) {
                                  //    console.log("success");
                                      // success(); // some success method
                                //  }, function (error) {
                                     // console.log('error' + error);
                                      //error(); // some error method
                                  });                           



                            /*var filename = "http://192.168.0.19:8080/" + event.target.id + ".html";
                            $("#ladderMain").load(filename, function() {
                                var members = db.getMembers();
                                $.each(members, function() {
                                    console.log(this.id.forename);
                                });
                                $("#" + event.target.id + "Ladder").append(theTemplate({ "theContext": { pos: 1, name: "Steve Lambert", rating: 1400 }}) );

                            });*/

                            
                          });
	  


