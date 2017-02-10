const yotiBtn = document.getElementById('yotiBtn');
yotiBtn.addEventListener('click', () => {
  const content = document.querySelector('.yoti-intro');
  const desc = document.querySelector('.yoti-description')
  desc.classList += ' animated fadeOut';
  content.classList += ' animated zoomOut';
})
