var db = (function() {

    var fdb;
    var members;
    var sortedMembers;

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

        var newMember = {
            "contact": {
                "address": {
                    "area": "",
                    "city": "",
                    "houseNumber": 1,
                    "postcode": "",
                    "street": ""
                },
                "email": "alex_smith83@hotmail.com",
                "landline": "",
                "mobile": "07912563138"
            },
            "id": {
                "forename": "Chris",
                "surname": "Graves",
                "middleName": "",
                "gender": "M"
            },
            "ladder": {
                "med": { "currentRating": 1500 },
                "mes": { "currentRating": 1500 },
                "mid": { "currentRating": 1500 }
            }
        }

       /* fdb.collection("members").add(newMember)
        .then(function () {
            console.log("new member added");
            fdb.collection("members").get()
                .then(function (myData) {
                    members = myData;
                    sortedMembers = sortByRating();

                    $(document).trigger("db:loaded");
                });
        })
        .catch(function (error) {
            console.log("error adding member: " + error);
        });*/

        fdb.collection("members").get()
            .then(function (myData) {
                members = myData;
                sortedMembers = sortByRating();

                $(document).trigger("db:loaded");
            });

    }


    function sortByRating() {
        var unsorted = [];
        members.forEach(function (doc) {
            unsorted.push(doc);
        });

        return unsorted.sort( function(a,b) {
            return b.data().ladder.med.currentRating - a.data().ladder.med.currentRating;
        });
    }

    function getMembers() {
        return members;
    }

    function getSortedMembers() {
        return sortedMembers;
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
        getSortedMembers: getSortedMembers,
        getMember: getMember,
        updateMember: updateMember
    };
})();
db.init();
