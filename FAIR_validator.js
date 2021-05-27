var selected = "URI";

function openInput(evt, elem) {
  // Declaramos las variable
  var i, tabcontent, tablinks;

  // Seleccionamos todos los elementos con selector-content y los ocultamos
  tabcontent = document.getElementsByClassName("selector-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Se elimina active de todos los selector
  tablinks = document.getElementsByClassName("selector");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Se muestra el contenido y se pone como active el contenido
  document.getElementById(elem).style.display = "flex";
  evt.currentTarget.className += " active";

  selected = elem;
}

function run() {
  result = getResults();

  loadInfo();

  loadCategory("Findable", result);

  showResults();
}

function showResults() {
  var resultBlock = document.querySelector("#test-results");
  resultBlock.style.display = "flex";
}

function getResults() {
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
        affected_elements: [],
      },
      {
        id: "SOME ID 3",
        category_id: "Accesible",
        principle_id: "R1",
        status: "unknown",
        Status_score: 0.8,
        explanation: "this is a text explaining the result",
        affected_elements: ["URI1"],
      },
    ],
  };
}

function loadInfo() {
  var title = document.getElementById("title");
}

function loadCategory(category, result) {
  var checks_div = document.getElementById(category + "-checks");
  checks_div.innerHTML = "";

  checks = getCategoryChecks(category, result);

  loadPrinciples(checks, checks_div);
}

function getCategoryChecks(category, result) {
  var checks = result.checks.filter((check) => check.category_id == category);

  return groupBy(checks, "principle_id");
}

function loadPrinciples(principles, checks_div) {
  for (let principle in principles) {
    var title = document.createElement("div");
    title.innerHTML = getPrincipleHTML(principle);
    checks_div.appendChild(title);
    loadChecks(principles[principle], checks_div);
  }
}

function loadChecks(checks, checks_div) {
  for (let i = 0; i < checks.length; i++) {
    var check = document.createElement("div");
    check.innerHTML = getCheckHTML(checks[i]);
    checks_div.appendChild(check);
  }
}

function getCheckHTML(check_info) {
  console.log(check_info);
  return (
    `
    <div class="col-12 p-0 caja-blanca mt-2">
      <div class="row m-0">
        <div class="col-8 d-flex align-items-center">
          <span class="texto-check">`
          + check_info.id +
          `</span>
        </div>
        <div class="col-2">`
        + getRadialScoreHTML(check_info.Status_score) +
        `</div>
        <div class="col-2">
        </div>
      </div>
      <div class="row m-0">
        <div class="row m-0">
          <p class="texto-explanation pt-3 pl-3">`
          + check_info.explanation +
          `</p>
        </div>
        <div class="col-12">
          <div class="row">
            <p class="texto-affected pl-3"> Affected URIs: </p>
          </div>
          `
          + getAffectedURIsHTML(check_info.affected_elements) +
          `
        </div>
      </div>
    </div>
  `
  );
}

function getRadialScoreHTML(score){
  return `
    <svg id="prueba" class="svg" attr.width="50" attr.height="50"
    viewPort="0 0 100 100">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">

            <stop offset="25%" style="stop-color:#616887;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#616887;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#616887;stop-opacity:1" />
        </linearGradient>
    </defs>

    <circle r="50" cx="75" cy="75" fill="transparent" stroke-dasharray="465.48" stroke-dashoffset="0"></circle>
    <circle class="bar" r="50" cx="75" cy="75" fill="transparent"
        stroke-dasharray="377.48" stroke-dashoffset="0"></circle>
    </svg>
  `
}

function getAffectedURIsHTML(URIs){
  console.log(URIs);

  var html = ``;

  for (let i = 0; i < URIs.length; i++) {
    html += `<p class="texto-URI"> - `+ URIs[i] + `</p>`;
  }
  
  return html;
}

function getPrincipleHTML(text) {
  return (
    `
    <div class="row my-3">
      <span class="texto-principle">` +
    text +
    `</span>
    </div>
  `
  );
}

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
