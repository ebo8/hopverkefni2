import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  const url = new URL(window.location);
  const slug = url.searchParams.get('slug');

  if (isLecturePage) {
<<<<<<< HEAD
    const lecpage = new List();
    lecpage.load();
=======
>>>>>>> b02896292bb3bf07fc784413c874696c618a6833

  } else {
    const list = new List(isLecturePage);
    list.load();
  }

});
