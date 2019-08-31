var db = (function() {

    var fdb;
    var males;
    var females;


    // initialise firebase and retrieve all members
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

        // retrieve male members
        var m = fdb.collection("members")
        .where("id.gender", "==", "M")
        .get()
        .then (
            // fulfillment handler
            function (myData) {
                males = myData;
            },

            // rejection handler
            function (err) {
                console.error("get males error");
            }
        );

        // retrieve female members
        var w = fdb.collection("members")
        .where("id.gender", "==", "F")
        .get()
        .then(
            // fulfillment handler
            function (myData) {
                females = myData;
            },

            // rejection handler
            function (err) {
                console.error("get females error");
            }
        );

        return Promise.all([m,w]);
    }


    function getMale(id) {
        var member = males.docs.find(el => el.id === id);
        return member;
    }


    function getFemale(id) {
        var member = females.docs.find(el => el.id === id);
        return member;
    }


    function getMalesSortedByRating() {
        var unsorted = [];
        males.forEach(function (doc) {
            unsorted.push(doc);
        });

        return unsorted.sort( function(a,b) {
            return b.data().ladder.med.currentRating - a.data().ladder.med.currentRating;
        });
    }

    function getMalesSortedByName() {
        var unsorted = [];
        males.forEach(function (doc) {
            unsorted.push(doc);
        });

        return unsorted.sort(function (a, b) {
            if ((a.data().id.forename + a.data().id.surname) <= (b.data().id.forename + b.data().id.surname)) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    function getFemalesSortedByRating() {
        var unsorted = [];
        females.forEach(function (doc) {
            unsorted.push(doc);
        });

        return unsorted.sort(function (a, b) {
            return b.data().ladder.mid.currentRating - a.data().ladder.mid.currentRating;
        });
    }

    function getFemalesSortedByName() {
        var unsorted = [];
        females.forEach(function (doc) {
            unsorted.push(doc);
        });

        return unsorted.sort(function (a, b) {
            if ((a.data().id.forename + a.data().id.surname) <= (b.data().id.forename + b.data().id.surname)) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    // todo rework

    function updateMember(memberId, memberData) {
        return fdb.collection("members").doc(memberId).set(memberData);
    }


    function updateDoublesMatchStats(id1, entry1, id2, entry2, id3, entry3, id4, entry4) {
        
        var update2 = fdb.collection("members").doc(id2).set(entry2);
        var update3 = fdb.collection("members").doc(id3).set(entry3);
        var update4 = fdb.collection("members").doc(id4).set(entry4);

        return Promise.all ( [update1,update2,update3,update4] );
    }

    return {
        init: init,
        getMalesSortedByRating: getMalesSortedByRating,
        getMalesSortedByName: getMalesSortedByName,
        getFemalesSortedByRating: getFemalesSortedByRating,
        getFemalesSortedByName: getFemalesSortedByName,
        getMale: getMale,
        getFemale: getFemale,
        updateMember: updateMember
    };
})();

