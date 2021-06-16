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

  if(result != "Error"){
    loadResults();

    showResults();
  }else{
    showError()
  }
}

function showResults() {
  // Esconder Error
  var resultBlock = document.querySelector("#error");
  resultBlock.style.display = "none";


  // Muestra resultados
  var resultBlock = document.querySelector("#test-results");
  resultBlock.style.display = "block";


}

function showError() {
  // Esconde resultados
  var resultBlock = document.querySelector("#test-results");
  resultBlock.style.display = "none";

  // Muestra error
  var resultBlock = document.querySelector("#error");
  resultBlock.style.display = "block";

}

function loadResults(){
  loadInfo(result);

  loadGrafics(result);

  loadCategory("Findable", result);
  loadCategory("Accessible", result);
  loadCategory("Interoperable", result);
  loadCategory("Reusable", result);

}

function getAverageChecks(checks){
  total = 0
  for(let i = 0; i < checks.length; i++){
    total += checks[i].total_passed_tests/checks[i].total_tests_run
  }
  return total/checks.length
}


function loadGrafics(result){
  var graphics = document.querySelector("#graphics");

  graphics.innerHTML = `
    <div class="col-6 d-flex align-items-center justify-content-center">`
    + getRadialScoreHTML(result.overall_score, 1.6) +
    `
    </div>
    <div class="col-6 d-flex align-items-center justify-content-center pt-4">`
    + getSpiderGraphHTML(result) + `
    </div>
  `
}

function getSpiderGraphHTML(result){
  checks = groupBy(result.checks, "category_id")

  category_results = {
    "Findable": getAverageChecks(checks['Findable']),
    "Accessible": getAverageChecks(checks['Accessible']),
    "Interoperable": getAverageChecks(checks['Interoperable']),
    "Reusable": getAverageChecks(checks['Reusable']),
  }

  
  points = {
    "center": { 
      "x": 57,
      "y": 50
    },
    "reusable": {
      "x": 22,
      "y": 50
    },
    "findable": {
      "x": 57,
      "y": 15
    },
    "accesible": {
      "x": 91,
      "y": 50
    },
    "interoperable": {
      "x": 57,
      "y": 85
    }
  }

  return `
  <svg height="200" width="130" viewBox="-50 0 200 100" transform="scale(2.5,2.5)">
    <rect x="50" y="-30" transform="rotate(45)" width="50" height="50"
    fill="#fff" stroke-width="1" stroke="black" />
    <line x1="22" y1="50" x2="91" y2="50" stroke-width="1" stroke="black"></line>
    <line x1="57" y1="15" x2="57" y2="85" stroke-width="1" stroke="black"></line>
    <path  fill="#428BCA4A" stroke-linecap="round" stroke-width="1" stroke="#27AE60" d="`+getSpiderDraw(points,category_results)+`"/>
    <text x="10" y="50" text-anchor="end" dy="7" font-size="10">Rehusable</text>
    <text x="57" y="0" text-anchor="middle" dy="7" font-size="10">Findable</text>
    <text x="95" y="50" text-anchor="start" dy="7" font-size="10">Accessible</text>
    <text x="57" y="90" text-anchor="middle"  dy="7" font-size="10">Interoperable</text>
  </svg>
  `
}

function getSpiderPoint(center, maximum, score){

  distance_x = maximum.x - center.x
  distance_y = maximum.y - center.y

  point = null

  console.log(distance_x)
  if(distance_x == 0){
    console.log("Punto en eje y")
    point = { "x": center.x, "y": center.y + (distance_y*score) }
  }else{
    console.log("Punto en eje x")
    point = { "x": center.x + (distance_x*score), "y": center.y }
  }

  return point.x + ` ` + point.y 

}

