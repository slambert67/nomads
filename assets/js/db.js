    var db = (function () {
        var something = "cool";
        var another = [1, 2, 3];
        var fdb;

        function init() {
            firebase.initializeApp({
                apiKey: 'AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo',
                authDomain: 'nomads-d85b5.firebaseapp.com',
                projectId: 'nomads-d85b5'});  

            fdb = firebase.firestore();

            fdb.settings({
                timestampsInSnapshots: true});
            
        }
        
        function getMembers() {
            return fdb.collection("members").get();
         }

         function addMember() {
            var newMember = {};
            var vals = $("#addMember").serializeArray();

            newMember.id = {};
             newMember.id.forename = vals[0].value;
             newMember.id.middleName = vals[1].value;
             newMember.id.surname = vals[2].value;
             newMember.id.gender = vals[3].value;
            newMember.contact = {};
            newMember.contact.address = {};
             newMember.contact.address.houseNumber = vals[4].value;
             newMember.contact.address.street = vals[5].value;
             newMember.contact.address.area = vals[6].value;
             newMember.contact.address.city = vals[7].value;
             newMember.contact.address.postcode = vals[8].value;
             newMember.contact.email = vals[9].value;
             newMember.contact.landline = vals[10].value;
             newMember.contact.mobile = vals[11].value;
             newMember.ladder = {};
             newMember.ladder.mid = {currentRating: 'X'};
             if (newMember.id.gender == 'M') {
                 newMember.ladder.med = {currentRating: 'X'};
                 newMember.ladder.mes = {currentRating: 'X'};
             } else {
                 newMember.ladder.wod = {currentRating: 'X'};
                 newMember.ladder.wos = {currentRating: 'X'};                
             }

            console.log("new member: ", newMember);
            fdb.collection("members").add(newMember)
            .then ( function() {
                console.log("successful addition of member")
            })
            .catch ( function() {
                console("member addition failed");
            })
         }

         function hi() {
             alert("hello world");
         }

         return {
	        getMembers: getMembers,
            init: init,
            addMember: addMember,
            hi: hi
         };
      
    })();
