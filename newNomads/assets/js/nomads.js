jQuery(document).ready(function ($) {

    $("#mdResultButton").on("click", function(){
        $(this).addClass("hide");
        $("#submitResult").removeClass("hide");
        var mymembers = db.getMembers();

        mymembers.forEach(function (x) {
            var theData = x.data();
            var opt = document.createElement("option");
            opt.value = "3";
            opt.text = theData.id.forename + " " + theData.id.surname;
            $("#t1p1").get(0).add(opt);
            $("#t1p2").get(0).add( $(opt).clone().get(0));
            $("#t2p1").get(0).add( $(opt).clone().get(0));
            $("#t2p2").get(0).add( $(opt).clone().get(0));
        })
    });

    $("#submitMDR").on("click", function () {
        $(this).addClass("hide");
        $("#submitResult").addClass("hide");
        $("#mdResultButton").removeClass("hide");
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




