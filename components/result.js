import CheckBlockComponent from "./check-block.js";

export default class ResultComponent extends HTMLElement {
  constructor(selected) {
    super();

    var input = document.getElementById(selected + "_input");

    if (input) {
      this.initializeData(input.value);
    } else {
      // PENDIENTE DE BORRARSE
      this.result = {
        ontology_URI: "https://w3id.org/blah",
        ontology_title: "Smart cities BLAH",
        overall_score: 0.5,
        checks: [
          {
            id: "SOME ID",
            category_id: "Findable",
            principle_id: "F1.1",
            status: "error",
            Status_score: 0.6,
            explanation: "this is a text explaining the result",
            affected_elements: ["URI1", "URI2"],
          },
          {
            id: "SOME ID",
            category_id: "Findable",
            principle_id: "F1.1",
            status: "error",
            Status_score: 0.6,
            explanation: "this is a text explaining the result",
            affected_elements: ["URI1", "URI2"],
          },
          {
            id: "SOME ID 2",
            category_id: "Findable",
            principle_id: "R1",
            status: "unknown",
            Status_score: 0.8,
            explanation: "this is a text explaining the result",
          },
          {
            id: "SOME ID 3",
            category_id: "Accesible",
            principle_id: "R1",
            status: "unknown",
            Status_score: 0.8,
            explanation: "this is a text explaining the result",
          },
        ],
      };
      this.orderChecks();
    }
  }

  initializeData(input_value) {
    this.result = this.getResults(input_value);
    this.orderChecks();
  }

  rlog(){
    console.log("SE EJECUTA")
  }

  getResults(input_value) {
    return {
      ontology_URI: "https://w3id.org/blah",
      ontology_title: "Smart cities BLAH",
      overall_score: 0.5,
      checks: [
        {
          id: "SOME ID",
          category_id: "Findable",
          principle_id: "F1.1",
          status: "error",
          Status_score: 0.6,
          explanation: "this is a text explaining the result",
          affected_elements: ["URI1", "URI2"],
        },

        {
          id: "SOME ID 2",
          category_id: "Findable",
          principle_id: "R1",
          status: "unknown",
          Status_score: 0.8,
          explanation: "this is a text explaining the result",
        },
      ],
    };
  }

  orderChecks(){
      this.findable_checks = this.result.checks.filter(check => check.category_id == "Findable");
  }

  render() {
    return`
          <div id="result_block" class="mt-5">

            <!-- Titulo -->
            <div class="row">
                <div class="col-6">
                    <span class="texto3">Results</span>
                </div>
            </div>

            <!-- INFO -->
            <div class="row mt-3">
                <div class="col-12 caja">
                    <!-- Title -->
                    <info-line title="Title:" data="` 
                    + this.result.ontology_title +
                    `"></info-line>
                    <info-line title="URI:" data="` 
                    + this.result.ontology_URI +
                    `"></info-line>
                    <info-line title="License:" data="W3C"
                    ></info-line>
                    
                    <!-- URI -->
                </div>
            </div>

            <!-- GRAFICAS -->

            <!-- CHECKS -->
            <check-block title="Findable" checks="`+this.findable_checks+`"></check-block>


        </div>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.render();
  }
}
