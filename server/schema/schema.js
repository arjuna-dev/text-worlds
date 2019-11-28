const graphql = require('graphql');
const character = require('../models/character');
const place = require('../models/place');
const post = require('../models/post');
const user = require('../models/user');
const world = require('../models/world');
var moment = require('moment');

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
                return world.find({userId: parent._id}, function(err, data){
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
        userId: { type: GraphQLID },
        maxNumberOfCharacters: { type: GraphQLInt },
        minNumberOfCharacters: { type: GraphQLInt },
        // dateCreated: { type: Date, default: Date.now },
        private: { type: GraphQLBoolean },
        year: { type: GraphQLInt },
        description: { type: GraphQLString },
        // tags: [String],
        joinWithModeratorApproval: { type: GraphQLBoolean },
        maxAgeOfCharacters: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args){
                return user.findOne({_id: parent.userId}, function(err, data){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args){
                return post.find({worldId: parent._id}, function(err, data){
                    if (err) console.log(err)
                    return data
                }).sort({date: -1})
            }
        },
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(parent, args){
                return character.find({worldId: parent._id}, function(err, data){
                    if (err) console.log(err)
                    return data
                }).sort({name: 1});
            }
        }
    })
})

const CharacterType = new GraphQLObjectType({
    name: 'Character',
    fields: () => ({
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        worldId: {type: GraphQLID},
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
                return world.findOne({_id: parent.worldId})
            }
        },
        dateCreated: {type: GraphQLString},
        name: { type: GraphQLString },
        role: {type: GraphQLString},
        gender: {type: GraphQLString},
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
                return post.find({characterId: parent._id}).sort({date: -1})
            }
        },
        places: {
            type: new GraphQLList(PlaceType),
            resolve(parent, args){
                return place.find({charactersId: {$elemMatch: {$eq: parent._id}}}).sort({dateCreated: -1})
            }
        },
    })
})

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: () => ({
        _id: { type: GraphQLID },
        userId: { type: GraphQLID },
        worldId: { type: GraphQLID },
        parentPlaceId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args){
                return user.findOne({_id: parent.userId}, function(err, data){
                    if (err) console.log(err)
                    return data
                })
            }
        },
        world: {
            type: WorldType,
            resolve(parent, args){
                return world.findOne({_id: parent.worldId})
            }
        },
        parentPlace: {
            type: PlaceType,
            resolve(parent, args){
                return place.findOne({_id: parent.parentPlaceId})
            }
        },
        childPlaces: { 
            type: new GraphQLList(PlaceType),
            resolve(parent, args){
                return place.find({parentPlaceId: parent._id})
            }
        },
        dateCreated: {type: GraphQLString},
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLID },
        characterId: {type: GraphQLID},
        title: { type: GraphQLString },
        dateCreated: {type: GraphQLString},
        likes: {type: GraphQLInt},
        deletes: {type: GraphQLInt},
        worldId: {type: GraphQLID},
        type: {type: GraphQLString},
        // dateCreated: { type: Date, default: Date.now },
        text: { type: GraphQLString },
        character: {
            type: CharacterType,
            resolve(parent, args){
                return character.findOne({_id: parent.characterId})
            }    
        },
        world: {
            type: WorldType,
            resolve(parent, args){
                return world.findOne({_id: parent.worldId})
            }
        },
        // type: {type: String, enum: ['World Narrator', 'Small Narrator', 'Me Speaking']},
        // tagged_channels: [String],
        likes: { type: GraphQLInt },
        deletes: { type: GraphQLInt },
        likesCharsId: {type: new GraphQLList(GraphQLString)},
        deletesCharsId: {type: new GraphQLList(GraphQLString)},
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
        },
        world: {
            type: WorldType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return world.findById(args.id);
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
                description: { type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLString)}

                //add more later
            },
            resolve(parent, args){
                let newWorld = new world({
                    name: args.name,
                    description: args.description,
                    userId: args.userId
                });
                return newWorld.save();
            }
        },
        addCharacter: {
            type: CharacterType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                worldId: {type: new GraphQLNonNull(GraphQLString)},
                userId: {type: new GraphQLNonNull(GraphQLString)},
                story: { type: new GraphQLNonNull(GraphQLString) },
                gender: {type: GraphQLString},
                role: {type: GraphQLString},
                age: { type: GraphQLInt },
                occupation: { type: GraphQLString },
                dateCreated: {type: GraphQLString},
                // add more later
            },
            resolve(parent, args){
                let newCharacter = new character({
                    name: args.name,
                    worldId: args.worldId,
                    userId: args.userId,
                    story: args.story,
                    gender: args.gender,
                    role: args.role,
                    age: args.age,
                    occupation: args.occupation,
                    dateCreated: moment().format('MMM Do YYYY'),
                });
                return newCharacter.save()
            }
        },
        addPost: {
            type: PostType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString)},
                text: { type: new GraphQLNonNull(GraphQLString)},
                characterId: {type: new GraphQLNonNull(GraphQLString)},
                type: {type: new GraphQLNonNull(GraphQLString)},
                worldId: {type: new GraphQLNonNull(GraphQLString)},
                likes: {type:  GraphQLInt},
                deletes: {type: GraphQLInt}
            },
            resolve(parent, args){
                let newPost = new post({
                    title: args.title,
                    text: args.text,
                    type: args.type,
                    characterId: args.characterId,
                    worldId: args.worldId,
                    likes: args.likes,
                    deletes: args.deletes,
                    dateCreated: moment().format('lll'),
                    date: Date.now()
                });
                return newPost.save()
            }
        },
        addPlace: {
            type: PlaceType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                description: { type: new GraphQLNonNull(GraphQLString)},
                charactersId: { type: GraphQLList(GraphQLString) },
                parentPlace: {type: GraphQLString},
                parentPlaceId: {type: GraphQLString}
            },
            resolve(parent, args){
                let newPlace = new place({
                    name: args.name,
                    description: args.description,
                    charactersId: args.charactersId,
                    parentPlace: args.parentPlace,
                    parentPlaceId: args.parentPlaceId
                });
                return newPlace.save()
            }
        },
        deletePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return (post.findByIdAndDelete(args.id))
            }
        },
        updatePost: {
            type: PostType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                likes: {type: GraphQLInt},
                deletes: {type: GraphQLInt},
                likesCharsId: {type: new GraphQLList(GraphQLString)},
                deletesCharsId: {type: new GraphQLList(GraphQLString)},
            },
            resolve(parent, args){
                return post.findByIdAndUpdate(args.id, {likes: args.likes, deletes: args.deletes, likesCharsId: args.likesCharsId, deletesCharsId: args.deletesCharsId})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})