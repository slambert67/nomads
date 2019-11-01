jQuery(document).ready(function ($) {

    db2.init();
    console.log("db2 initialised");

    db2.auth()
    .then (
        function(){
            console.log("authorised");

            db2.getData()
            .then (
                function() {
                    console.log("successfully got data");

                    var aothmales = db2.getMales();
                    console.log("got males");
                },
                function () {
                    console.log("failed to get data");
                },               
            );
        },
        function(){
            console.log("authorisation error");
        }
    );


    $("#submitcred").on("click", function () {


        /*var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'http://slambert67.github.io/nomads/members.html',
            // This must be true.
            handleCodeInApp: true

        };

        var email = $("#email").val();
        console.log("email = " + email);

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
            .then(function () {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                console.log("link successfully sent");
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function (error) {
                // Some error occurred, you can inspect the code: error.code
            });*/

        var email = $("#email").val();
        var password = $("#userpwd").val();

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("create user error");
            // ...
        });
        console.log("user created");

    });

    $("#signin").on("click", function () {
        var email = $("#email").val();
        var password = $("#userpwd").val();

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log("sign in error");
        });
        console.log("user signed in");
    });

    $("#signout").on("click", function () {
        var email = $("#email").val();
        var password = $("#userpwd").val();

        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("signed out");
        }).catch(function (error) {
            // An error happened.
            console.log("error signing out");
        });
        console.log("user signed out");
    });

});