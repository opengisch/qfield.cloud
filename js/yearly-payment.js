$(function () {
  "use strict";

  /* ==========================================================================
       yearly payments request
     ========================================================================== */
  const MONTHLY_USER = 16;
  const MONTHLY_GB = 5;
  const SETUP_FEE = 150;

  const users = $("#users");
  const storage = $("#storage");
  const costs = $("#costs");
  const setup = $("#setup");
  const iframe = $("#request-form");

  function updateCosts() {
    const users_val = users.val();
    const storage_val = storage.val();

    const total =
    SETUP_FEE + (Math.max(users_val, 2) * MONTHLY_USER +
        Math.max(storage_val - 1, 0) * MONTHLY_GB) *
      12;
    
    setup.val(SETUP_FEE + " €");
    costs.val(total + " €");
  }

  function updateForm() {
    const users_val = users.val();
    const storage_val = storage.val();

    const form_url =
      "https://forms.clickup.com/2192114/f/22wqj-21867/FV88S70BQG7ERZ65R9?";
    const params = `monthly_gb_price=${MONTHLY_GB}&monthly_user_price=${MONTHLY_USER}&setup_fee=${SETUP_FEE}&Total%20GB%20needed=${storage_val}&Number%20of%20collaborators=${users_val}`;
    const url = form_url + params;
    iframe.attr("src", url);
    console.log(url);
  }

  users.on("input", function () {
    updateCosts();
  });

  storage.on("input", function () {
    updateCosts();
  });

  $("#calculatorModal").modal("show");
  $("#calculatorModal").on("click", ".btn-primary", function () {
    updateForm();
    $("#calculatorModal").modal("hide");
  });
});
