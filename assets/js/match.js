var match = (function () {

    function validMatch(t1p1, t1p2, t2p1, t2p2) {

        var players = {};

        if (t1p2 == null) {
            // singles
            players[t1p1] = null;
            players[t2p1] = null;
            return (Object.keys(players).length == 2) ? true : false;
        } else {
            // doubles
            players[t1p1] = null;
            players[t1p2] = null;
            players[t2p1] = null;
            players[t2p2] = null;
            return (Object.keys(players).length == 4) ? true : false;
        }
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
        var submitter;
        var logUpdated;
        var log;
        var wp1 = null;
        var wp2 = null;
        var lp1 = null;
        var lp2 = null;
        var winner1;
        var winner2;
        var loser1;
        var loser2;

        if (matchType === "med") {
            //submitter = members.getSubmitter("med");
            submitter = firebase.auth().currentUser.email;
            winningPlayer1Data = db.getMale(winningPlayer1DocId).data();
            winner1 = winningPlayer1Data.id.forename + " " + winningPlayer1Data.id.surname;
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.med.currentRating;
            winningPlayer2Data = db.getMale(winningPlayer2DocId).data();
            winner2 = winningPlayer2Data.id.forename + " " + winningPlayer2Data.id.surname;
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.med.currentRating;
            losingPlayer1Data = db.getMale(losingPlayer1DocId).data();
            loser1 = losingPlayer1Data.id.forename + " " + losingPlayer1Data.id.surname;
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.med.currentRating;
            losingPlayer2Data = db.getMale(losingPlayer2DocId).data();
            loser2 = losingPlayer2Data.id.forename + " " + losingPlayer2Data.id.surname;
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.med.currentRating;
        } else if (matchType === "mid") {
            submitter = members.getSubmitter("mid");
            winningPlayer1Data = db.getMale(winningPlayer1DocId).data();
            winner1 = winningPlayer1Data.id.forename + " " + winningPlayer1Data.id.surname;
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.mid.currentRating;
            winningPlayer2Data = db.getFemale(winningPlayer2DocId).data();
            winner2 = winningPlayer2Data.id.forename + " " + winningPlayer2Data.id.surname;
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.mid.currentRating;
            losingPlayer1Data = db.getMale(losingPlayer1DocId).data();
            loser1 = losingPlayer1Data.id.forename + " " + losingPlayer1Data.id.surname;
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.mid.currentRating;
            losingPlayer2Data = db.getFemale(losingPlayer2DocId).data();
            loser2 = losingPlayer2Data.id.forename + " " + losingPlayer2Data.id.surname;
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.mid.currentRating;
        } else if (matchType === "mes") {
            submitter = members.getSubmitter("mes");
            winningPlayer1Data = db.getMale(winningPlayer1DocId).data();
            winner1 = winningPlayer1Data.id.forename + " " + winningPlayer1Data.id.surname;
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.mes.currentRating;
            losingPlayer1Data = db.getMale(losingPlayer1DocId).data();
            loser1 = losingPlayer1Data.id.forename + " " + losingPlayer1Data.id.surname;
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.mes.currentRating;
        } else if (matchType === "wod") {
            submitter = members.getSubmitter("wod");
            winningPlayer1Data = db.getFemale(winningPlayer1DocId).data();
            winner1 = winningPlayer1Data.id.forename + " " + winningPlayer1Data.id.surname;
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.wod.currentRating;
            winningPlayer2Data = db.getFemale(winningPlayer2DocId).data();
            winner2 = winningPlayer2Data.id.forename + " " + winningPlayer2Data.id.surname;
            winningPlayer2CurrentRating = winningPlayer2Data.ladder.wod.currentRating;
            losingPlayer1Data = db.getFemale(losingPlayer1DocId).data();
            loser1 = losingPlayer1Data.id.forename + " " + losingPlayer1Data.id.surname;
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.wod.currentRating;
            losingPlayer2Data = db.getFemale(losingPlayer2DocId).data();
            loser2 = losingPlayer2Data.id.forename + " " + losingPlayer2Data.id.surname;
            losingPlayer2CurrentRating = losingPlayer2Data.ladder.wod.currentRating;
        } else {  //wos
            submitter = members.getSubmitter("wos");
            winningPlayer1Data = db.getFemale(winningPlayer1DocId).data();
            winner1 = winningPlayer1Data.id.forename + " " + winningPlayer1Data.id.surname;
            winningPlayer1CurrentRating = winningPlayer1Data.ladder.wos.currentRating;
            losingPlayer1Data = db.getFemale(losingPlayer1DocId).data();
            loser1 = losingPlayer1Data.id.forename + " " + losingPlayer1Data.id.surname;
            losingPlayer1CurrentRating = losingPlayer1Data.ladder.wos.currentRating;
        }

        if (matchType === "med" || matchType === "mid" || matchType === "wod") {
            // doubles
            winningTeamAvgRating = Math.round((winningPlayer1CurrentRating + winningPlayer2CurrentRating) / 2);
            losingTeamAvgRating = Math.round((losingPlayer1CurrentRating + losingPlayer2CurrentRating) / 2);
            pointsWonOrLost = ratingDelta(winningTeamAvgRating, losingTeamAvgRating);
            //pointsWonOrLost = Math.round(delta / 2);
        } else {
            // singles
            pointsWonOrLost = ratingDelta(winningPlayer1CurrentRating, losingPlayer1CurrentRating);
        }

        db.openBatch();
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

        var when = new Date();
        if (wp2 === null) {
            // singles match


            // update match submission log
            log = {
                "submitter": submitter,
                "winner": winner1,
                "loser": loser1,
                "delta": pointsWonOrLost,
                "when": when
            }
            logUpdated = db.updateSubmissionLog(log, matchType);

            //return [Promise.all([wp1, lp1]), pointsWonOrLost];
            return [db.commitBatch(),pointsWonOrLost];

        } else {
            // doubles match

            log = {
                "submitter": submitter,
                "winner1": winner1,
                "winner2": winner2,
                "loser1": loser1,
                "loser2": loser2,
                "delta": pointsWonOrLost,
                "when": when
            }
            logUpdated = db.updateSubmissionLog(log, matchType);

            //return [Promise.all([wp1, wp2, lp1, lp2, logUpdated]), pointsWonOrLost];
            return [db.commitBatch(),pointsWonOrLost];

        }
    }

    return {
        validMatch: validMatch,
        updateMatchStats: updateMatchStats
    };
})();