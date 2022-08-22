# phase-1-project-modrinth-search
Mock recreation of the modrinth search page made with pure JavaScript

## Pitch
The basic story of your application
- The API content of Modrinth is complex and can be filtered and searched for from many different angles. This makes it exciting content to work with, as we can practice a variety of event listeners and practice unique coding that we have not had much exposure to in labs.

The core features of your MVP
- The core features of our MVP include:
    - Mod cards
    - Search query bar
    - Categories for filtering
    - Pagination
    - Interactivity and hyperlinking to mod details through images, authors, titles, etc.

The API data you'll be using and how you'll use it
- The API data we'll be using includes individual mod cards. These cards are the core data that we will filter, search, and use as the content for our site.
- Modrinth has an API to query mods through categories and search query. We will be using this to fetch data and parse it into mod cards.

Challenges you expect to face
- Rachel:
    - I have not had a lot of experience builting HTML and CSS from scratch. I'm excited to dive into this part of building the website.
    - I'm looking forward to the challenge of learning more advanced event listeners.
    - I'm looking forward to doing a partner project to practice collaborating with someone else to build a product.

- Chase: 
    - Learning how to work with a partner and collaborate over Git. 
    - Getting SVGs to look right.

How you are meeting the requirements of the project
- We are creating a frontend HTML/CSS/JS that accesses data from a public API, and these interactions are handled asyncronously. Our app will run on a single page, and we'll but using four, maybe more, unique event listeners. We will be using more than one instance of array intertion.

## Project "User Stories"
1. I can as a User, click on a mod's name/icon to go to it's page
2. I can as a User, click on a mod's author to go to it's author's page
3. I can as a User select mod categories and see mods that fit into them
4. I can as a User, type a query into the search bar to narrow the mods that are shown, (updating after pressing enter)
5. I can as a User, click the next/previous page button to go to the next or previous page.
## Stretch goals
1. I can as a User hover over the mod's creation and modified date to see the exact date and time
2. Don't hardcode the categories, get them from the api
    - [docs for how to do that](https://docs.modrinth.com/api-spec/#tag/tags)

## Project Requirements
1. Your app must be a HTML/CSS/JS frontend that accesses data from a public API. All interactions between the client and the API should be handled asynchronously and use JSON as the communication format. Try to avoid using an API that requires a key. APIs that are free and require no authorization will be easiest to use. For ideas, see this list of no-auth APIs (Links to an external site.). If you would like to use an API that requires a key, please consult with your instructor on how to protect that key. NEVER push your API key to github!

2. Your entire app must run on a single page. There should be NO redirects. In other words, your project will contain a single HTML file.

3. Use at least 3 unique event-listeners (Links to an external site.) that enable interactivity. Think search or filter functionality, toggling dark/light mode, upvoting posts, etc. Each of your event listeners should have its own unique callback function.

4. Your project must implement at least one instance of array iteration using available array methods (map, forEach, filter, etc). Manipulating your API data in some way should present an opportunity to implement your array iteration.

5. Follow good coding practices. Keep your code DRY (Do not repeat yourself) by utilizing functions to abstract repetitive code.
