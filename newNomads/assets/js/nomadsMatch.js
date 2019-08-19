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

        var member = db.getMember(t1p1DocId);
        var memberData = member.data();
        var newRating = memberData.ladder.med.currentRating + 50;
        memberData.ladder.med.currentRating = newRating;
        db.updateMember(t1p1DocId, memberData);
        console.log("hello");
    }

    return {
        validMatch: validMatch,
        updatePlayerStats: updatePlayerStats
    };
})();