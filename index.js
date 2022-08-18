const URL_BASE = "https://api.modrinth.com/v2/search"
let URL_EXTENSION = "?limit=20&index=relevance"

fetch(URL_BASE+URL_EXTENSION).then(response=>response.json()).then((data) => {
    console.log(data)
})