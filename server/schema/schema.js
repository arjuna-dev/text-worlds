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
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        characters: {
            type: GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({userId: parent._id}, function(err, data){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        worlds: {
            type: GraphQLList(WorldType),
            resolve(parent, args){
                return world.find({usersId: {$elemMatch: parent._id}}, function(err, data){
                    if (err) console.log(err)
                    return data
                })
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
        _id: { type: GraphQLID },
        name:  { type: GraphQLString },
        usersId: { type : GraphQLList(GraphQLID)},
        maxNumberOfCharacters: { type: GraphQLInt },
        minNumberOfCharacters: { type: GraphQLInt },
        // dateCreated: { type: Date, default: Date.now },
        private: { type: GraphQLBoolean },
        year: { type: GraphQLInt },
        description: { type: GraphQLString },
        // tags: [String],
        joinWithModeratorApproval: { type: GraphQLBoolean },
        maxAgeOfCharacters: { type: GraphQLInt },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return user.find({_id: {$in: parent.usersId}}, function(err, data){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({userId: {$in: parent.usersId}}, function(err, data){
                    if (err) console.log(err)
                    return data
                })
            }
        },
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        user: { 
            type: UserType,
            resolve(parent, args){
                return user.findOne({_id: parent.userId},function(err, data){
                    console.log(err)
                    return data
                })
            }
        },
        world: {
            type: WorldType,
            resolve(parent, args){
                return world.findOne({_usersId: {$elemMatch: parent.userId}})
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
                return post.find({authorId: parent._id})
            }
        },
        places: {
            type: new GraphQLList(PlaceType),
            resolve(parent, args){
                return place.find({charactersId: {$elemMatch: parent._id}})
            }
        },
    })
})

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        charactersId: { type : GraphQLList(GraphQLID)},
        parentPlace: { type: GraphQLString },
        description: { type: GraphQLString },
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({_id: {$in: parent.charactersId}}, function(err,data){
                    if (err) console.log(err)
                    return data
                })
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLID },
        authorId: {type: GraphQLID},
        title: { type: GraphQLString },
        // dateCreated: { type: Date, default: Date.now },
        text: { type: GraphQLString },
        author: {
            type: CharacterType,
            resolve(parent, args){
                return character.findOne({_id: authorId})
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
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return user.find({}, function(err, doc){
                    if (err) console.log(err)
                    return doc
                });
            }
        },
        worlds: {
            type: GraphQLList(WorldType),
            resolve(parent, args){
                return world.find({}, function(err, doc){
                    if (err) console.log(err)
                    return doc
                })
            }
        },
        characters: {
            type: GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({}, function(err, doc){
                    if (err) console.log(err)
                    return doc
                })
            }
        },
        posts: {
            type: GraphQLList(PostType),
            resolve(parent, args){
                return post.find({}, function(err, doc){
                    if (err) console.log(err)
                    return doc
                })
            }
        },
        places: {
            type: GraphQLList(PlaceType),
            resolve(parent, args){
                return place.find({}, function(err, doc){
                    if (err) console.log(err)
                    return doc
                })
            }
        }
    })
});


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let newUser = new user({
                    name: args.name,
                    email: args.email,
                    //add more later
                });
                return newUser.save();
            }
        },
        addWorld: {
            type: WorldType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)}
                //add more later
            },
            resolve(parent, args){
                let newWorld = new world({
                    name: args.name,
                    description: args.description
                });
                return newWorld.save();
            }
        },
        addCharacter: {
            type: CharacterType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                story: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLInt },
                occupation: { type: GraphQLString } 
                // add more later
            },
            resolve(parent, args){
                let newCharacter = new character({
                    name: args.name,
                    story: args.story,
                    age: args.age,
                    occupation: args.occupation
                });
                return newCharacter.save()
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString)},
                text: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let newPost = new post({
                    title: args.title,
                    text: args.text,
                });
                return newPost.save()
            }
        },
        addPlace: {
            type: PlaceType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let newPlace = new place({
                    name: args.name,
                    description: args.description,
                });
                return newPlace.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})