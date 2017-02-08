(function () {
  const modal = document.querySelector("#modal");
  const modalOverlay = document.querySelector("#modal-overlay");
  const closeButton = document.querySelector("#close-button");
  const submit = document.getElementById("submit-url");

  closeButton.addEventListener("click", () => {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });

  submit.addEventListener("click", () => {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });
})();
