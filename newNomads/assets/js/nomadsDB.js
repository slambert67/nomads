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
                $(document).trigger("db:loaded");
            });
    }

    function getMembers() {
        return members;
    }

    function getMember(id) {
        var member = members.docs.find(el => el.id === id);
        return member;
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
        getMember: getMember,
        updateMember: updateMember
    };
})();
db.init();