jQuery(document).ready(function ($) {

    $("#mdResultButton").on("click", function(){
        $(this).addClass("hide");
        $("#submitResult").removeClass("hide");
        var mymembers = db.getMembers();

        /*
        doc.id
        doc.data()

        $('#myElId').data('nameYourData', { foo: 'bar' });
        var myData = $('#myElId').data('nameYourData');
        */
        let i = 0;
        mymembers.forEach(function (doc) {
            var docData = doc.data();
            var opt = document.createElement("option");
            opt.value = doc;
            opt.text = docData.id.forename + " " + docData.id.surname;
            $("#t1p1").get(0).add(opt);
            $("#t1p2").get(0).add( $(opt).clone().get(0));
            $("#t2p1").get(0).add( $(opt).clone().get(0));
            $("#t2p2").get(0).add( $(opt).clone().get(0));

            if (i == 0) {
                // first nomads member retrieved - set select data to this
                $("#t1p1").data('memberdoc', doc);
                $("#t1p2").data('memberdoc', doc);
                $("#t2p1").data('memberdoc', doc);
                $("#t2p2").data('memberdoc', doc);
            }
            i++;
        })


    });

    $("#submitMDR").on("click", function () {
        $(this).addClass("hide");
        $("#submitResult").addClass("hide");
        $("#mdResultButton").removeClass("hide");

        var doc = $("#t1p1").data('memberdoc');

        var docData = doc.data();
        var docid = doc.id;
        console.log('hello world');
        /*var doc = $("#t1p1").val();
        var docData = doc.data();*/
        docData.ladder.med.currentRating = 666;
        db.abc(docid,docData);
    });

    $("#cancelMDR").on("click", function () {
        $(this).addClass("hide");
        $("#submitResult").addClass("hide");
        $("#mdResultButton").removeClass("hide");
    });

    $("#t1p1").on("input", function () {
        console.log("input event fired");
    });

});




