(function () {
  const modal = document.querySelector("#modal");
  const modalOverlay = document.querySelector("#modal-overlay");
  const closeButton = document.querySelector("#close-button");
  const createGoal = document.getElementById("create-goal");

  createGoal.addEventListener('mouseover', () => {
    createGoal.classList += ' show';
  })

  closeButton.addEventListener("click", () => {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });

  createGoal.addEventListener("click", () => {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });
})();
