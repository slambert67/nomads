$(document).ready(function () {

    $("#ladderBtn").bind( "click",
                          function (event) {
                            console.log("hello");
                            $("#main").load("http://localhost:8080/test.html");
                          });
});