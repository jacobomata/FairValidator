


export default class CheckBlockComponent extends HTMLElement {
    constructor(checks, title) {
        super();
        this.checks = checks;
        this.title = title;
        this.orderPrinciples();
    }

    orderPrinciples(){
        console.log(this.checks);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="row caja">
            <div class="col-10">
                <span class="texto5">`
                    + this.title +
                `</span>
            </div>
        </div>
        <div class="row caja">
        
        
        </div>
        `
    }
}