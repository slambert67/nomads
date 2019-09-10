// jquery plugin
(function ($) {
    $.fn.extend({
        //new jquery function
        toObject: function () {  // serializes elements into object
            var result = {};
            // $. denotes jquery utility function eg. $.each
            // serializeArray() returns an array where each form field consists of a name and a value
            $.each(this.serializeArray(), function (i, v) {
                result[v.name] = v.value;
            });
            return result;
        },
        fromObject: function (obj) {  // de-serializes object into elements
            // determine relevant form fields
            $.each(this.find(':input'), function (i, v) {
                var name = $(v).attr('name');
                if (obj[name]) {
                    $(v).val(obj[name]);
                } else {
                    $(v).val('');
                }
            });
        }
    });
}
)(jQuery);

var ad = (function () {

    function resetStats(doc,pLadder) {
        
        var playerData = doc.data();
        playerData.ladder[pLadder].currentRating = 1500;
        playerData.ladder[pLadder].won = 0;
        playerData.ladder[pLadder].lost = 0;

        db.updateMember(doc.id, playerData);
    }

    return {
        resetStats: resetStats
    }
})();

jQuery(document).ready(function ($) {

    db.init()
    .then (

        function() {

            $("#addmember").on("click", function () {

                var member = $("#addmemberform").toObject();

                var newMember = {
                    "contact": { "address": {} },
                    "id": {},
                    "ladder": {}
                };
                newMember.contact.address.houseNumber = member.houseNumber;
                newMember.contact.address.street = member.street;
                newMember.contact.address.area = member.area;
                newMember.contact.address.city = member.city;
                newMember.contact.address.postcode = member.postcode;
                newMember.contact.email = member.email;
                newMember.contact.landline = member.landline;
                newMember.contact.mobile = member.mobile;

                newMember.id.forename = member.forename;
                newMember.id.surname = member.surname;
                newMember.id.middleName = member.middleName;

                var mid = { "currentRating": 1500, "lost": 0, "won": 0 };
                newMember.ladder.mid = mid;
                switch (member.gender) {
                    case "m":
                    case "M":
                        newMember.id.gender = "M";
                        var med = { "currentRating": 1500, "lost": 0, "won": 0 };
                        var mes = { "currentRating": 1500, "lost": 0, "won": 0 };
                        newMember.ladder.med = med;
                        newMember.ladder.mes = mes;
                        break;
                    case "f":
                    case "F":
                        newMember.id.gender = "F";
                        var wod = { "currentRating": 1500, "lost": 0, "won": 0 };
                        var wos = { "currentRating": 1500, "lost": 0, "won": 0 };
                        newMember.ladder.wod = wod;
                        newMember.ladder.wos = wos;
                        break;
                    default:
                        break;
                }
                db.addMember(newMember);
            });

            $("#resetmed").on("click", function () {
                var males = db.getMales();
                males.forEach(function (doc) {
                    ad.resetStats(doc,"med");
                });
            });
        }
    );

});