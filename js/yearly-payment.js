$(function () {
  "use strict";

  /* ==========================================================================
       yearly payments request
     ========================================================================== */
  const MONTHLY_USER = 18;
  // volume price applied to all users from VOLUME_USERS users on
  const MONTHLY_USER_VOLUME = 14;
  const VOLUME_USERS = 20;
  // price per 3GB of storage on top of the 1GB included per user
  const MONTHLY_GB = 5;
  const SETUP_FEE = 150;

  const users = $("#users");
  const included_storage = $("#included-storage");
  const storage = $("#storage");
  const costs = $("#costs");
  const costs_summary = $("#costs-summary");
  const setup = $("#setup");
  const iframe = $("#request-form");

  function userPrice(users_val) {
    return users_val >= VOLUME_USERS ? MONTHLY_USER_VOLUME : MONTHLY_USER;
  }

  function usersValue() {
    return Math.max(Number(users.val()), 1);
  }

  // additional storage is sold per 3GB.
  function storagePackages() {
    return Math.ceil(Math.max(Number(storage.val()), 0) / 3);
  }

  function totalPrice() {
    const users_val = usersValue();
    return (
      SETUP_FEE +
      (users_val * userPrice(users_val) + storagePackages() * MONTHLY_GB) * 12
    );
  }

  function updateCosts() {
    const users_val = usersValue();

    // each user includes 1GB.
    included_storage.val(users_val + " GB");
    setup.val(SETUP_FEE + " €");
    costs.val(totalPrice() + " €");
    costs_summary.text(`(${users_val} users, ${totalStorage()} GB)`);
  }

  function totalStorage() {
    return usersValue() + storagePackages() * 3;
  }

  function updateForm() {
    const users_val = usersValue();

    const form_url =
      "https://forms.clickup.com/2192114/f/22wqj-21867/FV88S70BQG7ERZ65R9?";
    const params = `monthly_data_package_price=${MONTHLY_GB}&monthly_user_price=${userPrice(users_val)}&setup_fee=${SETUP_FEE}&Number%20of%20Data%20Packages=${storagePackages()}&Total%20storage%20GB=${totalStorage()}&Number%20of%20collaborators=${users_val}&Total%20price%20%28excl%20VAT%29=${totalPrice()}`;
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

  updateCosts();
});
