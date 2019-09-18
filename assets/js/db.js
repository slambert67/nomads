var db = (function () {

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
            .then(
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

        return Promise.all([m, w]);
    }

    function getMale(id) {
        var member = males.docs.find(el => el.id === id);
        return member;
    }


    function getFemale(id) {
        var member = females.docs.find(el => el.id === id);
        return member;
    }

    function getMales() {
        return males;
    }

    function getFemales() {
        return females;
    }

    function getMembersSortedByRating(pLadder) {
        var unsorted = [];

        switch (pLadder) {
            case "med":
            case "mes":
                males.forEach(function (doc) {
                    unsorted.push(doc);
                });
                break;
            case "wod":
            case "wos":
                females.forEach(function (doc) {
                    unsorted.push(doc);
                });
                break;
            case "mid":
                males.forEach(function (doc) {
                    unsorted.push(doc);
                });   
                females.forEach(function (doc) {
                    unsorted.push(doc);
                });
                break;
            default:
                break;             
        }

        return unsorted.sort(function (a, b) {
            return b.data().ladder[pLadder].currentRating - a.data().ladder[pLadder].currentRating;
        });
    }

    function addMember( pMember ) {

        fdb.collection("members").add(pMember)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }

    function updateMember(memberId, memberData) {
        return fdb.collection("members").doc(memberId).set(memberData);
    }

    function getCredentials(name, pwd) {

        console.log("in credentials name = " + name);
        console.log("in credentials password = " + pwd);

        return fdb.collection("credentials")
            .where("name", "==", name)
            .where("password", "==", pwd)
            .get();
    }

    function updateMedSubmissionLog(log) {
        return fdb.collection("med_submission_log").add(log);
    }

    return {
        init: init,
        getMale: getMale,
        getFemale: getFemale,
        getMales: getMales,
        getFemales: getFemales,
        getMembersSortedByRating: getMembersSortedByRating,
        addMember: addMember,
        updateMember: updateMember,
        getCredentials: getCredentials,
        updateMedSubmissionLog: updateMedSubmissionLog
    };


})();
