var db = (function () {

    var fdb;
    var males;
    var females;
    var batch;

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

    function getMembersSortedByName() {
        var unsorted = [];
        males.forEach(function (doc) {
            unsorted.push(doc);
        }); 
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

    function getMembersSortedByRating(pLadder) {
        var unsorted = [];

        switch (pLadder) {
            case "med":
                males.forEach(function (doc) {
                    if (doc.data().ladder.med.won + doc.data().ladder.med.lost > 0) {
                        unsorted.push(doc);
                    }
                    
                });
                break;
            case "mes":
                males.forEach(function (doc) {
                    if (doc.data().ladder.mes.won + doc.data().ladder.mes.lost > 0) {
                        unsorted.push(doc);
                    }
                });
                break;
            case "wod":
                females.forEach(function (doc) {
                    if (doc.data().ladder.wod.won + doc.data().ladder.wod.lost > 0) {
                        unsorted.push(doc);
                    }
                });
                break;
            case "wos":
                females.forEach(function (doc) {
                    if (doc.data().ladder.wos.won + doc.data().ladder.wos.lost > 0) {
                        unsorted.push(doc);
                    }
                });
                break;
            case "mid":
                males.forEach(function (doc) {
                    if (doc.data().ladder.mid.won + doc.data().ladder.mid.lost > 0) {
                        unsorted.push(doc);
                    }

                });   
                females.forEach(function (doc) {
                    if (doc.data().ladder.mid.won + doc.data().ladder.mid.lost > 0) {
                        unsorted.push(doc);
                    }
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
        //return fdb.collection("members").doc(memberId).set(memberData);
        batch.update(fdb.collection("members").doc(memberId), memberData);
    }

    function getCredentials(name, pwd) {

        return fdb.collection("credentials")
            .where("name", "==", name)
            .where("password", "==", pwd)
            .get();
    }

    function updateSubmissionLog(pLog, matchType) {

        var log = matchType + "_submission_log";
        //return fdb.collection(log).add(pLog);
        batch.set(fdb.collection(log).doc(), pLog);
    }

    function deleteSubmissionLogs(pMatchType) {

        var logs = pMatchType + "_submission_log"
        var docs = fdb.collection(logs)
            .get()
            .then(
                // fulfillment handler
                function (myDocs) {

                    myLogs = myDocs;
                    myLogs.forEach( function(pLog){
                        fdb.collection(logs).doc(pLog.id).delete()
                            .then(
                                function () {
                                    console.log("doc deleted");
                                },
                                function () {
                                    console.log("error deleting doc");
                                }
                            )
                    })
                },

                // rejection handler
                function (err) {
                    console.error("error retrieving logs");
                }
            );
    }

    function openBatch() {
        batch = fdb.batch();
    }

    function commitBatch() {
        return batch.commit();
    }

    return {
        init: init,
        getMale: getMale,
        getFemale: getFemale,
        getMales: getMales,
        getFemales: getFemales,
        getMalesSortedByName: getMalesSortedByName,
        getMembersSortedByName: getMembersSortedByName,
        getFemalesSortedByName: getFemalesSortedByName,
        getMembersSortedByRating: getMembersSortedByRating,
        addMember: addMember,
        updateMember: updateMember,
        getCredentials: getCredentials,
        updateSubmissionLog: updateSubmissionLog,
        deleteSubmissionLogs: deleteSubmissionLogs,
        openBatch: openBatch,
        commitBatch: commitBatch
    };


})();
