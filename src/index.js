import List from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  const url = new URL(window.location);
  const slug = url.searchParams.get('slug');

  if (isLecturePage) {
<<<<<<< HEAD
    const list = new List(isLecturePage);
    console.log(list.container);
    list.fetchData();
=======
    const lecpage = new List(isLecturePage, slug);
    lecpage.fetchData();
>>>>>>> 713a2958809ecf72c59a641b52579e29cfc98747

  } else {
    const list = new List(isLecturePage, 'frontpage');
    list.load();
  }

});
