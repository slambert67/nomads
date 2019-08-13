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
                myData.forEach( function(x) {
                    var theData = x.data();
                    console.log("name:" + x.id + " - " + theData.id.forename);
                    theData.squoink = "squoink";
                    fdb.collection("members").doc(x.id).set(theData)
                    .then ( function(){
                        console.log("doc successfully updated");
                    })
                    .catch ( function(){
                        console.log("failed to update doc");
                    });
                })
            });

    }

    function getMembers() {
        return members;
    }

    return {
        init: init,
        getMembers: getMembers
    };
})();
db.init();