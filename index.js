const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config()
// middleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('server is running')
})
// mongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@servercluster.nvwzi5y.mongodb.net/?appName=ServerCluster`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("career_zone");
        const dbCollection = database.collection("jobs")

        //get jobs data
        app.get('/jobs', async (req, res) => {
            const result = await dbCollection.find().toArray();
            res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`server running on port${port}`)
})