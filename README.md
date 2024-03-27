# WTWR (What to Wear?): Back End

In this project the focus was on creating a back-end for my WTWR project. Using Mongoose, a javascript object-oriented programming library commonly used to connect MongoDB, a database, and Node.js. The back-end of this project allows for the creation and storage of both users and the clothing items they create on a server that allows for API calls and user authorization via user ids.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Technologies

`Database` — a storage of organized data with multiple ways of access.

`Server` — a constantly running computer that runs special programs that proccess incoming request and sends responses to them.

`API/(Application Programming Interface)` — Allows users to interact with application though the use of request which the application the returns responses which affect what the user sees.

`Middleware` — In my project middleware was used to authorize users through their id. Middleware is commonly used to write request processing code in a seperate module to declutter routes. It is aslo a good place to move code that will need to be repeated often.

`Routes` — Routes allow for API calls to made through the application without having all the code in one place. Specifically in this project, the routes were broken up even further into two seperate routes. One route for clothing items and one for users.

`Schemas/Models` — Schemas set a predetermined structure containing properties such as name or imageURL that describes what a database document should look like. Models are then used to create the document itself. Models allow the reading, addition/deletetion or update of documents.

`Postman` — Postman is a tool used to tesst APIs.

`MongoDB` — a commonly used database that it NoSQL or a database that doesnt use relational tables.

`Mongoose` — used to allow for Javascript objects to work with database documents.


#### Domain name

`http//marcuswtwr.jumpingcrabs.com`
