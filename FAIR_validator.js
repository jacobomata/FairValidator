var typeInputSelected = "URI";

function openInput(evt, elem) {

  hideTabContent()

  deactivateSelectors()

  showSelector(evt, elem)
}

function hideTabContent(){
    // Seleccionamos todos los elementos con selector-content y los ocultamos
    var tabcontent = document.getElementsByClassName("selector-content");
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
}

function deactivateSelectors(){
    // Se elimina active de todos los selector
    var tablinks = document.getElementsByClassName("selector");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

function showSelector(evt,elem){
    // Se muestra el contenido y se pone como active el contenido
    document.getElementById(elem).style.display = "flex";
    evt.currentTarget.className += " active";
  
    typeInputSelected = elem;
}

function run() {
  result = getResults();

  loadResults();

  showResults();
}

function loadResults(){
  loadInfo(result);

  loadCategory("Findable", result);
  loadCategory("Accessible", result);
  loadCategory("Interoperable", result);
  loadCategory("Reusable", result);

}

function showResults() {
  var resultBlock = document.querySelector("#test-results");
  resultBlock.style.display = "block";
}

function getResults() {
  return {
    "ontology_URI": "https://w3id.org/okn/o/sd",
    "ontology_title": "The Software Description Ontology",
    "overall_score":0.8888889,
    "checks":[
      {
        "id": "CN1",
        "principle_id": "A1",
        "category_id": "Accessible",
        "status": "ok",
        "explanation": "Ontology available in: HTML, RDF",
        "description": "Checks if the ontology URI is published following the right content negotiation for RDF and HTML",
        "total_passed_tests": 2,
        "total_tests_run": 2
      },
      {
        "id": "PURL1",
        "principle_id": "F1",
        "category_id": "Findable",
        "status": "ok",
        "explanation": "Ontology URI is persistent (w3id, purl, DOI, or a W3C URL)",
        "description": " Check if the ontology uses a persistent URL",
        "total_passed_tests": 1,
        "total_tests_run": 1
      },
      {
        "id": "DOC1",
        "principle_id": "R1",
        "category_id": "Reusable",
        "status": "ok",
        "explanation": "Ontology available in HTML",
        "description": "Check if the ontology has an HTML documentation",
        "total_passed_tests": 1,
        "total_tests_run": 1
      },
      {
        "id": "RDF1",
        "principle_id": "I1",
        "category_id": "Interoperable",
        "status": "ok",
        "explanation": "Ontology available in RDF",
        "description": "Check if the ontology has an RDF serialization",
        "total_passed_tests": 1,
        "total_tests_run": 1
      },
      {
        "id": "OM1",
        "principle_id": "F2",
        "category_id": "Findable",
        "status": "unchecked",
        "explanation": "All metadata found!",
        "description": "Check to see is the following  minimum metadata [title, description, license, version iri, creator, creationDate, namespace URI] are present",
        "total_passed_tests": 6,
        "total_tests_run": 6
      },
      {
        "id": "OM2",
        "principle_id": "F2",
        "category_id": "Findable",
        "status": "unchecked",
        "explanation": "The following metadata was not found: creation date, citation",
        "description": "Check to see if the following recommended metadata [NS Prefix, version info, contributor, creation date, citation] are present",
        "total_passed_tests": 3,
        "total_tests_run": 5
      },
      {
        "id": "OM4.1",
        "principle_id": "R1.1",
        "category_id": "Reusable",
        "status": "ok",
        "explanation": "A license was found http://creativecommons.org/licenses/by/2.0/",
        "description": "Check to see if there is a license associated with the ontology",
        "total_passed_tests": 1,
        "total_tests_run": 1
      },
      {
        "id": "OM4.2",
        "principle_id": "R1.1",
        "category_id": "Reusable",
        "status": "ok",
        "explanation": "License could be resolved",
        "description": "Check to see if the license is resolvable",
        "total_passed_tests": 1,
        "total_tests_run": 1
      }
    ]
    }
}

function loadInfo(result) {
  var title = document.querySelector("#title");
  title.textContent = result.ontology_title

  var URI = document.querySelector("#URI-title");
  URI.textContent = result.ontology_URI
}

function loadCategory(category, result) {

  var checks_div = document.getElementById(category + "-checks");
  checks_div.innerHTML = getLineHTML();

  checks = getCategoryChecks(category, result);

  loadPrinciples(checks, checks_div);
}

function getLineHTML(){
  return `
  <div class="row w-100 m-0" style="display: block; height: 0px;">
    <hr color="#000000">
  </div>
  `
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
    check.className = "p-3";
    check.innerHTML = getCheckHTML(checks[i]);
    checks_div.appendChild(check);
  }
}

function getCheckHTML(check_info) {
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
          <div class="col-2 d-flex align-items-center justify-content-end">
            <img src="assets/up-arrow.svg" onclick="arrowClicked(event, '`+check_info.id+`)">
          </div>
        </div>
      </div>
      <div class="row m-0" id="`+check_info.id+`>
        <div class="row m-0">
          <p class="texto-explanation pt-3 pl-3">`
          + check_info.explanation +
          `</p>
        </div>
        <div class="col-12">
          <div class="row">
            <p class="texto-affected pl-3"> Affected URIs: </p>
          </div>
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

  var html = ``;

  for (let i = 0; i < URIs.length; i++) {
    html += `<p class="texto-URI"> - `+ URIs[i] + `</p>`;
  }
  
  return html;
}

function getPrincipleHTML(text) {
  return (
    `
    <div class="row my-3 pl-3">
      <span class="texto-principle pl-3">` +
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

function arrowClicked(event, id){

  status = getArrowStatus(event)

  replaceArrow(event, status)

  if(status=="up"){
    hideContent(id);
  }else{
    showContent(id);
  }

}

function getArrowStatus(event){
  let src = event.currentTarget.src;
  if(src.includes("up-arrow.svg")){
    return "up";
  }else{
    return "down";
  }
}

function replaceArrow(event, status){
  if(status == "up"){
    event.currentTarget.src = event.currentTarget.src.replace("up-arrow.svg", "down-arrow.svg")
  }else{
    event.currentTarget.src = event.currentTarget.src.replace("down-arrow.svg", "up-arrow.svg")
  }
}

function showContent(id) {
  var resultBlock = document.querySelector("#"+id);
  resultBlock.style.display = "block";
}

function hideContent(id) {
  var resultBlock = document.querySelector("#"+id);
  resultBlock.style.display = "none";
}