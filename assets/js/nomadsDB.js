var db = (function() {

    var fdb;
    var males;
    var females;
 
    var newMember = {
        "contact": {
            "address": {
                "area": "",
                "city": "",
                "houseNumber": 1,
                "postcode": "",
                "street": ""
            },
            "email": "marklucas8809@gmail.com",
            "landline": "",
            "mobile": "07912563138"
        },
        "id": {
            "forename": "Mark",
            "surname": "Lucas",
            "middleName": "",
            "gender": "M"
        },
        "ladder": {
            "med": { "currentRating": 1500, "won": 0, "lost": 0 },
            "mid": { "currentRating": 1500, "won": 0, "lost": 0 },
            "mes": { "currentRating": 1500 }
        }
    }


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
        var member = maleMembers.docs.find(el => el.id === id);
        return member;
    }


    function getFemale(id) {
        var member = FemaleMembers.docs.find(el => el.id === id);
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




    function updateMedStats(id1, entry1, id2, entry2, id3, entry3, id4, entry4) {
        var update1 = fdb.collection("members").doc(id1).set(entry1);
        var update2 = fdb.collection("members").doc(id2).set(entry2);
        var update3 = fdb.collection("members").doc(id3).set(entry3);
        var update4 = fdb.collection("members").doc(id4).set(entry4);

        return Promise.all ( [update1,update2,update3,update4] );
    }

    function updateMedStatsOld(id1,entry1,id2,entry2,id3,entry3,id4,entry4,winLose) {

        var t1p1;
        var txt;

        fdb.collection("members").doc(id1).set(entry1)
        .then ( function(){
            console.log("member1 successfully updated");

            fdb.collection("members").doc(id2).set(entry2)
                .then(function () {
                    console.log("member2 successfully updated");

                    fdb.collection("members").doc(id3).set(entry3)
                        .then(function () {
                            console.log("member3 successfully updated");
                            fdb.collection("members").doc(id4).set(entry4)
                                .then(function () {
                                    console.log("member4 successfully updated");
                                    txt = entry1.id.forename + " " + entry1.id.surname + " and ";
                                    txt = txt + entry2.id.forename + " " + entry2.id.surname;
                                    txt = txt + " gained " + winLose + " rating points";
                                    $("#medt1Summary").html(txt);
                                    txt = entry3.id.forename + " " + entry3.id.surname + " and ";
                                    txt = txt + entry4.id.forename + " " + entry4.id.surname;
                                    txt = txt + " lost " + winLose + " rating points";
                                    $("#medt2Summary").html(txt);                                  
                                })
                                .catch(function () {
                                    console.log("failed to update member4 rating");
                                });
                        })
                        .catch(function () {
                            console.log("failed to update member3 rating");
                        });
                })
                .catch(function () {
                    console.log("failed to update member2 rating");
                });
        })
        .catch ( function(){
            console.log("failed to update member1 rating");
        });
    }

    return {
        init: init,
        getMalesSortedByRating: getMalesSortedByRating,
        getMalesSortedByName: getMalesSortedByName,
        getFemalesSortedByRating: getFemalesSortedByRating,
        getMale: getMale,
        getFemale: getFemale,
        updateMedStats: updateMedStats
    };
})();

