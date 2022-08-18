const URL_BASE = "https://api.modrinth.com/v2/search"
// add/remove stuff from this for filtering
let URL_EXTENSION_BASE = "?limit=20&index=relevance"
let URL_EXTENSION_QUERY = ""
let URL_EXTENSION_FILTERS = []
const URL_FULL = () => {
    let out = URL_BASE+URL_EXTENSION_BASE+URL_EXTENSION_QUERY;
    // if we have any facets
    if (URL_EXTENSION_FILTERS.length > 0) {
        // add the facet extension
        out = out + "&facets=["

        // add each facet
        URL_EXTENSION_FILTERS.forEach(facet => {
            out = out + "[" + facet + "],"
        });
        // this leaves us with a bad extra comma at the end so we remove it
        out = out.slice(0,-1)

        // add the closing square bracket
        out = out + "]"
    }
    return out
}

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
    element.innerHTML = text;
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
const searchQueryForm = document.querySelector("form#search-text")
const searchFilterForm =document.querySelector("form#search-filter")


// Fetch data from currently established filters
// parse data into mods in #mod-results
function refreshMods() {
    fetch(URL_FULL()).then(response=>response.json()).then((data) => {
        console.log(data)
    })
}
// by default render front page mods
refreshMods();

// when our Filters change or searchQueryForm is submitted
//      update URL_EXTENSION to match new filters
//      run refreshMods() to update shown mods
searchQueryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    URL_EXTENSION_QUERY = "&query=" + document.querySelector("#search-query").value
    refreshMods()
})


// add event listeners to all of our checkboxes
// URL_EXTENSION_FILTERS should be ["categories:adventure", "categories:fabric", "versions:1.17.1"]
document.querySelectorAll("input[type=\"checkbox\"]").forEach(box => {
    console.log("added")
    box.addEventListener(("click"), () => {
        console.log("clicked!")
        let facet = box.getAttribute("facet");
        let index = URL_EXTENSION_FILTERS.indexOf(facet)
        
        if (index != -1) {
            // our box is being unchecked, remove it's facet from the URL_EXTENSION_FILTERS
            URL_EXTENSION_FILTERS.splice(index,1)
        } else {
            URL_EXTENSION_FILTERS.push(facet)
        }

        refreshMods()
    })
});

// Checkboxes are hardcoded, should generate them instead
// fetch https://api.modrinth.com/v2/tag/category
// for category in data
//      if (category["project_type"]=="mod")
//          add to the thing
//          add event listener click thing