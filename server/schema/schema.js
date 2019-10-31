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
        creator: { type: GraphQLString },
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


        //This looks like a query 👇🏼
        character: {
            type: CharacterType,
            //args: {id:{type:GraphQLString}},
            resolve(parent, args) {
                return character.find({name: parent.authorName});
            }
        }
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