const URL_BASE = "https://api.modrinth.com/v2/search"
// add/remove stuff from this for filtering
let URL_EXTENSION = "?limit=20&index=relevance"

// helper methods to make making text/links/images easier
// makes a text node like this: 
//  <type>string<\type>
function text_element(type, string) {
    let element = document.createElement(type);
    element.appendChild(document.createTextNode(string));
    return element;
}
// makes a link
//  <a href="link">text<\a>
function link_element(link, text) {
    let element = document.createElement("a")
    element.setAttribute("href",link)
    element.textContent = text;
    return element
}
// makes an image
//  <img src="link"><\img>
function img_element(link) {
    let element = document.createElement("img")
    element.setAttribute("src", link)
    return element
}


// constant references to parts of our html
const modResultsNode = document.querySelector("#mod-results")
const searchTextForm = document.querySelector("form#search-text")
const searchFilterForm =document.querySelector("form#search-filter")


// Fetch data from currently established filters
// parse data into mods in #mod-results
function refreshMods() {
    fetch(URL_BASE+URL_EXTENSION).then(response=>response.json()).then((data) => {
        console.log(data)
    })
}
// by default render front page mods
refreshMods();


// when our Filters change or searchTextForm is submitted
//      update URL_EXTENSION to match new filters
//      run refreshMods() to update shown mods
