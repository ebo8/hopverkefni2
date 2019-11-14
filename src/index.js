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
    const filter = new Filter(false, false, false);
    list = new List(isLecturePage, 'frontpage', filter);
    list.load();
    initButtons();
    makeheader('Fyrirlestrar', 'Vefforitun', '../img/header.jpg');
  }

  function makeheader(header, text, image) {

    const headerContainer = document.querySelector('header');
    console.log(headerContainer);
    const div = list.createElement('div', 'header', 'none');
    const headerp = list.createElement('p', 'header__p', text);
    const headerh = list.createElement('h1', 'header__header', header);
    div.appendChild(headerp);
    div.appendChild(headerh);

    const imgURL = "url(" + image + ")";
    headerContainer.style.backgroundImage = imgURL;
    headerContainer.appendChild(div);
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
    list.filter.toggleFilterOnOff();
    list.load();
  }
});
