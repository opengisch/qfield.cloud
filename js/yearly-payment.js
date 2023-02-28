$(function () {
  "use strict";

  /* ==========================================================================
       yearly payments request
     ========================================================================== */
  const MONTHLY_USER = 16;
  const MONTHLY_GB = 5;

  const users = $("#users");
  const storage = $("#storage");
  const costs = $("#costs");

  function updateCosts() {
    const users_val = users.val()
    const storage_val = storage.val()
    const total = (users_val * MONTHLY_USER + (storage_val - 1) * MONTHLY_GB) * 12;
    costs.val(total);
  }

  users.change(function () {
    updateCosts();
  });

  storage.change(function () {
    updateCosts();
  });
});
