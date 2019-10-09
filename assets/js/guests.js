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

jQuery(document).ready(function ($) {

    db.init()
    .then (

        function() {

            var numGuestsAllowed;

            $("#addguest").on("click", function () {
                var guest = $("#addguestform").toObject();
                db.addGuest(guest);
            });

            var globs = db.getGlobals();
            globs.forEach( function(doc) {
                numGuestsAllowed = doc.data().num_guests_allowed;
                console.log("num guests allowed = " + numGuestsAllowed);
            });

            for (i=1; i<=numGuestsAllowed; i++) {
                $("#" + "slot" + i).removeClass("hide");
            }

            var templateSrc = $("#guestsTemplate").html();
            var template = Handlebars.compile(templateSrc);
            var html;

            var context;
            var guest;
            var guests = db.getGuests();
            var i=0;
            guests.forEach(function (doc) {
                i++;
                guest = doc.data();
                context = {"guest": guest};
                html = template(context);
                $("#" + "slot" + i).removeClass("hide");
                $("#" + "slot" + i).html(html);
            }); 
        }
    );
});