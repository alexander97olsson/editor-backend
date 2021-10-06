const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//all types
const userType = require("./users.js");
const addedUserType = require("./addedUser.js");
const documentType = require("./documents.js");

//all database info
const usersInfo = require("../src/auth.js");
const documentInfo = require("../src/get.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        testing: {
            type: GraphQLString,
            description: "Print hello world",
            resolve: function() {
                return "hejsan detta testar bara!";
            }
        },
        users: {
            type: GraphQLList(userType),
            description: "Get all users",
            resolve: async function() {
                return await usersInfo.allUsers();
            }
        },
        user: {
            type: userType,
            description: "Get one user by email",
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let allUsers = await usersInfo.allUsers();

                return allUsers.find(item => item.email === args.email);
            }
        },
        documents: {
            type: GraphQLList(documentType),
            description: "Get all documents",
            resolve: async function() {
                return await documentInfo.getAllData();
            }
        },
        documentOwner: {
            type: documentType,
            description: "Get one document by owner",
            args: {
                owner: { type: GraphQLString }
            },
            resolve: async function (parent, args) {
                let allDocuments = await documentInfo.getAllData();

                return allDocuments.find(doc => doc.owner === args.owner);
            }
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addUser: {
            type: addedUserType,
            description: "Add one user to database",
            args: {
                email: { type: GraphQLNonNull(GraphQLString) },
                password: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async function(parent, args) {
                return await usersInfo.registerGraphQL(args.email, args.password);
            }
        }
    })
});

module.exports = {
    RootQueryType,
    RootMutationType
};
