var match = (function () {

    function validMatch(t1p1, t1p2, t2p1, t2p2) {

        // all players must be different!
        if ( t1p1 != t1p2) {
            if ( t2p1 != t1p2 ) {
                if ( t2p2 != t2p1) {
                    return true;}}}
        return false;
    }


    function ratingDelta(winnerCurrentRating, loserCurrentRating) {

        var winnerTransformedRating = Math.pow(10, (winnerCurrentRating / 400));
        var loserTransformedRating = Math.pow(10, (loserCurrentRating / 400));

        var winnerExpectedScore = winnerTransformedRating / (winnerTransformedRating + loserTransformedRating);
        //var loserExpectedScore = loserTransformedRating / (loserTransformedRating + winnerTransformedRating);

        return Math.round(32 * (1 - winnerExpectedScore));
    }


    function updateDoublesStats(winningPlayer1DocId, winningPlayer2DocId, losingPlayer1DocId, losingPlayer2DocId) {

        // winners
        var winningPlayer1 = db.getMember(winningPlayer1DocId);
        var winningPlayer1Data = winningPlayer1.data();
        var winningPlayer1CurrentRating = winningPlayer1Data.ladder.med.currentRating;
        var winningPlayer2 = db.getMember(winningPlayer2DocId);
        var winningPlayer2Data = winningPlayer2.data();
        var winningPlayer2CurrentRating = winningPlayer2Data.ladder.med.currentRating;

        // losers
        var losingPlayer1 = db.getMember(losingPlayer1DocId);
        var losingPlayer1Data = losingPlayer1.data();
        var losingPlayer1CurrentRating = losingPlayer1Data.ladder.med.currentRating;
        var losingPlayer2 = db.getMember(losingPlayer2DocId);
        var losingPlayer2Data = losingPlayer2.data();
        var losingPlayer2CurrentRating = losingPlayer2Data.ladder.med.currentRating;

        var winningTeamAvgRating = Math.round((winningPlayer1CurrentRating + winningPlayer2CurrentRating) / 2 );
        var losingTeamAvgRating = Math.round((losingPlayer1CurrentRating + losingPlayer2CurrentRating) / 2);

        var delta = ratingDelta(winningTeamAvgRating, losingTeamAvgRating);
        var winLose = Math.round(delta / 2);

        winningPlayer1Data.ladder.med.currentRating = winningPlayer1Data.ladder.med.currentRating + winLose;
        winningPlayer2Data.ladder.med.currentRating = winningPlayer2Data.ladder.med.currentRating + winLose;
        losingPlayer1Data.ladder.med.currentRating = losingPlayer1Data.ladder.med.currentRating - winLose;
        losingPlayer2Data.ladder.med.currentRating = losingPlayer2Data.ladder.med.currentRating - winLose;

        db.updateDoublesStats(winningPlayer1DocId, winningPlayer1Data,
                              winningPlayer2DocId, winningPlayer2Data,
                              losingPlayer1DocId, losingPlayer1Data,
                              losingPlayer2DocId, losingPlayer2Data,
                              winLose);
    }

    return {
        validMatch: validMatch,
        updateDoublesStats: updateDoublesStats
    };
})();