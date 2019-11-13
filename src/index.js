import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let allLecturesObj;

  const url = new URL(window.location);
  const slug = url.searchParams.get('slug');

  if (isLecturePage) {
    const lecpage = new List();
    lecpage.load();

  } else {
    const list = new List();
    console.log(list);
    list.load();

    // console.log(allLecturesObj);
  }

});
