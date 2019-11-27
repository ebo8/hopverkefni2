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
    const div = this.createElement('div', 'videoWrapper', 'none');
    const video = this.createElement('iframe', 'video', 'none');
    video.src = link;
    div.classList.add('col-8');
    div.appendChild(video);
    main.appendChild(div);
  }

  makeText(text) {
    const main = document.querySelector('main');
    const div = this.createElement('div', 'textWrapper', 'none');
    const textValue = this.createElement('p', 'lectureText', text);
    div.classList.add('col-8');
    div.appendChild(textValue);
    main.appendChild(div);
  }

  makeImage(image, caption) {
    const main = document.querySelector('main');
    const figure = this.createElement('figure', 'lectureImg', 'none');
    const img = this.createElement('img', 'lectureImg', 'none');
    img.src = image;
    const imgcap = this.createElement('figcaption', 'lectureImg', caption);
    figure.classList.add('col-8');
    figure.appendChild(img);
    figure.appendChild(imgcap);
    main.appendChild(figure);
  }

  makeQuote(quote, attribute) {
    const main = document.querySelector('main');
    const quoteContainer = this.createElement('div', 'quote', 'none');
    const quoteText = this.createElement('p', 'quote--text', quote);
    const cite = this.createElement('q', 'quote--cite', attribute);
    quoteContainer.classList.add('col-8');
    quoteContainer.appendChild(quoteText);
    quoteContainer.appendChild(cite);
    main.appendChild(quoteContainer);
  }

  makelectureHeading(text) {
    const main = document.querySelector('main');
    const heading = this.createElement('h2', 'lectureh2', text);
    heading.classList.add('col-8');
    main.appendChild(heading);
  }

  makeList(data) {
    const main = document.querySelector('main');
    const list = this.createElement('ul', 'lectureList', 'none');
    list.classList.add('col-8');
    for (let i = 0; i < data.length; i += 1) {
      const listElement = this.createElement('li', 'lectureList--li', data[i]);
      list.appendChild(listElement);
    }
    main.appendChild(list);
  }

  makeCode(data) {
    const main = document.querySelector('main');
    const codeContainer = this.createElement('pre', 'CodeContainer', 'none')
    const code = this.createElement('code', 'lectureCode', data);
    codeContainer.classList.add('col-8');
    codeContainer.appendChild(code);
    main.appendChild(codeContainer);
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
    const buttonContainer = this.createElement('div', 'buttonContainer', 'none');
    const slugger = window.location.search;
    const done = localStorage.getItem(slugger);
    const button = this.createElement('button', 'lectureButton', 'Klára fyrirlestur');
    if (done === 'yes') {
      button.textContent = '✓ Fyrirlestur kláraður';
      button.classList.add('lectureButton--checked');
    }
    const backButton = this.createElement('button', 'backButton', 'Til baka');
    buttonContainer.appendChild(button);
    buttonContainer.appendChild(backButton);
    main.appendChild(buttonContainer);
    button.addEventListener('click', function() {
      console.log(window.location.search);
      event.target.classList.toggle('lectureButton--checked');
      if (event.target.textContent === 'Klára fyrirlestur') {
        event.target.textContent = '✓ Fyrirlestur kláraður'; 
      localStorage.setItem(slugger, 'yes');
      }
      else {
        event.target.textContent = 'Klára fyrirlestur';
        localStorage.setItem(slugger, 'no');
      }
      });
      backButton.addEventListener('click', function() { 
        location.href = 'index.html?slug=';
      })
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
      const slugger = localStorage.getItem('?slug=' + data.lectures[i].slug);
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
      //box.appendChild(category);
      //test
      const container = this.createElement('div', 'box--heading--container', 'none');
      const lesserContainer = this.createElement('div', 'box--heading--category', 'none');
      const heading = this.createElement('div', 'box--heading', data.lectures[i].title);
      lesserContainer.appendChild(category);
      lesserContainer.appendChild(heading);
      //box.appendChild(heading);
      container.appendChild(lesserContainer);
      box.appendChild(container);

      if(slugger === 'yes') {
        const sluggo = this.createElement('div', 'box--checked', '✓');
        container.appendChild(sluggo);
      }

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