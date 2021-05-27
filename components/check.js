export default class CheckComponent extends HTMLElement {
    constructor(check) {
      super();
      this.check = check;
    }
  
  
    connectedCallback() {
      this.innerHTML =
        `
      <div class="row my-3">
          <div class="col-2 d-flex align-items-center">
              <span class="texto4">` 
              + this.check.Status_score +
              `</span>
          </div>
          <div class="col-10">
              <div class="caja-texto pl-2">
                  <span class="texto4">` 
                  + this.check.explanation +
                  `</span>
              </div>
          </div>
      </div>
      `;
    }
  }