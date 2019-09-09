var ma = (function () {

    var submitter;

    function getSubmitter() {
        return submitter;
    }

    function setSubmitter(pSubmitterDocId) {
        var male = db.getMale(pSubmitterDocId)
        submitter = male.data().id.forename + ' ' + male.data().id.surname;
    }

    return {
        getSubmitter: getSubmitter,
        setSubmitter: setSubmitter 
    }
})();

jQuery(document).ready(function ($) {

    // template
    /*var source = document.getElementById("test-template").innerHTML;
    var template = Handlebars.compile(source);

    var context = { title: "My New Post", body: "This is my first post!" };
    var html = template(context);

    $("#one").html(html);*/



    db.init()
    .then (
        // fulfillment handler
        function () {
            
            var males = db.getMalesSortedByRating();
            var females = db.getFemalesSortedByRating();

            // build med ladder entries
            var templateSrc = $("#medLadderTemplate").html();
            var template = Handlebars.compile(templateSrc);
            var context = {"males":[]};
            males.forEach(function (doc,i) {
                var male = {};
                male.position = i+1;
                male.forename = doc.data().id.forename;
                male.surname = doc.data().id.surname;
                male.won = doc.data().ladder.med.won;
                male.lost = doc.data().ladder.med.lost;
                male.rating = doc.data().ladder.med.currentRating;
                context.males.push(male);
            });
            var html = template(context);
            $("#medTablePanel").html(html);
            /*
            var i = 0;
            males.forEach(function (doc) {
                i++;
                
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

                $("#medAccordion tbody").get(0).append(newtr);

                // create option element
                var opt = document.createElement("option");
                $(opt).val(doc.id);
                opt.text = doc.data().id.forename + " " + doc.data().id.surname;
                // add option to credentials list
                $("#medCred").get(0).add(opt);
            });*/

            // build mid ladder entries
            i = 0;
            males.forEach(function (doc) {
                i++;
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

                $("#midAccordion tbody").get(0).append(newtr);

            });
            
            i = 0;
            females.forEach(function (doc) {
                i++;
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

                $("#midAccordion tbody").get(0).append(newtr);
            });

            $("#accordion2").removeClass("hide");
        },

        //rejection handler
        function (err) {
            console.error("init error");
        }
    );

    /*
    ********************************************************************************
    Populate the drop down lists when appropriate
    ********************************************************************************
    */

    // define mens doubles match players
    $("#medSubmitResultBtn").on("click", function(){

        checkCredentials()
        .then(
            function (docs) {
                console.log("retrieved user");
                if (docs.size === 1 && docs.docs[0].data().password === $("#medPwd").val()) {
                    console.log("valid");

                    ma.setSubmitter($("#medCred").val());

                    // hide medTablePanel
                    $("#medTablePanel").addClass("hide");

                    // reveal medSubmitResultPanel
                    $("#medSubmitResultPanel").removeClass("hide");

                    // retrieve members from database module
                    var males = db.getMalesSortedByName();

                    // add each member to select list
                    males.forEach(function (doc) {

                        // create option element
                        var opt = document.createElement("option");
                        $(opt).val(doc.id);
                        opt.text = doc.data().id.forename + " " + doc.data().id.surname;

                        // add instance of option element to each select
                        $("#medt1p1").get(0).add(opt);
                        $("#medt1p2").get(0).add($(opt).clone().get(0));
                        $("#medt2p1").get(0).add($(opt).clone().get(0));
                        $("#medt2p2").get(0).add($(opt).clone().get(0));
                    })
                } else {
                    alert("invalid user");
                }
            }
        );




    });

    // define mixed doubles match players
    $("#midSubmitResultBtn").on("click", function () {

        // hide medTablePanel
        $("#midTablePanel").addClass("hide");

        // reveal medSubmitResultPanel
        $("#midSubmitResultPanel").removeClass("hide");

        // retrieve members from database module
        var males = db.getMalesSortedByName();
        var females = db.getFemalesSortedByName();

        // add males to drop down list
        males.forEach(function (doc) {
            // create option element
            var opt = document.createElement("option");
            $(opt).val(doc.id);
            opt.text = doc.data().id.forename + " " + doc.data().id.surname;
            
            // add instance of option element to each select
            $("#midt1p1").get(0).add(opt);
            $("#midt2p1").get(0).add($(opt).clone().get(0));           
        });

        // add females to drop down list
        females.forEach(function (doc) {
            // create option element
            var opt = document.createElement("option");
            $(opt).val(doc.id);
            opt.text = doc.data().id.forename + " " + doc.data().id.surname;

            // add instance of option element to each select
            $("#midt1p2").get(0).add(opt);
            $("#midt2p2").get(0).add($(opt).clone().get(0));
        });
    });

    /*
    ********************************************************************************
    Cancel result submission
    ********************************************************************************
    */

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


    /*
    ********************************************************************************
    Submit final results
    ********************************************************************************
    */

    // submit an actual med result
    $("#submitMedResult").on("click", function () {

        var medt1p1DocId = $("#medt1p1").val();
        var medt1p2DocId = $("#medt1p2").val();
        var medt2p1DocId = $("#medt2p1").val();
        var medt2p2DocId = $("#medt2p2").val();

        // verify players
        if ( match.validMatch( medt1p1DocId, medt1p2DocId, medt2p1DocId, medt2p2DocId )) {
            // hide medSubmitResultPanel
            $("#medSubmitResultPanel").addClass("hide");
            // reveal medResultSummary
            $("#medResultSummary").removeClass("hide");

            // update player statistics
            var txt;
            var male;
            var result = match.updateMatchStats("med", medt1p1DocId, medt1p2DocId, medt2p1DocId, medt2p2DocId);
            result[0]
            .then (
                function() {
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

    // submit an actual mid result
    $("#submitMidResult").on("click", function () {

    
        var midt1p1DocId = $("#midt1p1").val();
        var midt1p2DocId = $("#midt1p2").val();
        var midt2p1DocId = $("#midt2p1").val();
        var midt2p2DocId = $("#midt2p2").val();

        // verify players
        if (match.validMatch(midt1p1DocId, midt1p2DocId, midt2p1DocId, midt2p2DocId)) {
            // hide midSubmitResultPanel
            $("#midSubmitResultPanel").addClass("hide");
            // reveal midResultSummary
            $("#midResultSummary").removeClass("hide");

            // update player statistics
            var txt;
            var female;
            var result = match.updateMatchStats("mid", midt1p1DocId, midt1p2DocId, midt2p1DocId, midt2p2DocId);
            result[0]
            .then(
                function () {
                    male = db.getMale(midt1p1DocId).data();
                    txt = male.id.forename + " " + male.id.surname + " and ";
                    female = db.getFemale(midt1p2DocId).data();
                    txt = txt + female.id.forename + " " + female.id.surname;
                    txt = txt + " gained " + result[1] + " rating points";
                    $("#midt1Summary").html(txt);
                    male = db.getMale(midt2p1DocId).data();
                    txt = male.id.forename + " " + male.id.surname + " and ";
                    female = db.getFemale(midt2p2DocId).data();
                    txt = txt + male.id.forename + " " + female.id.surname;
                    txt = txt + " lost " + result[1] + " rating points";
                    $("#midt2Summary").html(txt);
                }
            )
        } else {
            alert("invalid match");
        }
    });

    $("#medSummaryBtn").on("click", function(){
        location.reload(true);
    });

    $("#midSummaryBtn").on("click", function () {
        location.reload(true);
    });



    /*
    ********************************************************************************
    Credential checking
    ********************************************************************************
    */
    function checkCredentials() {
        console.log("checking credentials");

        return db.getCredentials($("#medCred").val(),$("#medPwd").val());

    }

 });