function getSpiderDraw(points, category_results){
  return `M `+getSpiderPoint(points.center, points.reusable, category_results.Reusable)+` L `+getSpiderPoint(points.center, points.findable, category_results.Findable)+` L `+getSpiderPoint(points.center, points.accesible, category_results.Accessible)+` L `+getSpiderPoint(points.center, points.interoperable, category_results.Interoperable)+` L `+getSpiderPoint(points.center, points.reusable, category_results.Reusable)
}

function getRadialScoreHTML(score, size){
  total = 251.2
  graphic_value = total * score
  stroke = total - graphic_value

  return `
  <svg height="100" width="100" transform="scale(`+size+`,`+size+`)">
    <circle cx="50" cy="50" r="45" fill="#FBFBFB"/>
    <path fill="none" stroke-linecap="round" stroke-width="5" stroke="#E65A28"
          stroke-dasharray="`+ graphic_value +`,`+ stroke +`"
          d="M50 10
            a 40 40 0 0 1 0 80
            a 40 40 0 0 1 0 -80"/>
    <text x="50" y="50" text-anchor="middle" dy="7" font-size="20">`+Math.round(score*100)+`%</text>
  </svg>
  `
}


function getResults() {

  var input = document.querySelector("#"+typeInputSelected+"_input").value
  
  if(input!="http://vocab.ciudadesabiertas.es/def/economia/deuda-publica-comercial"){
    return "Error"
  }

  // TO-DO
  // Aqui iría la llamada al backend

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
        "total_tests_run": 5
      },
      {
        "id": "PURL1",
        "principle_id": "F1",
        "category_id": "Findable",
        "status": "ok",
        "explanation": "Ontology URI is persistent (w3id, purl, DOI, or a W3C URL)",
        "description": " Check if the ontology uses a persistent URL",
        "total_passed_tests": 3,
        "total_tests_run": 4
      },
      {
        "id": "DOC1",
        "principle_id": "R1",
        "category_id": "Reusable",
        "status": "ok",
        "explanation": "Ontology available in HTML",
        "description": "Check if the ontology has an HTML documentation",
        "total_passed_tests": 2,
        "total_tests_run": 6
      },
      {
        "id": "RDF1",
        "principle_id": "I1",
        "category_id": "Interoperable",
        "status": "ok",
        "explanation": "Ontology available in RDF",
        "description": "Check if the ontology has an RDF serialization",
        "total_passed_tests": 3,
        "total_tests_run": 3
      },
      {
        "id": "OM1",
        "principle_id": "F2",
        "category_id": "Findable",
        "status": "unchecked",
        "explanation": "All metadata found!",
        "description": "Check to see is the following  minimum metadata [title, description, license, version iri, creator, creationDate, namespace URI] are present",
        "total_passed_tests": 5,
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
  <div class="row w-100 mx-0" style="display: block; height: 0px; margin-top: -10px;">
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
      <div class="row mt-2 mx-0">
        <div class="col-8">
          <span class="texto-check">
            `+ check_info.id +`
          </span>
        </div>
        <div class="col-2">
          <div style="position: absolute; top:-30px;">
        `+getRadialScoreHTML(check_info.total_passed_tests/check_info.total_tests_run, 0.5)+`
          </div>
        </div>
        <div class="col-2 d-flex align-items-center justify-content-end">
          <img src="assets/up-arrow.svg" onclick="arrowClicked(event, '`+check_info.id+`')">
        </div>
      </div>
      <div class="row m-0" id="`+check_info.id+`">
      `+ getLineHTML() +`
        <div class="row mx-0 mt-2 w-100">
          <p class="texto-affected pl-3"> Description: </p>
        </div>
        <div class="row m-0 w-100">
          <p class="texto-explanation pt-3 pl-3">`
          + check_info.description +
          `</p>
        </div>
        <div class="row m-0 w-100">
          <p class="texto-affected pl-3"> Explanation: </p>
        </div>
        <div class="row m-0 w-100">
          <p class="texto-explanation pt-3 pl-3">`
          + check_info.explanation +
          `</p>
        </div>
      </div>
    </div>
  `
  );
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