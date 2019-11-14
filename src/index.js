import List from './lib/list';
import Filter from './lib/filter.js';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  let list;

  if (isLecturePage) {
    const url = new URL(window.location);
    const slug = url.searchParams.get('slug');
    const lecpage = new List(isLecturePage, slug, nofilter);
    lecpage.fetchData();

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
    } else {
        list.filter[btnFilterType] = false;
    }
    list.load();
  }
});
