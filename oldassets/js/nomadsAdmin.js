jQuery(document).ready(function ($) {


    db.init()
    .then (
        function() {
            $("#resetMedBtn").parent().removeClass("hide");
        }
        
    );

    $("#resetMedBtn").on("click", function () {
        
        var males = db.getMalesSortedByName();

        males.forEach(function (doc) {
            var playerData = doc.data();
            playerData.ladder.med.currentRating = 1500;
            playerData.ladder.med.won = 0;
            playerData.ladder.med.lost = 0;
            db.updateMember(doc.id, playerData);
        });
    });
});