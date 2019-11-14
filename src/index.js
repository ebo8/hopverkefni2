import List from './lib/list';
import Filter from './lib/filter.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let list;

  if (isLecturePage) {
<<<<<<< HEAD
    const list = new List(isLecturePage, slug);
    list.fetchData();
=======
    const url = new URL(window.location);
    const slug = url.searchParams.get('slug');
    const lecpage = new List(isLecturePage, slug, nofilter);
    lecpage.fetchData();
>>>>>>> 51042d12b9faab599c5eba3332eb72735b1c7741

  } else {
    const filter = new Filter(true, true, true);
    list = new List(isLecturePage, 'frontpage', filter);
    list.load();
    setTimeout(() => {
      list.filter.css = false;
      list.filter.html = false;
      list.filter.javascript = false;
    }, 1000);
    initButtons();
  }

  function initButtons() {
    const btnNodes = document.querySelectorAll('button');
    console.log(btnNodes);
    for (var i = 0; i < btnNodes.length; i += 1) {
      btnNodes[i].addEventListener("click", toggleBtn);
    }
  }

  function toggleBtn (e) {
    const btnFilterType = e.target.innerText.toLowerCase();
    if (list.filter[btnFilterType] === false) {
      list.filter[btnFilterType] = true;
      e.target.classList.add('button--enabled');
    } else {
        list.filter[btnFilterType] = false;
        e.target.classList.remove('button--enabled');
    }
    list.load();
  }
});
