var db = (function() {

    var fdb;
    var members;

    function init() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo',
            authDomain: 'nomads-d85b5.firebaseapp.com',
            projectId: 'nomads-d85b5'
        });

        fdb = firebase.firestore();

        fdb.settings({
            timestampsInSnapshots: true
        });  
        
        fdb.collection("members").get()
            .then( function(myData) {
                members = myData;
                console.log("retrieved members");
                var i =0;
                myData.forEach( function(doc) {
                    var theData = doc.data();
                    console.log("name:" + doc.id + " - " + theData.id.forename);
                    theData.squoink = "squoink";

                    i++;
                    // build ladder entries
                    var newtr = document.createElement("tr");
                    var newtd = document.createElement("td");
                    $(newtd).html(i);
                    $(newtr).append(newtd);

                    newtd = document.createElement("td");
                    $(newtd).html(doc.data().id.forename);
                    $(newtr).append(newtd);

                    newtd = document.createElement("td");
                    $(newtd).html(doc.data().id.forename);
                    $(newtr).append(newtd);

                    newtd = document.createElement("td");
                    $(newtd).html(666);
                    $(newtr).append(newtd);

                    $("#collapseOne tbody").append(newtr);
                   /* fdb.collection("members").doc(x.id).set(theData)
                    .then ( function(){
                        console.log("doc successfully updated");
                    })
                    .catch ( function(){
                        console.log("failed to update doc");
                    });*/
                })
            });

    }

    function getMembers() {
        return members;
    }

    function updateMember(id,entry) {
        fdb.collection("members").doc(id).set(entry)
        .then ( function(){
            console.log("rating successfully updated");
        })
        .catch ( function(){
            console.log("failed to update rating");
        });
    }

    return {
        init: init,
        getMembers: getMembers,
        updateMember: updateMember
    };
})();
db.init();