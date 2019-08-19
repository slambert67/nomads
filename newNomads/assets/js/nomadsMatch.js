var match = (function () {

    function validMatch(t1p1, t1p2, t2p1, t2p2) {

        // all players must be different!
        if ( t1p1 != t1p2) {
            if ( t2p1 != t1p2 ) {
                if ( t2p2 != t2p1) {
                    return true;}}}
        return false;
    }

    function updatePlayerStats(t1p1DocId, t1p2DocId, t2p1DocId, t2p2DocId) {

        /*var member = db.getMember(t1p1DocId);
        var memberData = member.data();
        var newRating = memberData.ladder.med.currentRating + 50;
        memberData.ladder.med.currentRating = newRating;
        db.updateMember(t1p1DocId, memberData);
        console.log("hello");*/

        // winner
        var t1p1 = db.getMember(t1p1DocId);
        var t1p1Data = t1p1.data();
        var t1p1OldRating = t1p1Data.ladder.med.currentRating;
        var t1p1TransformedRating = Math.pow(10,(t1p1OldRating / 400));

        // loser
        var t2p1 = db.getMember(t2p1DocId);
        var t2p1Data = t2p1.data();
        var t2p1OldRating = t2p1Data.ladder.med.currentRating;
        var t2p1TransformedRating = Math.pow(10, (t2p1OldRating / 400));

        var t1p1ExpectedScore = t1p1TransformedRating / (t1p1TransformedRating + t2p1TransformedRating);
        var t2p1ExpectedScore = t2p1TransformedRating / (t2p1TransformedRating + t1p1TransformedRating); 

        var t1p1NewRating = t1p1OldRating + (32 * (1 - t1p1ExpectedScore));
        var t2p1NewRating = t2p1OldRating + (32 * (0 - t2p1ExpectedScore)); 

        console.log("t1p1 new rating = " + t1p1NewRating);
        console.log("t2p1 new rating = " + t2p1NewRating); 
    }

    return {
        validMatch: validMatch,
        updatePlayerStats: updatePlayerStats
    };
})();