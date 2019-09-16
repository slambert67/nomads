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

    function buildMaleNamesSelect( pSelect ) {

        var members = db.getMales();
        var context = { "members": [] };
        members.forEach(function (doc) {
            var member = {};
            member.name = doc.data().id.forename + " " + doc.data().id.surname;
            context.members.push(member);
        });    
        
        var templateSrc = $("#namesTemplate").html();
        var template = Handlebars.compile(templateSrc);
        var html = template(context);
        $("#" + pSelect.ele).html(html);
    }

    return {
        buildLadder: buildLadder,
        buildMaleNamesSelect: buildMaleNamesSelect,
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

            members.buildMaleNamesSelect( {"ele": "medsubmitters"} );
        },

        //rejection handler
        function (err) {
            console.error("init error");
        }
    );

    $("#medEnterResultBtn").on("click", function() {
        $(this).addClass("hide");
        $("#medladder").addClass("hide");
        $("#medcredpanel").removeClass("hide");
    });

    $("#medLoginBtn").on("click", function() {

        console.log("submitter = " + $("#medsubmitters").val());
        console.log("entered password = " + $("#medpwd").val());

        db.getCredentials($("#medsubmitters").val(), $("#medpwd").val())
        .then (

            function(docs) {
                                  
                if (docs.size === 1 && docs.docs[0].data().password === $("#medpwd").val()) {
                    console.log("valid");
                    members.setSubmitter($("#medsubmitters").val());
                    $("#medcredpanel").addClass("hide");
                    $("#medresultpanel").removeClass("hide");
                    members.buildMaleNamesSelect({ "ele": "medt1p1" });
                    members.buildMaleNamesSelect({ "ele": "medt1p2" });
                    members.buildMaleNamesSelect({ "ele": "medt2p1" });
                    members.buildMaleNamesSelect({ "ele": "medt2p2" });
                } else {
                    console.log("invalid");
                }
            }
        );
    });

    $("#medSubmitBtn").on("click", function(){
        $("#medresultpanel").addClass("hide");
        $("#medladder").removeClass("hide");
    });

});