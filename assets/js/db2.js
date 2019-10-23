var db2 = (function () {

    var males;

    function init() {
        console.log("calling initialize app");
        firebase.initializeApp({
            apiKey: 'AIzaSyDxgEiXAJEvXAA4CDsF1yXlQaIczU3skgo',
            authDomain: 'nomads-d85b5.firebaseapp.com',
            projectId: 'nomads-d85b5'
        });
        console.log("called initialize app");

        fdb = firebase.firestore();

        fdb.settings({
            timestampsInSnapshots: true
        }); 
        console.log("initialised");
    }

    function auth() {
        var email = "steve.lambert67@gmail.com";
        var password = "514725";

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                console.log("auth error");
            });
    }

    function getData() {
        console.log("in get data");
        var m = fdb.collection("members")
            .where("id.gender", "==", "M")
            .get()
            .then(
                // fulfillment handler
                function (myData) {
                    console.log("data retrieved");
                    males = myData;
                },

                // rejection handler
                function (err) {
                    console.error("get males error");
                }
            );
        console.log("leaving getdata");
        return m;
    }

    function getMales() {
        return males;
    }

    return {
        init: init,
        auth: auth,
        getData: getData,
        getMales: getMales
    }
})();
