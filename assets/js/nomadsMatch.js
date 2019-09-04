var match = (function () {

    function validMatch(t1p1, t1p2, t2p1, t2p2) {

        var players = {};
        players[t1p1] = null;
        players[t1p2] = null;
        players[t2p1] = null;
        players[t2p2] = null;

        return (Object.keys(players).length == 4) ? true : false;
    }


    function ratingDelta(winnerCurrentRating, loserCurrentRating) {

        var winnerTransformedRating = Math.pow(10, (winnerCurrentRating / 400));
        var loserTransformedRating = Math.pow(10, (loserCurrentRating / 400));

        var winnerExpectedScore = winnerTransformedRating / (winnerTransformedRating + loserTransformedRating);
        //var loserExpectedScore = loserTransformedRating / (loserTransformedRating + winnerTransformedRating);

        return Math.round(32 * (1 - winnerExpectedScore));
    }


    function updateMatchStats(matchType, winningPlayer1DocId, winningPlayer2DocId, losingPlayer1DocId, losingPlayer2DocId) {
        var winningPlayer1Data;
        var winningPlayer2Data;
        var losingPlayer1Data;
        var losingPlayer2Data;
        var winningPlayer1CurrentRating;
        var winningPlayer2CurrentRating;
        var losingPlayer1CurrentRating;
        var losingPlayer2CurrentRating;
        var winningTeamAvgRating;
        var losingTeamAvgRating;
        var delta;
        var wp1 = null;
        var wp2 = null;
        var lp1 = null;
        var lp2 = null;

        if (matchType === "med") {
            winningPlayer1Data = db.getMale(winningPlayer1DocId).data();
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.med.currentRating;
            winningPlayer2Data = db.getMale(winningPlayer2DocId).data();
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.med.currentRating;
            losingPlayer1Data = db.getMale(losingPlayer1DocId).data();
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.med.currentRating;
            losingPlayer2Data = db.getMale(losingPlayer2DocId).data();
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.med.currentRating;
        } else if (matchType === "mid") {
            winningPlayer1Data = db.getMale(winningPlayer1DocId).data();
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.mid.currentRating;
            winningPlayer2Data = db.getFemale(winningPlayer2DocId).data();
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.mid.currentRating;
            losingPlayer1Data = db.getMale(losingPlayer1DocId).data();
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.mid.currentRating;
            losingPlayer2Data = db.getFemale(losingPlayer2DocId).data();
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.mid.currentRating;
        } else if (matchType === "mes") {
            winningPlayer1Data = db.getMale(winningPlayer1DocId).data();
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.mes.currentRating;
            winningPlayer2Data = db.getMale(winningPlayer2DocId).data();
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.mes.currentRating;
        } else if (matchType === "wod") {
            winningPlayer1Data = db.getFemale(winningPlayer1DocId).data();
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.wod.currentRating;
            winningPlayer2Data = db.getFemale(winningPlayer2DocId).data();
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.wod.currentRating;
            losingPlayer1Data = db.getFemale(losingPlayer1DocId).data();
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.wod.currentRating;
            losingPlayer2Data = db.getFemale(losingPlayer2DocId).data();
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.wod.currentRating;
        } else {  //wos
            winningPlayer1Data = db.getFemale(winningPlayer1DocId).data();
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.wos.currentRating;           
            losingPlayer1Data = db.getFemale(losingPlayer1DocId).data();
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.wos.currentRating;
        }

        if (matchType === "med" || matchType === "mid" || matchType === "wod") {
            winningTeamAvgRating = Math.round((winningPlayer1CurrentRating + winningPlayer2CurrentRating) / 2);
            losingTeamAvgRating = Math.round((losingPlayer1CurrentRating + losingPlayer2CurrentRating) / 2);
            delta = ratingDelta(winningTeamAvgRating, losingTeamAvgRating);
            pointsWonOrLost = Math.round(delta / 2);
        } else {
            pointsWonOrLost = ratingDelta(winningPlayer1CurrentRating, losingPlayer1CurrentRating);
        }

        winningPlayer1Data.ladder[matchType].currentRating = winningPlayer1Data.ladder[matchType].currentRating + pointsWonOrLost;
        winningPlayer1Data.ladder[matchType].won = winningPlayer1Data.ladder[matchType].won + 1;
        wp1 = db.updateMember(winningPlayer1DocId, winningPlayer1Data);
        if (winningPlayer2DocId != null) {
            winningPlayer2Data.ladder[matchType].currentRating = winningPlayer2Data.ladder[matchType].currentRating + pointsWonOrLost;
            winningPlayer2Data.ladder[matchType].won = winningPlayer2Data.ladder[matchType].won + 1;
            wp2 = db.updateMember(winningPlayer2DocId, winningPlayer2Data);
        }
        losingPlayer1Data.ladder[matchType].currentRating = losingPlayer1Data.ladder[matchType].currentRating - pointsWonOrLost;
        losingPlayer1Data.ladder[matchType].lost = losingPlayer1Data.ladder[matchType].lost + 1;
        lp1 = db.updateMember(losingPlayer1DocId, losingPlayer1Data);
        if (losingPlayer2DocId != null) {
            losingPlayer2Data.ladder[matchType].currentRating = losingPlayer2Data.ladder[matchType].currentRating - pointsWonOrLost;
            losingPlayer2Data.ladder[matchType].lost = losingPlayer2Data.ladder[matchType].lost + 1;
            lp2 = db.updateMember(losingPlayer2DocId, losingPlayer2Data);
        }

        if (wp2 === null) {
            // singles match
            //var statsUpdated = Promise.all([wp1, lp1]);

            // update match submission log

        } else {
            // doubles match
            //return [Promise.all([wp1, wp2, lp1, lp2]), pointsWonOrLost];

            var submitter = ma.getSubmitter();
            var log = {
                "submitter": submitter,
                "winner1": winningPlayer1DocId,
                "winner2": winningPlayer2DocId,
                "loser1": losingPlayer1DocId,
                "loser2": losingPlayer2DocId,
                "delta": pointsWonOrLost
            }
            var logUpdated = db.updateMedSubmissionLog(log);

            return [Promise.all([wp1, wp2, lp1, lp2, logUpdated]), pointsWonOrLost];

        }
    }

    return {
        validMatch: validMatch,
        updateMatchStats: updateMatchStats
    };
})();