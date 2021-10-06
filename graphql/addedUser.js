const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const addedUserType = new GraphQLObjectType({
    name: 'UserMessage',
    description: 'This is the message from adding user',
    fields: () => ({
        message: { type: GraphQLNonNull(GraphQLString) },
    })
});

module.exports = addedUserType;
