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
                    console.log("name:" + theData.id.forename);
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