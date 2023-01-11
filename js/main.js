$(function () {
  "use strict";

  /* ==========================================================================
       newsletter Form
       ========================================================================== */

  $("#mc-form").submit(function (e) {
    e.preventDefault(e);
    let formData = $(this).serialize();
    $.ajax({
      url: "https://opengis.us3.list-manage.com/subscribe/post-json?c=?",
      type: "POST",
      crossDomain: true,
      contentType: "application/json",
      data: formData,
      dataType: "json",
      success: function (data) {
        if (data.result == "error") {
          $("#mc-success").slideUp();
          $("#mc-error").html(data.msg);
          $("#mc-error").slideDown();
        } else {
          $("#mc-error").slideUp();
          $("#mc-success").html(data.msg);
          $("#mc-success").slideDown();
          $("#mc-form button").prop("disabled", true);
        }
      },
      error: function (xhr) {
        $("#mc-success").slideUp();
        $("#mc-error").slideDown();
      },
    });
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  /* ==========================================================================
       Smooth scroll
     ========================================================================== */

  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on("click", function (event) {
      if (
        location.pathname.replace(/^\//, "") ===
          this.pathname.replace(/^\//, "") &&
        location.hostname === this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");

        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 80,
            },
            1000
          );
          return false;
        }
      }
    });

  /* ==========================================================================
       yearly payments
     ========================================================================== */

  const tableWrapper = document.querySelector("#pricing");
  const switchInputs = document.querySelectorAll(".switch-wrapper input");
  const prices = tableWrapper.querySelectorAll("#pricing .price");
  const toggleClass = "hide";

  for (const switchInput of switchInputs) {
    switchInput.addEventListener("input", function () {
      for (const price of prices) {
        price.classList.add(toggleClass);
      }
      const activePrices = tableWrapper.querySelectorAll(
        `.price.${switchInput.id}`
      );
      for (const activePrice of activePrices) {
        activePrice.classList.remove(toggleClass);
      }
    });
  }

});