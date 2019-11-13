import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let allLecturesObj;

  if (isLecturePage) {

  } else {
    const list = new List();
    console.log(list);
    list.load();

    // console.log(allLecturesObj);
  }

});
