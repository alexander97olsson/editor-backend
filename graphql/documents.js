const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const DocumentType = new GraphQLObjectType({
    name: 'Documents',
    description: 'This represents all documents',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLNonNull(GraphQLString) },
        maintext: { type: GraphQLNonNull(GraphQLString) },
        owner: { type: GraphQLNonNull(GraphQLString) },
        allowed_users: { type: GraphQLNonNull(GraphQLList(GraphQLString)) },
    })
});

module.exports = DocumentType;
