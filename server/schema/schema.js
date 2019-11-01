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
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        characters: {
            type: GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({owner: parent})
            }
        },
        worlds: {
            type: GraphQLList(WorldType),
            resolve(parent, args){
                return world.find({users: {$elemMatch: {parent}}})
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
        name:  { type: GraphQLString },
        maxNumberOfCharacters: { type: GraphQLInt },
        minNumberOfCharacters: { type: GraphQLInt },
        // dateCreated: { type: Date, default: Date.now },
        private: { type: GraphQLBoolean },
        year: { type: GraphQLInt },
        description: { type: GraphQLString },
        // tags: [String],
        joinWithModeratorApproval: { type: GraphQLBoolean },
        maxAgeOfCharacters: { type: GraphQLInt },
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({world: parent})
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return user.find({worlds: {$elemMatch: {parent}}})
            }
        }
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        id: { type: GraphQLID },
        owner: { 
            type: UserType,
            resolve(parent, args){
                return user.findOne({characters: {$elemMatch: {parent}}})
            }
        },
        world: {
            type: WorldType,
            resolve(parent, args){
                return world.findOne({characters: {$elemMatch: {parent}}})
            }
        },
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
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return post.find({author: parent})
            }
        },
        places: {
            type: new GraphQLList(PlaceType),
            resolve(parent, args){
                return place.find({characters: {$elemMatch: {parent}}})
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
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({posts: {$elemMatch: {parent}}})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        // dateCreated: { type: Date, default: Date.now },
        text: { type: GraphQLString },
        author: {
            type: CharacterType,
            resolve(parents, args){
                return character.findOne({posts: {$elemMatch: parent}})
            }    
        },
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
        users: {
            type: UserType,
            resolve(parents, args) {
                return user.find({});
            }
        },
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                let users = new user({
                    name: args.name
                });
                return users.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})