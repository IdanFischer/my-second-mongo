import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
import { get } from "http";
import { object } from "webidl-conversions";
dotenv.config();

const client = new MongoClient(process.env.URI);
const db = client.db(process.env.DB_NAME);

const collection = db.collection('movies');

/* Object
********************************************* */

const movie1 = {
    title: "Matrix 2",
    rating: "R-18",
    genre: "Sci-Fier",
    time: "foreverer"
}

/* CRUD: Create
********************************************* */

const addDoc = async thisDoc => {
    await collection.insertOne(thisDoc);
    console.log("Result Doc Add:", thisDoc)
}

/* CRUD: READ
********************************************* */

const getDocListing = async limitQuery => {
    const result = await collection.find({}).limit(limitQuery).toArray()
    console.table(result)
}

/* CRUD: UPDATE
********************************************* */

const updateDoc = async (docId, fieldName, fieldValue) => {
    const updateID = {_id: new ObjectId(docId)}
    const updateQuery = { $set: {[fieldName]: fieldValue} }
    const result = await collection.findOneAndUpdate(updateID, updateQuery)
    
}
/* CRUD: DELETE
********************************************* */

const deleteDoc = async docId1 => {
    // await collection.deleteOne(_id: new ObjectId(docId1)); works too, both are the same thing essentially
    const deleteID = {_id: new ObjectId(docId1)}
    await collection.deleteOne(deleteID);
}

// await updateDoc("63c9a51dd92adbdc8c319f32", "rating", "G")
// await addDoc(movie1)
await deleteDoc("63c9a853eb5eb09914709900")
await getDocListing(0)
client.close()
