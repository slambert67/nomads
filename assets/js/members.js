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

    function buildSubmittersSelect( pSelect, pGender ) {

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
            members.buildSubmittersSelect({ "ele": "midsubmitters" }, "B");
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
        db.getCredentials($("#" + matchType + "submitters").val(), $("#" + matchType + "pwd").val())
            .then(

                function (docs) {

                    // if (docs.size === 1 && docs.docs[0].data().password === $("#medpwd").val()) {
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

                    members.setSubmitter($("#" + matchType + "submitters").val());
                    $("#" + matchType + "LoginPanel").addClass("hide");
                    $("#" + matchType + "ResultPanel").removeClass("hide");

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

   


});