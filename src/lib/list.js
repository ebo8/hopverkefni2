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

    const imgURL = 'url(' + image + ')';
    headerContainer.style.backgroundImage = imgURL;
    headerContainer.appendChild(div);
  }

  makeYoutube(link) {
    const main = document.querySelector('main');
    const div = this.createElement('div', 'video', 'none');
    const video = this.createElement('iframe', 'video', 'none');
    video.src = link;
    div.appendChild(video);
    main.appendChild(div);
  }

  makeText(text) {
    const main = document.querySelector('main');
    const textValue = this.createElement('p', 'lectureText', text);
    main.appendChild(textValue);
  }

  makeImage(image, caption) {
    const main = document.querySelector('main');
    const figure = this.createElement('figure', 'lectureImg', 'none');
    const img = this.createElement('img', 'lectureImg', 'none');
    img.src = image;
    const imgcap = this.createElement('figcaption', 'lectureImg', caption);
    figure.appendChild(img);
    figure.appendChild(imgcap);
    main.appendChild(figure);
  }

  makeQuote(quote, attribute) {
    const main = document.querySelector('main');
    const quoteContainer = this.createElement('div', 'quote', 'none');
    const quoteText = this.createElement('p', 'quote--text', quote);
    const cite = this.createElement('q', 'quote--cite', attribute);
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(cite);
    main.appendChild(quoteContainer);
  }

  makelectureHeading(text) {
    const main = document.querySelector('main');
    const heading = this.createElement('h2', 'lectureh2', text);
    main.appendChild(heading);
  }

  makeList(data) {
    const main = document.querySelector('main');
    const list = this.createElement('ul', 'lectureList', 'none');
    for (let i = 0; i < data.length; i += 1) {
      const listElement = this.createElement('li', 'lectureList--li', data[i]);
      list.appendChild(listElement);
    }
    main.appendChild(list);
  }

  makeCode(data) {
    const main = document.querySelector('main');
    const code = this.createElement('code', 'lectureCode', data);
    main.appendChild(code);
  }

  displayLecture(data) {
    for (let i = 0; i < data.lectures.length; i += 1) {
      if (data.lectures[i].slug === this.lectureName) {
        this.makeheader(data.lectures[i].title, data.lectures[i].category, data.lectures[i].image);
        for (let j = 0; j < data.lectures[i].content.length; j += 1) {
          if (data.lectures[i].content[j].type === 'youtube') {
            this.makeYoutube(data.lectures[i].content[j].data);
          } else if (data.lectures[i].content[j].type === 'text') {
            this.makeText(data.lectures[i].content[j].data);
          } else if (data.lectures[i].content[j].type === 'image') {
            this.makeImage(data.lectures[i].content[j].data, data.lectures[i].content[j].caption);
          } else if (data.lectures[i].content[j].type === 'quote') {
            this.makeQuote(data.lectures[i].content[j].data, data.lectures[i].content[j].attribute);
          } else if (data.lectures[i].content[j].type === 'heading') {
            this.makelectureHeading(data.lectures[i].content[j].data);
          } else if (data.lectures[i].content[j].type === 'list') {
            this.makeList(data.lectures[i].content[j].data);
          } else if (data.lectures[i].content[j].type === 'code') {
            this.makeCode(data.lectures[i].content[j].data);
          }
        }
      }
    }
    const main = document.querySelector('main');
    const button = this.createElement('button', 'lectureButton', 'Klára fyrirlestur');
    main.appendChild(button);
    const backButton = this.createElement('button', 'backButton', 'Til baka');
    main.appendChild(backButton);
  }

  display(data) {
    for (let i = 0; i < data.lectures.length; i += 1) {
      if (this.filter.filterEnabled === true
        && this.filter[data.lectures[i].category] === false) {
        continue;
      }

      const boxContainer = this.createElement('div', 'col', 'none');
      boxContainer.classList.add('col-4', 'col-sm-12');

      const lectureUrl = 'fyrirlestur.html?slug=' + data.lectures[i].slug;

      const box = this.createElement('div', 'box', 'none');
      boxContainer.appendChild(box);
      box.style = 'cursor: pointer;';
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
  }

  createElement(type, className, text) {
    const tempElement = document.createElement(type);
    tempElement.classList.add(className);
    if (text !== 'none') {
      tempElement.innerText = text;
    }
    return tempElement;
  }
}
