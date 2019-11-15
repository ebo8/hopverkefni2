export default class Filter {
  constructor(html, css, js) {
    this.html = html;
    this.css = css;
    this.javascript = js;
    this.filterEnabled = false;
  }

  toggleFilterOnOff() {
    if (this.html === false
        && this.css === false
        && this.javascript === false) {
      this.filterEnabled = false;
    } else {
      this.filterEnabled = true;
    }
  }
}
