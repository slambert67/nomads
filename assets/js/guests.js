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
            var guestTimestamp;

            $("#addguest").on("click", function () {
                var guest = $("#addguestform").toObject();
                db.addGuest(guest);
            });

            $("#canceladdguest").on("click", function () {
                $("#addguestform").addClass("hide");
            });

            $("#bookslot").on("click", function () {
                $("#addguestform").removeClass("hide");
            });

            var globs = db.getGlobals();
            globs.forEach(function (doc) {
                numGuestsAllowed = doc.data().num_guests_allowed;
                guestTimestamp = doc.data().guest_date;//.to_date().to_String().substr(1,16);
            });
            var guestDate = guestTimestamp.toDate().toString().substr(0,16); 
            $("#slotsmsg").html("We have " + numGuestsAllowed + " slots available for " + guestDate);
           
            // guests already booked
            var templateSrc = $("#guestsTemplate").html();
            var template = Handlebars.compile(templateSrc);
            var html;

            var context;
            var guest;
            var guests = db.getGuests();
            if ( guests.size == 0) {
                $("#guestsbooked").append('<div class="central">None</div>');
            } else {
                guests.forEach(function (doc) {
                    guest = doc.data();
                    context = { "guest": guest };
                    html = template(context);
                    $("#guestsbooked").append(html);
                });  
            }

            if (guests.size < numGuestsAllowed) {
                $("#bookslot").css("display:flex");
            } else {
                $("#bookslot").css("display:none");
            }
          
            /*var globs = db.getGlobals();
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
            }); */
        }
    );
});