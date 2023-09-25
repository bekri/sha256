"use strict";

$(document).ready(function() {
  $("#loginbutton").on("click", function() {
    var password = $("#password").val();
    loadPage(password);
  });

  $("#password").keypress(function(e) {
    if (e.which == 13) {
      var password = $("#password").val();
      loadPage(password);
    }
  });

  $("#password").focus();
});

function loadPage(pwd) {
  var url = sha256Async(pwd) + "/index.html";
  $.ajax({
    url: url,
    dataType: "html"
  })
    .done(function(data) {
      window.location.href = url;
    })
    .fail(function(xhr, ajaxOptions, thrownError) {
      parent.location.hash = sha256Async(pwd);
      $("#password").attr("placeholder", "wrong password").val("");
    });
}

function sha256Async(pwd) {
  return new Promise(function(resolve, reject) {
    sha256(pwd, function(hash) {
      resolve(hash);
    });
  });
}