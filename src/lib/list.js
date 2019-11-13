import { empty } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
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
        this.display(data);
        // displayCompany(data.results);
      })
      .catch((error) => {
        // removeLoadingContainer();
        // displayError('Villa við að sækja gögn');
        /*  eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(error);
      });
  }

  display(data) {
    // var drasl = JSON.parse(data);
    for (var i = 0; i < data.lectures.length; i += 1) {
      const boxContainer = this.createElement('div', 'col', 'none');
      boxContainer.classList.add('col-4', 'col-sm-12');

      const box = this.createElement('div', 'box', 'none');
      boxContainer.appendChild(box);

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
//
// <div class="col col-4 col-sm-12">
//   <div class="box">
//     <img class="box--img" src="img/thumb1.jpg" alt="">
//     <div class="box--category">HTML</div>
//     <div class="box--heading">Sagan</div>
//   </div>
// </div>
