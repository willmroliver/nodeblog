const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require('dotenv');

dotenv.config();

const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;

const dbName = "nodeBlogDB";
const collection = "posts";

const uri = "mongodb+srv://"+username+":"+password+"@githubprojectcollection.87ewy.mongodb.net/"+dbName+"?retryWrites=true&w=majority";

const client = new MongoClient(uri);


const uploadPost = (post) => {
    async function run() {
        try {
            await client.connect();
            const database = client.db(dbName);
            const posts = database.collection(collection);
            
            const result = await posts.insertOne(post);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
}
module.exports.uploadPost = uploadPost;


const deletePost = (postId) => {
    async function run() {
        try {
            await client.connect();
            const database = client.db(dbName);
            const posts = database.collection(collection);
            
            const result = await posts.deleteOne(
                { '_id' : ObjectId(postId) }
            )
            console.log(result.deletedCount + " documents deleted");
        } finally {
            await client.close();
        }
    }
    run().catch(console.dir);
}
module.exports.deletePost = deletePost;


const findPost = (postId) => {
    async function run() {
        try {
            await client.connect();
            const database = client.db(dbName);
            const posts = database.collection(collection);
            
            const result = await posts.findOne(
                { '_id' : ObjectId(postId) }
            )
            
            return result;
        } finally {
            await client.close();
        }
    }
    return run().catch(console.dir);
}
module.exports.findPost = findPost;


const findAllPosts = () => {
    async function run() {
        try {
            await client.connect();
            const database = client.db(dbName);
            const posts = database.collection(collection);
            
            const result = posts.find({});
            const postsArray = await result.toArray();

            console.log(postsArray);

            return postsArray;
        } finally {
            await client.close();
        }
    }
    return run().catch(console.dir);
}
module.exports.findAllPosts = findAllPosts;