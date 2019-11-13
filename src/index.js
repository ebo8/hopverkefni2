import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  const url = new URL(window.location);
  const param = new URLSearchParams(url.search);
  console.log(page);
  console.log(param);
  console.log(url);

  if (isLecturePage) {
    const list = new List(isLecturePage);
    list.load();

  } else {
    const list = new List(isLecturePage);
    list.load();
  }

});
