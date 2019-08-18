var match = (function () {

    function validMatch(t1p1, t1p2, t2p1, t2p2) {

        // all players must be different!
        if ( t1p1 != t1p2) {
            if ( t2p1 != t1p2 ) {
                if ( t2p2 != t2p1) {
                    return true;}}}
        return false;
    }

    return {
        validMatch: validMatch
    };
})();