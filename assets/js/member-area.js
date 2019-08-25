jQuery(document).ready(function ($) {

    $(document).on("db:loaded", function(){

        // retrieve members from database module
        var mymembers = db.getSortedMembers();
        var i = 0;
        mymembers.forEach(function (doc) {
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
            $(newtd).html(doc.data().id.surname);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().ladder.med.currentRating);
            $(newtr).append(newtd);

            $("#collapseOne tbody").get(0).append(newtr);
        });
    });


    // define match players
    $("#medSubmitResultBtn").on("click", function(){

        // hide medTablePanel
        $("#medTablePanel").addClass("hide");

        // reveal medSubmitResultPanel
        $("#medSubmitResultPanel").removeClass("hide");

        // retrieve members from database module
        var mymembers = db.getSortedMembers();

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

    // cancel an actual result
    $("#cancelMedResult").on("click", function () {
        // hide medSubmitResultPanel
        $("#medSubmitResultPanel").addClass("hide");

        // reveal medTablePanel
        $("#medTablePanel").removeClass("hide");
    });

    // submit an actual result
    $("#submitMedResult").on("click", function () {
        var t1p1DocId = $("#t1p1").val();
        var t1p2DocId = $("#t1p2").val();
        var t2p1DocId = $("#t2p1").val();
        var t2p2DocId = $("#t2p2").val();

        // verify players
        if ( match.validMatch( t1p1DocId, t1p2DocId, t2p1DocId, t2p2DocId )) {
            console.log("valid match");
            // hide medSubmitResultPanel
            $("#medSubmitResultPanel").addClass("hide");
            // reveal medResultSummary
            $("#medResultSummary").removeClass("hide");
            // update player statistics
            match.updateDoublesStats(t1p1DocId, t1p2DocId, t2p1DocId, t2p2DocId);
        } else {
            console.log("invalid match");
            alert("invalid match");
        }

    });

    $("#medSummaryBtn").on("click", function(){
        location.reload(true);
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




