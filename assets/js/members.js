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

    function buildMalesSelect(pSelect) {

        var members = db.getMales();
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

    function buildMaleSubmittersSelect( pSelect ) {

        var members = db.getMales();
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
        buildMalesSelect: buildMalesSelect,
        buildMaleSubmittersSelect: buildMaleSubmittersSelect,
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

            members.buildMaleSubmittersSelect( {"ele": "medsubmitters"}, "Select a submitter" );
        },

        //rejection handler
        function (err) {
            console.error("init error");
        }
    );

    $("#medEnterResultBtn").on("click", function() {
        $("#medLadderPanel").addClass("hide");
        $("#medLoginPanel").removeClass("hide");
    });

    $("#medCancelLoginBtn").on("click", function () {
        $("#medLoginPanel").addClass("hide");
        $("#medLadderPanel").removeClass("hide");        
    });

    $("#medLoginBtn").on("click", function() {

        console.log("submitter = " + $("#medsubmitters").val());
        console.log("entered password = " + $("#medpwd").val());

        db.getCredentials($("#medsubmitters").val(), $("#medpwd").val())
        .then (

            function(docs) {
                                  
               // if (docs.size === 1 && docs.docs[0].data().password === $("#medpwd").val()) {
                    console.log("valid");
                    members.setSubmitter($("#medsubmitters").val());
                    $("#medLoginPanel").addClass("hide");
                    $("#medResultPanel").removeClass("hide");
                    members.buildMalesSelect({ "ele": "medt1p1" }, "Select Player");
                    members.buildMalesSelect({ "ele": "medt1p2" }, "Select Player");
                    members.buildMalesSelect({ "ele": "medt2p1" }, "Select Player");
                    members.buildMalesSelect({ "ele": "medt2p2" }, "Select Player");
                //} else {
                    //console.log("invalid");
                //}
            }
        );
    });

    /*
    ********************************************************************************
    Submit final results
    ********************************************************************************
    */
    $("#medCancelSubmitBtn").on("click", function () {
        $("#medResultPanel").addClass("hide");
        $("#medLadderPanel").removeClass("hide");
    });

    $("#medSubmitBtn").on("click", function(){
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
            alert("invalid match");
        }
    });

    $("#medSummaryBtn").on("click", function () {
        location.reload(true);
    });
    
    /*$("#medCancelBtn").on("click", function () {
        $("#medresultpanel").addClass("hide");
        $("#medladder").removeClass("hide");
        $("#medEnterResultBtn").removeClass("hide");
    });*/


    

});