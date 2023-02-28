$(function () {
  "use strict";

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
