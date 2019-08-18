jQuery(document).ready(function ($) {

    /*(function () {

        // retrieve members from database module
        var mymembers = db.getMembers();
        var i = 0;
        mymembers.forEach( function(doc) {
            i++;
            // build ladder entries
            var newtr = document.createElement("tr");
            var newtd = document.createElement("td");
            $(newtd).html(i);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().id.forename);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().id.forename);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(666);
            $(newtr).append(newtd);

            $("#collapseOne tbody").append(newtr);

        });


    })();*/


    // define match players
    $("#mdResultButton").on("click", function(){

        // reveal and hide appropriate elements
        $(this).addClass("hide");
        $("#submitResult").removeClass("hide");

        // retrieve members from database module
        var mymembers = db.getMembers();

        // add each member to select list
        let i = 0;
        mymembers.forEach( function(doc) {

            // create option element
            var opt = document.createElement("option");
            $(opt).val(doc.id);
            opt.text = doc.data().id.forename + " " + doc.data().id.surname;

            // add instance of option element to each select
            $("#t1p1").get(0).add(opt);
            $("#t1p2").get(0).add( $(opt).clone().get(0));
            $("#t2p1").get(0).add( $(opt).clone().get(0));
            $("#t2p2").get(0).add( $(opt).clone().get(0));
        })


    });

    // submit an actual result
    $("#submitMDR").on("click", function () {

        // reveal and hide appropriate elements
        $(this).addClass("hide");
        $("#submitResult").addClass("hide");
        $("#mdResultButton").removeClass("hide");

        var t1p1DocId = $("#t1p1").val();
        var t1p2DocId = $("#t1p2").val();
        var t2p1DocId = $("#t2p1").val();
        var t2p2DocId = $("#t2p2").val();

        // verify players
        if ( match.validMatch( t1p1DodId, t1p2DocId, t2p1DocId, t2p2DocId )) {
            console.log("valid match");
        } else {
            console.log("invalid match");
        }

        // update player statistics
        match.updatePlayerStats(t1p1DodId, t1p2DocId, t2p1DocId, t2p2DocId);

        
        // write results to database

        /*var doc = $("#t1p1").data('memberdoc');
        var docData = doc.data();
        var docid = doc.id;
        docData.ladder.med.currentRating = 666;
        db.abc(docid,docData);*/
    });

    $("#cancelMDR").on("click", function () {
        $(this).addClass("hide");
        $("#submitResult").addClass("hide");
        $("#mdResultButton").removeClass("hide");
    });

    $("#t1p1").on("input", function (evt) {
        console.log("input event fired");
    });

});




