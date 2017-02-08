const yotiBtn = document.getElementById('yotiBtn');
yotiBtn.addEventListener('click', () => {
  const content = document.getElementById('yoti-info__content');
  console.log('content', content);
  content.classList += ' animated zoomOut';
})
