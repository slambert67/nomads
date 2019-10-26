jQuery(document).ready(function ($) {

    db.init();
    console.log("db initialised");

    $("#signin").on("click", function () {
        var email = $("#email").val();
        var password = $("#userpwd").val();

        db.auth(email, password)
            .then(
                function () {
                    console.log("authorised");

                    db.getData()
                        .then(
                            function () {
                                $("#adminmain").removeClass("hide");
                                $("#getcreds").addClass("hide");
                            },
                            function () {
                                console.log("failed to get data");
                            },
                        );
                },
                function () {
                    console.log("authorisation error");
                }
            );
    });


    $("#numguestsbtn").on("click", function() {
        // delete existing guests
        db.deleteGuests();
        var newglobs = {};
        var globs = db.getGlobals();
        var numguests;
        var clubNight;
        var clubNightDate;
        globs.forEach( function(doc) {
            //newglobs.num_guests_allowed = doc.data().num_guests_allowed;
            numguests = $("#numguests").val();
            numguests = parseInt(numguests,10);
            clubNight = $("#clubnight").val();
            clubNightDate = new Date(clubNight);
            newglobs.num_guests_allowed = numguests;
            newglobs.guest_date = firebase.firestore.Timestamp.fromDate(clubNightDate);
            db.updateGlobals(newglobs);
        })
               
    });

    $("#noticebtn").on("click", function() {
        // write to db
    });
});