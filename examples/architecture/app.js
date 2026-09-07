const projectDialog = document.querySelector('dialog');
const openProject = document.querySelector('[data-open]');
if (typeof projectDialog.showModal === 'function') {
  openProject.hidden = false;
  openProject.addEventListener('click', () => projectDialog.showModal());
  document.querySelector('.close').addEventListener('click', () => projectDialog.close());
  projectDialog.addEventListener('click', event => {
    const rect = projectDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close();
  });
}
