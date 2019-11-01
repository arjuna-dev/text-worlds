const graphql = require('graphql');
const character = require('../models/character');
const place = require('../models/place');
const post = require('../models/post');
const user = require('../models/user');
const world = require('../models/world');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLNonNull, GraphQLInt, GraphQLBoolean } = graphql;

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: GraphQLID },
        user: { type: GraphQLString },
        name: { type: GraphQLString },
        nickname: { type: GraphQLString },
        age: { type: GraphQLInt },
        occupation: { type: GraphQLString },
        hobbies: { type: GraphQLString },
        fobias: { type: GraphQLString },
        funFact: { type: GraphQLString },
        story: { type: GraphQLString },
        // dateCreated: { type: GraphQLString },
        // tagged: { type: GraphQLString },
        // birthmarks: { type: GraphQLList },
        onAdoption: { type: GraphQLBoolean },
    })
})

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        parentPlace: { type: GraphQLString },
        description: { type: GraphQLString },
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        // dateCreated: { type: Date, default: Date.now },
        text: { type: GraphQLString },
        author: { type: GraphQLString },
        // type: {type: String, enum: ['World Narrator', 'Small Narrator', 'Me Speaking']},
        // tagged_channels: [String],
        likes: { type: GraphQLInt },
        deletes: { type: GraphQLInt },
        report: { type: GraphQLInt },
        fork: { type: GraphQLInt },
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: { type: GraphQLString }},
        // characters: { type: GraphQLList },
        // meta: {
        //     loggedIn: [Date],
        //     Disconnected: [Date],
        //     LoggedIntoWorld: [(String, Date)],
        //     DisconnectedFromWorld: [(String, Date)],
        // }
    })
})

const WorldType = new GraphQLObjectType({
    name: 'World',
    fields: () => ({
        id: { type: GraphQLID },
        name:  { type: { type: GraphQLString }},
        creator: { type: { type: GraphQLString }},
        maxNumberOfCharacters: { type: GraphQLInt },
        minNumberOfCharacters: { type: GraphQLInt },
        // dateCreated: { type: Date, default: Date.now },
        private: { type: GraphQLGraphQLBoolean },
        year: { type: GraphQLInt },
        description: { type: { type: GraphQLString }},
        // tags: [String],
        joinWithModeratorApproval: { type: GraphQLGraphQLBoolean },
        maxAgeOfCharacters: { type: GraphQLInt },
        // listOfUsers: [String], 
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        character: {
            type: CharacterType,
            args: { name: { type: GraphQLString } },
            resolve(parents, args) {
                return character.find({
                    name: args.name
                });
            }
        },
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    // mutation: Mutation
})