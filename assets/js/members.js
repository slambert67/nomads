var members = (function () {

    function buildMembersList( pDetails ) {

        var members;
        var context = { "members": [] };

        switch( pDetails.gender ) {
            case "M":
                members = db.getMalesSortedByName();
                break;
            case "F":
                members = db.getFemalesSortedByName();
                break;
        }

        members.forEach( function(doc) {
            var member = {};
            member.name = doc.data().id.forename + " " + doc.data().id.surname;
            context.members.push(member);
        });

        var templateSrc = $("#" + pDetails.template).html();
        var template = Handlebars.compile(templateSrc);
        var html = template(context);
        $("#" + pDetails.element).html(html);
    }

    function buildLadder( pLadder ) {

        var members = db.getMembersSortedByRating(pLadder.ladder);
        var context = { "members": [] };

        members.forEach(function (doc, i) {
            var member = {};
            member.position = i + 1;
            member.name = doc.data().id.forename + " " + doc.data().id.surname;
            member.stats = doc.data().ladder[pLadder.ladder].won + " / " + doc.data().ladder[pLadder.ladder].lost;
            member.rating = doc.data().ladder[pLadder.ladder].currentRating;
            context.members.push(member);
        });

        var templateSrc = $("#" + pLadder.template).html();
        var template = Handlebars.compile(templateSrc);
        var html = template(context);
        $("#" + pLadder.element).html(html);
    }

    function buildSelect(pSelect, pGender) {

        var members;

        switch (pGender) {
            case "M":
                members = db.getMalesSortedByName();
                break;
            case "F":
                members = db.getFemalesSortedByName();
                break;
            case "B":
                members = db.getMembersSortedByName();
                break;
        }
      
        var context = { "members": [] };
        members.forEach(function (doc) {
            var member = {};
            member.id = doc.id;
            member.name = doc.data().id.forename + " " + doc.data().id.surname;
            context.members.push(member);
        });

        var templateSrc = $("#namesTemplate").html();
        var template = Handlebars.compile(templateSrc);
        var html = template(context);
        $("#" + pSelect.ele).html(html);
    }

    return {
        buildMembersList: buildMembersList,
        buildLadder: buildLadder,
        buildSelect: buildSelect
    };
})();


