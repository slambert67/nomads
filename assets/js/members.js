var members = (function () {

    var submitter;

    function setSubmitter( pSubmitter ) {
        submitter = pSubmitter;
    }

    function getSubmitter() {
        return submitter;
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
        if (pGender == "M") {
            members = db.getMalesSortedByName();
        } else {
            members = db.getFemalesSortedByName();
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

    function buildSubmittersSelect( pSelect, pGender ) {

        var members;
        if (pGender == "M") {
            members = db.getMalesSortedByName();
        } else {
            members = db.getFemalesSortedByName();
        }
 
        var context = { "members": [] };
        members.forEach(function (doc) {
            var member = {};
            member.name = doc.data().id.forename + " " + doc.data().id.surname;
            member.id = member.name;
            context.members.push(member);
        });    
        
        var templateSrc = $("#namesTemplate").html();
        var template = Handlebars.compile(templateSrc);
        var html = template(context);
        $("#" + pSelect.ele).html(html);
    }

    return {
        buildLadder: buildLadder,
        buildSelect: buildSelect,
        buildSubmittersSelect: buildSubmittersSelect,
        getSubmitter: getSubmitter,
        setSubmitter: setSubmitter
    };
})();




jQuery(document).ready(function ($) {

    db.init()
    .then(
        // fulfillment handler
        function () {
            members.buildLadder( { "ladder": "med", "element": "medladder", "template": "ladderTemplate"} );
            members.buildLadder( { "ladder": "mid", "element": "midladder", "template": "ladderTemplate" });
            members.buildLadder( { "ladder": "wod", "element": "wodladder", "template": "ladderTemplate" });
            members.buildLadder( { "ladder": "mes", "element": "mesladder", "template": "ladderTemplate" });
            members.buildLadder( { "ladder": "wos", "element": "wosladder", "template": "ladderTemplate" });

            members.buildSubmittersSelect( {"ele": "medsubmitters"}, "M" );
            members.buildSubmittersSelect({ "ele": "wodsubmitters" }, "F");
            members.buildSubmittersSelect({ "ele": "midsubmitters" }, "F");
            members.buildSubmittersSelect({ "ele": "messubmitters" }, "M");
            members.buildSubmittersSelect({ "ele": "wossubmitters" }, "F");
        },

        //rejection handler
        function (err) {
            console.error("init error");
        }
    );

    // enter results
    $(".enterresultbtn").on("click", function(){
        var matchType = $(this).attr("data-match");
        $("#" + matchType + "LadderPanel").addClass("hide");
        $("#" + matchType + "LoginPanel").removeClass("hide");

    });

    // cancel login
    $(".cancelloginbtn").on("click", function () {
        var matchType = $(this).attr("data-match");
        $("#" + matchType + "LoginPanel").addClass("hide");
        $("#" + matchType + "LadderPanel").removeClass("hide");

    });


    // login
    $(".loginbtn").on("click", function () {
        var matchType = $(this).attr("data-match");
        var player;
        var gender;

        if (matchType == "med") {
            gender = "M";
        } else {
            gender = "F";
        }

        db.getCredentials($("#" + matchType + "submitters").val(), $("#" + matchType + "pwd").val())
            .then(

                function (docs) {

                    // if (docs.size === 1 && docs.docs[0].data().password === $("#medpwd").val()) {
                    console.log("valid");
                    members.setSubmitter($("#" + matchType + "submitters").val());
                    $("#" + matchType + "LoginPanel").addClass("hide");
                    $("#" + matchType + "ResultPanel").removeClass("hide");
                    player = matchType + "t1p1";
                    members.buildSelect({ "ele": player }, gender);
                    player = matchType + "t1p2";
                    members.buildSelect({ "ele": player }, gender);
                    player = matchType + "t2p1";
                    members.buildSelect({ "ele": player }, gender);
                    player = matchType + "t2p2";
                    members.buildSelect({ "ele": player }, gender);
                    //} else {
                    //console.log("invalid");
                    //}
                }
            );
    });

    $(".cancelsubmitbtn").on("click", function () {
        var matchType = $(this).attr("data-match");
        $("#" + matchType + "ResultPanel").addClass("hide");
        $("#" + matchType + "LadderPanel").removeClass("hide");

    });


    //Submit final results
    $("#medSubmitBtn").on("click", function () {
        /*$("#medresultpanel").addClass("hide");
        $("#medladder").removeClass("hide");
        $("#medEnterResultBtn").removeClass("hide");*/

        // get player ids
        var medt1p1DocId = $("#medt1p1").val();
        var medt1p2DocId = $("#medt1p2").val();
        var medt2p1DocId = $("#medt2p1").val();
        var medt2p2DocId = $("#medt2p2").val();

        // all players must be different for valid match
        if (match.validMatch(medt1p1DocId, medt1p2DocId, medt2p1DocId, medt2p2DocId)) {

            $("#medResultPanel").addClass("hide");
            $("#medResultSummaryPanel").removeClass("hide");
            // update player statistics
            var txt;
            var male;
            var result = match.updateMatchStats("med", medt1p1DocId, medt1p2DocId, medt2p1DocId, medt2p2DocId);
            result[0]
                .then(
                    function () {
                        male = db.getMale(medt1p1DocId).data();
                        txt = male.id.forename + " " + male.id.surname + " and ";
                        male = db.getMale(medt1p2DocId).data();
                        txt = txt + male.id.forename + " " + male.id.surname;
                        txt = txt + " gained " + result[1] + " rating points";
                        $("#medt1Summary").html(txt);
                        male = db.getMale(medt2p1DocId).data();
                        txt = male.id.forename + " " + male.id.surname + " and ";
                        male = db.getMale(medt2p2DocId).data();
                        txt = txt + male.id.forename + " " + male.id.surname;
                        txt = txt + " lost " + result[1] + " rating points";
                        $("#medt2Summary").html(txt);
                    }
                )
        } else {
            $("#medResultPanel").addClass("hide");
            $("#invalidMedPanel").removeClass("hide");
        }
    });

    
    // invalid match
    $(".invalidmatchbtn").on("click", function () {
        var matchType = $(this).attr("data-match");
        $("#invalid" + matchType + "Panel").addClass("hide");
        $("#" + matchType + "ResultPanel").removeClass("hide");

    });


    // results summary
    $("#medSummaryBtn").on("click", function () {
        location.reload(true);
    });

   


});