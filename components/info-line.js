export default class InfoLineComponent extends HTMLElement {
  constructor() {
    super();
    this.inputData = this.getAttribute("inputData") || "";
    this.title = this.getAttribute("title") || "";
  }


  connectedCallback() {
    this.innerHTML =
      `
    <div class="row my-3">
        <div class="col-2 d-flex align-items-center">
            <span class="texto4">` 
            + this.title +
            `</span>
        </div>
        <div class="col-10">
            <div class="caja-texto pl-2">
                <span class="texto4">` 
                + this.inputData +
                `</span>
            </div>
        </div>
    </div>
    `;
  }
}
