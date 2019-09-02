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


    function getCredentials(username, pwd) {

        var username = $("#medCred").val();
        var pwd = $("#medPwd").val();

        console.log("username = " + username);
        console.log("password = " + pwd);

        return fdb.collection("credentials")
                .where("forename", "==", "Steve")
                .where("surname", "==", "Lambert")
                .get();

    }

    return {
        init: init,
        getMalesSortedByRating: getMalesSortedByRating,
        getMalesSortedByName: getMalesSortedByName,
        getFemalesSortedByRating: getFemalesSortedByRating,
        getFemalesSortedByName: getFemalesSortedByName,
        getMale: getMale,
        getFemale: getFemale,
        updateMember: updateMember,
        getCredentials: getCredentials
    };
})();

