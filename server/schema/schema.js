const graphql = require('graphql');
const character = require('../models/character');
const place = require('../models/place');
const post = require('../models/post');
const user = require('../models/user');
const world = require('../models/world');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLInt, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: { type: GraphQLString }},
        password: { type: { type: GraphQLString }},
        characters: {
            type: CharacterType,
            resolve(parent, args){
                return 
            }
        },
        worlds: {
            type: WorldType,
            resolve(parent, args){
                return 
            }
        }
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
        maxNumberOfCharacters: { type: GraphQLInt },
        minNumberOfCharacters: { type: GraphQLInt },
        // dateCreated: { type: Date, default: Date.now },
        private: { type: GraphQLGraphQLBoolean },
        year: { type: GraphQLInt },
        description: { type: { type: GraphQLString }},
        // tags: [String],
        joinWithModeratorApproval: { type: GraphQLGraphQLBoolean },
        maxAgeOfCharacters: { type: GraphQLInt },
        characters: {
            type: CharacterType,
            resolve(parent, args){
                return 
            }
        },
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        nickname: { type: GraphQLString },
        story: { type: GraphQLString },
        age: { type: GraphQLInt },
        occupation: { type: GraphQLString },
        hobbies: { type: GraphQLString },
        fobias: { type: GraphQLString },
        funFact: { type: GraphQLString },
        // dateCreated: { type: GraphQLString },
        // tagged: { type: GraphQLString },
        // birthmarks: { type: GraphQLList },
        onAdoption: { type: GraphQLBoolean },
        posts: {
            type: PostType,
            resolve(parent, args){
                return 
            }
        },
        places: {
            type: PlaceType,
            resolve(parent, args){
                return 
            }
        },
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