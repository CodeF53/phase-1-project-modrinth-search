const API_URL = "https://api.modrinth.com/v2/"
const URL_BASE = API_URL + "search"
// add/remove stuff from this for filtering
let URL_EXTENSION_BASE = "?limit=20&index=relevance"
let URL_EXTENSION_QUERY = ""
let URL_EXTENSION_FILTERS = []
const URL_FULL = () => {
    let out = URL_BASE + URL_EXTENSION_BASE + URL_EXTENSION_QUERY;
    // if we have any facets
    if (URL_EXTENSION_FILTERS.length > 0) {
        // add the facet extension
        out = out + "&facets=["

        // add each facet
        URL_EXTENSION_FILTERS.forEach(facet => {
            out = out + "[" + facet + "],"
        });
        // this leaves us with a bad extra comma at the end so we remove it
        out = out.slice(0, -1)

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
    element.setAttribute("href", link)
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

// makes a raw HTML element with inputted HTML
//  input
function html_element(input) {
    return new DOMParser().parseFromString(input, 'text/html').body.childNodes[0]
}

// wraps inputted element array in a div with inputted class
function wrap_in_div(div_classes, elements) {
    let div = document.createElement("div")
    div.classList = div_classes;
    div.append(...elements)
    return div
}

// constant references to parts of our html
const modResultsNode = document.querySelector("#mod-results")
const searchQueryForm = document.querySelector("form#search-text")
const searchFilterForm = document.querySelector("form#search-filter")
const searchFilterCategories = document.querySelector(".filter-categories#categories")
const searchFilterLoaders = document.querySelector(".filter-categories#loaders")
const searchFilterEnvironments = document.querySelector(".filter-categories#environments")


function modHTML(mod) {
    let icon = img_element(mod ['icon_url'])
    let iconDiv = wrap_in_div('mod_icon_container', [icon])

    let title = text_element('h2', mod['title'])
    let author = text_element('p', "by: " + mod['author'])
    let description = text_element('p', mod['description'])
    //To Do: mod categories, creation, and update date
    let infoDiv = wrap_in_div('',[title, author, description])

    let downloads = text_element('h4', mod['downloads'] + " downloads")
    let followers = text_element('h4', mod['follows'] + " followers")
    let afdsjklDiv = wrap_in_div('', [downloads, followers])

    return wrap_in_div("panel mod", [iconDiv,infoDiv,afdsjklDiv])
}
// Fetch data from currently established filters
// parse data into mods in #mod-results
function refreshMods() {
    modResultsNode.innerHTML = ''
    fetch(URL_FULL()).then(response => response.json()).then((data) => {
        data["hits"].forEach(mod => {
            modResultsNode.appendChild(modHTML(mod));
        });
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


function filterHTML(object, parent, facet) {
    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("name", object["name"])
    // prevent default checkbox behavior
    checkbox.addEventListener("click", (event) => {
        event.preventDefault()
    })

    let label = document.createElement("label")
    label.setAttribute("for", object["name"])
    label.append(
        wrap_in_div("checkbox_icon", [html_element(object["icon"])]),
        document.createTextNode(object["name"].charAt(0).toUpperCase() + object["name"].slice(1))
    )
    
    let div = wrap_in_div("checkbox_outer", [checkbox, label])
    if (facet != undefined) {
        div.setAttribute("facet", facet)
    } else {
        div.setAttribute("facet", `"categories:${object["name"]}"`)
    }
    

    // make clicking anywhere on filter thing work instead of just checkbox
    div.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked  

        let inner_facet = div.getAttribute("facet")
        if (checkbox.checked) {
            // our box was just enabled, add facet to list of api categories
            URL_EXTENSION_FILTERS.push(inner_facet)
        } else {
            // our box is being unchecked, remove it's facet
            let index = URL_EXTENSION_FILTERS.indexOf(inner_facet)
            URL_EXTENSION_FILTERS.splice(index,1)
        }

        // we just updated the things we are searching by, refresh mod results
        refreshMods()
    })

    parent.appendChild(div)
}

// Fetch categories from modrinth api
fetch(API_URL + "tag/category").then(response => response.json()).then((data) => {
    // iterate through response
    for (const catKey in data) {
        if (Object.hasOwnProperty.call(data, catKey)) {
            const category = data[catKey];
            // modrinth distributes more than just mods
            // we need to filter out categories only for mods
            if (category["project_type"] == "mod") {
                filterHTML(category, searchFilterCategories)
            }
        }
    }
})

// modrinth API says plugin loaders are mod loaders, so we have to
// hardcode filter out the plugin loaders
const mod_loaders = ["fabric", "forge", "liteloader", "modloader", "quilt", "rift"]
// Fetch loaders from modrinth api
fetch(API_URL + "tag/loader").then(response => response.json()).then((data) => {
    // iterate through response
    for (const lodKey in data) {
        if (Object.hasOwnProperty.call(data, lodKey)) {
            const loader = data[lodKey];
            // modrinth distributes more than just mods
            // we need to filter out categories only for mods
            if (loader["supported_project_types"][0] == "mod") {
                if (mod_loaders.indexOf(loader["name"]) != -1){
                    filterHTML(loader, searchFilterLoaders)
                }
            }
        }
    }
})

// modrinth hardcodes client/server buttons and has no API thing for them
// so we have to hardcode them as well
filterHTML({
    name: "client", icon: `<svg data-v-cb4b130e="" data-v-7d6eab08="" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true" class=""><rect data-v-cb4b130e="" data-v-7d6eab08="" x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><path data-v-cb4b130e="" data-v-7d6eab08="" d="M8 21h8M12 17v4"></path></svg>`
}, searchFilterEnvironments, `"client_side:optional","client_side:required"`)
filterHTML({
    name: "server", icon: `<svg data-v-cb4b130e="" data-v-7d6eab08="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class=""><line data-v-cb4b130e="" data-v-7d6eab08="" x1="22" y1="12" x2="2" y2="12"></line><path data-v-cb4b130e="" data-v-7d6eab08="" d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line data-v-cb4b130e="" data-v-7d6eab08="" x1="6" y1="16" x2="6.01" y2="16"></line><line data-v-cb4b130e="" data-v-7d6eab08="" x1="10" y1="16" x2="10.01" y2="16"></line></svg>`
}, searchFilterEnvironments, `"server_side:optional","server_side:required"`)