"use strict";
function loadPage(pwd) {
    var hash = sha256(pwd); // Assuming you have a SHA-256 hashing function available
    var url = hash + "/index.html";
    $.ajax({
        url: url,
        dataType: "html",
        success: function (data) {
            window.location = url;
        },
        error: function (xhr, ajaxOptions, thrownError) {
            parent.location.hash = hash;
            $("#password").attr("placeholder", "wrong password");
            $("#password").val("");
        }
    });
}
$("#loginbutton").on("click", function () {
    loadPage($("#password").val());
});
$("#password").keypress(function (e) {
    if (e.which == 13) {
        loadPage($("#password").val());
    }
});
$("#password").focus();