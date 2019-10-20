jQuery(document).ready(function ($) {

    firebase.initializeApp({
        apiKey: 'AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo',
        authDomain: 'nomads-d85b5.firebaseapp.com',
        projectId: 'nomads-d85b5'
    });

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> auth added
    $("#submitemail").on("click", function () {

        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: 'http://slambert67.github.io/nomads/members.html',
            // This must be true.
            handleCodeInApp: true
            /*iOS: {
                bundleId: 'com.example.ios'
            },
            android: {
                packageName: 'com.example.android',
                installApp: true,
                minimumVersion: '12'
            },
            dynamicLinkDomain: 'example.page.link'*/
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
            });

    });
<<<<<<< HEAD
=======

>>>>>>> wip
=======
>>>>>>> auth added
});