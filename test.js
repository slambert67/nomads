(function() {

    firebase.database().ref('subscription-entries').push().set({"firstname":"steve", "lastname":"lambert"})
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });

})();
    
