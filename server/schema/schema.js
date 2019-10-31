const graphql = require('graphql');
const character = require('../models/character');
const place = require('../models/place');
const post = require('../models/post');
const user = require('../models/user');
const world = require('../models/world');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLNonNull } = graphql;

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
        birthmarks: { type: GraphQLList },
        onAdoption: { type: GraphQLBoolean },

        librariesId: { type: new GraphQLList(GraphQLID) },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.find({name: parent.authorName});
            }
        },
        library: {
            type: new GraphQLList(LibraryType),
            resolve(parent, args) {
                return Library.find({_id: {$in: parent.librariesId} });
            }
        }
    })
})
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorName: parent.name });
            }
        }
    })
})
const LibraryType = new GraphQLObjectType({
    name: 'Library',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        userId: {type: GraphQLID},
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ librariesId : parent.id });
            }
        },
        membershipFee: { type: GraphQLFloat },
        houseRules: { type: GraphQLString },
        additionalFeatures: { type: GraphQLString },
        reviews: { type: GraphQLString },
        User: {
            type: UserType,
            resolve(parent, args){
                return User.findOne({_id: parent.userId})
            }
        }
    })
})
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        email: {type: GraphQLString},
        library: {
            type: new GraphQLList(LibraryType),
            resolve(parent, args) {
                return Library.find({userId: parent.id });
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        library: {
            type: LibraryType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Library.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return User.findById(args.id);
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Author.findById(args.id);
            }
        },
        libraries: {
            type: new GraphQLList(LibraryType),
            resolve(parents, args) {
                return Library.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args) {
                return Author.find({});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return Book.find({});
            }
        }
    })
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addLibrary: {
            type: LibraryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                membershipFee: { type: new GraphQLNonNull(GraphQLString) },
                userId: { type: new GraphQLNonNull(GraphQLID) },
                houseRules: { type: GraphQLString },
                additionalFeaturs: { type: GraphQLString },
                reviews: { type: GraphQLString }
            },
            resolve(parent, args) {
                let library = new Library({
                    name: args.name,
                    address: args.address,
                    userId: args.userId,
                    membershipFee: args.membershipFee,
                    houseRules: args.houseRules,
                    additionalFeaturs: args.additionalFeatures,
                    reviews: args.reviews
                });
                return library.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLString },
                authorName: { type: new GraphQLNonNull(GraphQLString) },
                librariesId: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorName: args.authorName,
                    librariesId: args.librariesId
                });
                return (Book.findOne({name: { $regex : new RegExp(book.name, "i") }, authorName: {$regex : new RegExp(book.authorName, "i")} }, function(err, doc){
                    console.log(doc);
                    if (err){
                        return err
                    }
                    else if (!doc){
                        return book.save();
                    }
                    else{
                        if (!doc.librariesId.includes(book.librariesId[0])){
                            doc.librariesId.push(book.librariesId[0]);
                        }
                        return doc.save();
                    }
                }))
            }
        },
        
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name
                });
                return (Author.findOne({name: author.name}, function(err, doc){
                    console.log(doc);
                    if (err){
                        return err
                    }
                    else if (!doc){
                        return author.save();
                    }
                    else{
                        return doc.save();
                    }
                }))
            }
        },
        removeBook: {
            type: BookType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
                librariesId: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args){
                return (Book.findOne({_id: args.id}, function(err, doc){
                    console.log(doc);
                    if (err){
                        return err
                    }
                    else{
                        doc.librariesId.splice(doc.librariesId.indexOf(args.librariesId[0]), 1);
                        if (doc.librariesId.length === 0)
                        {
                            return doc.delete();
                        }
                        else {
                            return doc.save();
                        }
                        
                    }
                }))
            }
        },
        removeLibrary: {
            type: LibraryType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args){
                return (Library.findByIdAndDelete(args.id))
            }
        },
        removeBooksInLibrary: {
            type: BookType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return (Book.find({librariesId: args.id}, function(err, doc){
                    console.log(doc);
                    if (err){
                        return err
                    }
                    else{
                        for(var i = 0; i < doc.length; i++){
                            doc[i].librariesId.splice(doc[i].librariesId.indexOf(args.id), 1);
                            if (doc[i].librariesId.length === 0)
                            {
                                doc[i].delete();
                            }
                            else {
                                doc[i].save();
                            }
                        } 
                        return 
                    }
                }))
            }
        }
    })
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})