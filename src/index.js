import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let allLecturesObj;

  const url = new URL(window.location);
  const param = new URLSearchParams(url.search);
  console.log(page);
  console.log(param);
  console.log(url);

  if (isLecturePage) {
    console.log('hér');

  } else {
    const list = new List();
    console.log(list);
    list.load();

    // console.log(allLecturesObj);
  }

});
