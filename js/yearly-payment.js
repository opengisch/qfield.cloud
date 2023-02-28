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
    
    const total = (Math.max(users_val, 2) * MONTHLY_USER + Math.max((storage_val - 1), 1) * MONTHLY_GB) * 12;
    costs.val(total);
  }

  users.on('input', function () {
    updateCosts();
  });

  storage.on('input', function () {
    updateCosts();
  });
});
