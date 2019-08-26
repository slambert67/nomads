jQuery(document).ready(function ($) {

    $(document).on("db:loaded1", function(){

        // retrieve members from database module
        var mymembers = db.getSortedMaleMembers();
        var i = 0;
        mymembers.forEach(function (doc) {
            i++;
            // build ladder entries
            var newtr = document.createElement("tr");
            var newtd = document.createElement("td");
            $(newtd).html(i);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().id.forename + " " + doc.data().id.surname);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().ladder.med.won + " / " + doc.data().ladder.med.lost);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().ladder.med.currentRating);
            $(newtr).append(newtd);

            $("#collapseOne tbody").get(0).append(newtr);
        });
    });

    $(document).on("db:loaded2", function () {

        // retrieve members from database module
        var mymembers = db.getSortedFemaleMembers();
        var i = 0;
        mymembers.forEach(function (doc) {
            i++;
            // build ladder entries
            var newtr = document.createElement("tr");
            var newtd = document.createElement("td");
            $(newtd).html(i);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().id.forename + " " + doc.data().id.surname);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().ladder.mid.won + " / " + doc.data().ladder.mid.lost);
            $(newtr).append(newtd);

            newtd = document.createElement("td");
            $(newtd).html(doc.data().ladder.mid.currentRating);
            $(newtr).append(newtd);

            $("#collapseTwo tbody").get(0).append(newtr);
        });
    });
    // define mens doubles match players
    $("#medSubmitResultBtn").on("click", function(){

        // hide medTablePanel
        $("#medTablePanel").addClass("hide");

        // reveal medSubmitResultPanel
        $("#medSubmitResultPanel").removeClass("hide");

        // retrieve members from database module
        var mymembers = db.getSortedMaleMembers();

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

    // define mixed doubles match players
    $("#midSubmitResultBtn").on("click", function () {

        // hide medTablePanel
        $("#midTablePanel").addClass("hide");

        // reveal medSubmitResultPanel
        $("#midSubmitResultPanel").removeClass("hide");

        // retrieve members from database module
        var mymembers = db.getSortedFemaleMembers();

        // add each member to select list
        let i = 0;
        mymembers.forEach(function (doc) {

            // create option element
            var opt = document.createElement("option");
            $(opt).val(doc.id);
            opt.text = doc.data().id.forename + " " + doc.data().id.surname;

            // add instance of option element to each select
            $("#midt1p1").get(0).add(opt);
            $("#midt1p2").get(0).add($(opt).clone().get(0));
            $("#midt2p1").get(0).add($(opt).clone().get(0));
            $("#midt2p2").get(0).add($(opt).clone().get(0));
        })
    });

    // cancel an actual result
    $("#cancelMedResult").on("click", function () {
        // hide medSubmitResultPanel
        $("#medSubmitResultPanel").addClass("hide");

        // reveal medTablePanel
        $("#medTablePanel").removeClass("hide");
    });

    // cancel an actual result
    $("#cancelMidResult").on("click", function () {
        // hide midSubmitResultPanel
        $("#midSubmitResultPanel").addClass("hide");

        // reveal midTablePanel
        $("#midTablePanel").removeClass("hide");
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

    // submit an actual result
    $("#submitMidResult").on("click", function () {
        var t1p1DocId = $("#midt1p1").val();
        var t1p2DocId = $("#midt1p2").val();
        var t2p1DocId = $("#midt2p1").val();
        var t2p2DocId = $("#midt2p2").val();

        // verify players
        if (match.validMatch(t1p1DocId, t1p2DocId, t2p1DocId, t2p2DocId)) {
            console.log("valid match");
            // hide midSubmitResultPanel
            $("#midSubmitResultPanel").addClass("hide");
            // reveal midResultSummary
            $("#midResultSummary").removeClass("hide");
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

    $("#midSummaryBtn").on("click", function () {
        location.reload(true);
    });

 });




