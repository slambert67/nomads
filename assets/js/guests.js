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

            $("#addguest").on("click", function () {
                var guest = $("#addguestform").toObject();
                db.addGuest(guest);
            });

            var globs = db.getGlobals();
            globs.forEach( function(doc) {
                console.log("num guests allowed = " + doc.data().num_guests_allowed);
            });

            var context = { "guests": [] };
            guests = db.getGuests();
            guests.forEach(function (doc) {
                context.guests.push(doc.data());
            }); 
            var templateSrc = $("#guestsTemplate").html();
            var template = Handlebars.compile(templateSrc);
            var html = template(context);
            $("#guestlist").html(html);  
        }
    );
});