import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  const url = new URL(window.location);
  const slug = url.searchParams.get('slug');

  if (isLecturePage) {
    const lecpage = new List(isLecturePage, slug);
    lecpage.fetchData();

  } else {
    const list = new List(isLecturePage, 'frontpage');
    list.load();
  }

});
