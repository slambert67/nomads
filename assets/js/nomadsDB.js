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
                "med": { "currentRating": 1500, "won":0, "lost":0 },
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
        .where("id.gender", "==", "M")
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

    function updateDoublesStats(id1,entry1,id2,entry2,id3,entry3,id4,entry4,winLose) {

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
        getMembers: getMembers,
        getSortedMembers: getSortedMembers,
        getMember: getMember,
        updateDoublesStats: updateDoublesStats
    };
})();
db.init();