jQuery(document).ready(function ($) {

    db.init();
    console.log("db initialised");

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("user is signed in");
            $("#memberemail").html(user.email);
            $("#memberin").removeClass("hide");
            $("#membermain").removeClass("hide");
            db.getData()
                .then(
                    function () {
                        members.buildMembersList({ "gender": "M", "element": "maleMembersPanel", "template": "membersTemplate" });
                        members.buildMembersList({ "gender": "F", "element": "femaleMembersPanel", "template": "membersTemplate" });

                        members.buildLadder({ "ladder": "med", "element": "medladder", "template": "ladderTemplate" });
                        members.buildLadder({ "ladder": "mid", "element": "midladder", "template": "ladderTemplate" });
                        members.buildLadder({ "ladder": "wod", "element": "wodladder", "template": "ladderTemplate" });
                        members.buildLadder({ "ladder": "mes", "element": "mesladder", "template": "ladderTemplate" });
                        members.buildLadder({ "ladder": "wos", "element": "wosladder", "template": "ladderTemplate" });

                        $("#membermain").removeClass("hide");
                        $("#getcreds").addClass("hide");
                    },
                    function () {
                        console.log("failed to get data");
                    },
                );
        } else {
            //$("#membercreds").html("Not signed in");
            $("#getcreds").removeClass("hide");
        }
    });

    $("#signout").on("click", function () {
        firebase.auth().signOut().
        then(function () {
            console.log("Sign-out successful.");
            db.setLoggedInMember(null);
            location.reload(true);
        }).catch(function (error) {
        console.log("An error happened.");
    });
});

    // enter results
    $("#submitcreds").on("click", function () {
        var email = $("#email").val();
        var password = $("#userpwd").val();

        db.auth(email,password)
            .then(
                function () {
                    console.log("authorised - " + firebase.auth().currentUser.email + "-" + firebase.auth().currentUser.uid);
                    db.setLoggedInMember(email);
                    db.getData()
                        .then(
                            function () {
                                members.buildMembersList({ "gender": "M", "element": "maleMembersPanel", "template": "membersTemplate" });
                                members.buildMembersList({ "gender": "F", "element": "femaleMembersPanel", "template": "membersTemplate" });

                                members.buildLadder({ "ladder": "med", "element": "medladder", "template": "ladderTemplate" });
                                members.buildLadder({ "ladder": "mid", "element": "midladder", "template": "ladderTemplate" });
                                members.buildLadder({ "ladder": "wod", "element": "wodladder", "template": "ladderTemplate" });
                                members.buildLadder({ "ladder": "mes", "element": "mesladder", "template": "ladderTemplate" });
                                members.buildLadder({ "ladder": "wos", "element": "wosladder", "template": "ladderTemplate" });

                                $("#membermain").removeClass("hide");
                                $("#getcreds").addClass("hide");
                                $("#memberin").removeClass("hide");
                            },
                            function () {
                                console.log("failed to get data");
                            },
                        );
                },
                function () {
                    console.log("authorisation error");
                    $.jGrowl.defaults.closer = false;
                    $.jGrowl.defaults.animateOpen = {width: 'show'};
                    $.jGrowl.defaults.animateClose = {width: 'hide'};

                    $.jGrowl("authorisation error!", { sticky: true });

                }
            );
    });

    // enter results
    $(".enterresultbtn").on("click", function(){
        var matchType = $(this).attr("data-match");
        $("#" + matchType + "LadderPanel").addClass("hide");
        //$("#" + matchType + "LoginPanel").removeClass("hide");
        $("#" + matchType + "ResultPanel").removeClass("hide");
        switch (matchType) {
            case "med":
                gender = "M";
                members.buildSelect({ "ele": "medt1p1" }, "M");
                members.buildSelect({ "ele": "medt1p2" }, "M");
                members.buildSelect({ "ele": "medt2p1" }, "M");
                members.buildSelect({ "ele": "medt2p2" }, "M");
            case "mes":
                members.buildSelect({ "ele": "mesp1" }, "M");
                members.buildSelect({ "ele": "mesp2" }, "M");
                break;
            case "wod":
                members.buildSelect({ "ele": "wodt1p1" }, "F");
                members.buildSelect({ "ele": "wodt1p2" }, "F");
                members.buildSelect({ "ele": "wodt2p1" }, "F");
                members.buildSelect({ "ele": "wodt2p2" }, "F");
            case "wos":
                members.buildSelect({ "ele": "wosp1" }, "F");
                members.buildSelect({ "ele": "wosp2" }, "F");
                break;
            case "mid":
                members.buildSelect({ "ele": "midt1p1" }, "M");
                members.buildSelect({ "ele": "midt1p2" }, "F");
                members.buildSelect({ "ele": "midt2p1" }, "M");
                members.buildSelect({ "ele": "midt2p2" }, "F");
                break;
            default:
                break;
        }
    });


    $(".cancelsubmitbtn").on("click", function () {
        var matchType = $(this).attr("data-match");
        $("#" + matchType + "ResultPanel").addClass("hide");
        $("#" + matchType + "LadderPanel").removeClass("hide");

    });


    //Submit final results
    $(".submitbtn").on("click", function () {

        var t1p1DocId;
        var t1p2DocId;
        var t2p1DocId;
        var t2p2DocId;

        var matchType = $(this).attr("data-match");
        
        // get player ids
        switch (matchType) {
            case "med":
            case "wod":
            case "mid":
                t1p1DocId = $("#" + matchType + "t1p1").val();
                t1p2DocId = $("#" + matchType + "t1p2").val();
                t2p1DocId = $("#" + matchType + "t2p1").val();
                t2p2DocId = $("#" + matchType + "t2p2").val();
                break;
            case "mes":
            case "wos":
                t1p1DocId = $("#" + matchType + "p1").val();
                t1p2DocId = null
                t2p1DocId = $("#" + matchType + "p2").val();
                t2p2DocId = null;
            break;
        }


        // all players must be different for valid match
        if (match.validMatch(t1p1DocId, t1p2DocId, t2p1DocId, t2p2DocId)) {

            $("#" + matchType + "ResultPanel").addClass("hide");
            $("#" + matchType + "ResultSummaryPanel").removeClass("hide");

            // update player statistics
            var txt;
            var male;
            var female;
            var result = match.updateMatchStats(matchType, t1p1DocId, t1p2DocId, t2p1DocId, t2p2DocId);
            result[0]
                .then(
                    function () {
                        switch (matchType) {
                            case "med":
                                male = db.getMale(t1p1DocId).data();
                                txt = male.id.forename + " " + male.id.surname + " and ";
                                male = db.getMale(t1p2DocId).data();
                                txt = txt + male.id.forename + " " + male.id.surname;
                                txt = txt + " gained " + result[1] + " rating points";
                                $("#medt1Summary").html(txt);
                                male = db.getMale(t2p1DocId).data();
                                txt = male.id.forename + " " + male.id.surname + " and ";
                                male = db.getMale(t2p2DocId).data();
                                txt = txt + male.id.forename + " " + male.id.surname;
                                txt = txt + " lost " + result[1] + " rating points";
                                $("#medt2Summary").html(txt);
                                break;
                            case "wod":
                                female = db.getFemale(t1p1DocId).data();
                                txt = female.id.forename + " " + female.id.surname + " and ";
                                female = db.getFemale(t1p2DocId).data();
                                txt = txt + female.id.forename + " " + female.id.surname;
                                txt = txt + " gained " + result[1] + " rating points";
                                $("#wodt1Summary").html(txt);
                                female = db.getFemale(t2p1DocId).data();
                                txt = female.id.forename + " " + female.id.surname + " and ";
                                female = db.getFemale(t2p2DocId).data();
                                txt = txt + female.id.forename + " " + female.id.surname;
                                txt = txt + " lost " + result[1] + " rating points";
                                $("#wodt2Summary").html(txt);
                                break;  
                            case "mid":
                                male = db.getMale(t1p1DocId).data();
                                txt = male.id.forename + " " + male.id.surname + " and ";                                                              
                                female = db.getFemale(t1p2DocId).data();
                                txt = txt + female.id.forename + " " + female.id.surname;
                                txt = txt + " gained " + result[1] + " rating points";
                                $("#midt1Summary").html(txt);
                                male = db.getMale(t2p1DocId).data();
                                txt = male.id.forename + " " + male.id.surname + " and ";
                                female = db.getFemale(t2p2DocId).data();
                                txt = txt + female.id.forename + " " + female.id.surname;
                                txt = txt + " lost " + result[1] + " rating points"; 
                                $("#midt2Summary").html(txt);
                                break;  
                            case "mes":
                                male = db.getMale(t1p1DocId).data();
                                txt = male.id.forename + " " + male.id.surname + " gained " + result[1] + " rating points";    
                                $("#mesp1Summary").html(txt);                            
                                male = db.getMale(t2p1DocId).data();
                                txt = male.id.forename + " " + male.id.surname + " lost " + result[1] + " rating points";   
                                $("#mesp2Summary").html(txt);
                                break; 
                            case "wos":
                                female = db.getFemale(t1p1DocId).data();
                                txt = female.id.forename + " " + female.id.surname + " gained " + result[1] + " rating points";
                                $("#wosp1Summary").html(txt);
                                female = db.getFemale(t2p1DocId).data();
                                txt = female.id.forename + " " + female.id.surname + " lost " + result[1] + " rating points";
                                $("#wosp2Summary").html(txt);
                                break; 
                        }
                    }
                )
        } else {
            $("#" + matchType + "ResultPanel").addClass("hide");
            $("#" + matchType + "InvalidPanel").removeClass("hide");
        }
    });

    
    // invalid match
    $(".invalidmatchbtn").on("click", function () {
        var matchType = $(this).attr("data-match");
        $("#" + matchType +"InvalidPanel").addClass("hide");
        $("#" + matchType + "ResultPanel").removeClass("hide");

    });


    // results summary
    $(".summaryBtn").on("click", function () {
        location.reload(true);
    });

    $("#numguestsbtn").on("click", function () {
        // delete existing guests
        db.deleteGuests();
        var newglobs = {};
        var globs = db.getGlobals();
        var numguests;
        var clubNight;
        var clubNightDate;
        var importantNotice;
        globs.forEach(function (doc) {
            //newglobs.num_guests_allowed = doc.data().num_guests_allowed;
            numguests = $("#numguests").val();
            numguests = parseInt(numguests, 10);
            clubNight = $("#clubnight").val();
            clubNightDate = new Date(clubNight);
            newglobs.num_guests_allowed = numguests;
            newglobs.guest_date = firebase.firestore.Timestamp.fromDate(clubNightDate);
            newglobs.important_notice = doc.data().important_notice;
            db.updateGlobals(newglobs);
        });

    });

    $("#noticebtn").on("click", function () {
        // write to db
        var newglobs = {};
        var globs = db.getGlobals();
        globs.forEach(function (doc) {
            newglobs.num_guests_allowed = doc.data().num_guests_allowed;
            newglobs.guest_date = doc.data().guest_date;
            newglobs.important_notice = $("#notice").val();
            db.updateGlobals(newglobs);
        });
    }); 


});