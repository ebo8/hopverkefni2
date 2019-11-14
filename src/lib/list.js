import { empty } from './helpers';

export default class List {

  constructor(isLecturePage, lectureName, filter) {
    this.container = document.querySelector('.list');
    this.isLecturePage = isLecturePage;
    this.lectureName = lectureName;
    this.filter = filter;
  }

  load() {
    empty(this.container);
    this.fetchData();
  }

  fetchData() {
    fetch('lectures.json')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa');
      })
      .then((data) => {
        if (this.isLecturePage) {
          this.displayLecture(data);
        } else {
            this.display(data);
        }
        // displayCompany(data.results);
      })
      .catch((error) => {
        // removeLoadingContainer();
        // displayError('Villa við að sækja gögn');
        /*  eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(error);
      });
  }

  makeheader(header, text, image) {

    const headerContainer = document.querySelector('header');
    const div = this.createElement('div', 'header', 'none');
    const headerp = this.createElement('p', 'header__p', text);
    const headerh = this.createElement('h1', 'header__header', header);
    div.appendChild(headerp);
    div.appendChild(headerh);

    const imgURL = "url(" + image + ")";
    headerContainer.style.backgroundImage = imgURL;
    headerContainer.appendChild(div);
  }

  makeYoutube(link) {
    const main = document.querySelector('main');
    const div = this.createElement('div', 'video', 'none');
    const video = this.createElement('iframe', 'video', 'none');
    video.src = link;
    div.appendChild(video);
    console.log(this);
    main.appendChild(div);
  }

  displayLecture(data) {
    console.log(this.lectureName);
    console.log(data.lectures[0].content);

    for(let i = 0; i < data.lectures.length; i += 1) {
      if(data.lectures[i].slug === this.lectureName) {
        this.makeheader(data.lectures[i].title, data.lectures[i].category, data.lectures[i].image);
      if(data.lectures[i].content[i].type === 'youtube') {
        this.makeYoutube(data.lectures[i].content[i].data);
      }
      }
    }
  }




  display(data) {
    for (var i = 0; i < data.lectures.length; i += 1) {
      if (this.filter.filterEnabled === true &&
          this.filter[data.lectures[i].category] === false) {
        continue;
      }

      const boxContainer = this.createElement('div', 'col', 'none');
      boxContainer.classList.add('col-4', 'col-sm-12');

      const lectureUrl = 'fyrirlestur.html?slug=' +data.lectures[i].slug;

      const box = this.createElement('div', 'box', 'none');
      boxContainer.appendChild(box);
      box.style = "cursor: pointer;"
      box.addEventListener('click', function() {
        location.href = lectureUrl;
      }, false);

      if (data.lectures[i].thumbnail != null) {
        const lectureThumbnail = this.createElement('img', 'box--img', 'none');
        lectureThumbnail.src = data.lectures[i].thumbnail;
        box.appendChild(lectureThumbnail);
      }

      const category = this.createElement('div', 'box--category', data.lectures[i].category);
      box.appendChild(category);

      const heading = this.createElement('div', 'box--heading', data.lectures[i].title);
      box.appendChild(heading);

      this.container.appendChild(boxContainer);

    }
    console.log(data);
  }

  createElement(type, className, text) {
    const tempElement = document.createElement(type);
    tempElement.classList.add(className);
    if (text != 'none') {
      tempElement.innerText = text;
    }
    return tempElement;
  }
}
