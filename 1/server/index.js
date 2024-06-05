const express = require('express');
const {ApolloServer} = require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express');
const bodyParser = require('body-parser');
const cors = require('cors');   
const { default: axios } = require('axios');

async function startServer(){
    const app = express();
    const server = new ApolloServer({
        typeDefs: `

            type user{
                id: ID!
                name: String!
                username: String!
                email: String!
                phone: String!
                website: String
            }   

            type Todo{
                id: ID!
                title: String
                completed: Boolean
            }
            
            type Query{
                getTodos: [Todo]
                getAllUsers: [User]
            }
        `,
        resolvers: {
            Query:{
                getTodos: async () => (await axios.get("")).data,
                getAllUsers: async () => (await axios.get("")).data
            }
        }
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use('/graphql',expressMiddleware(server));

    app.listen(3000);

}

startServer();