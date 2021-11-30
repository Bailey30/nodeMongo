exports.addMovie = async (collection, dataObj) => {
    try {
        await collection.insertOne(dataObj)
    } catch (error) {
        console.log(error);
    }
}
exports.listMovies = async (collection) => {
    try {
        const listAll = await collection.find().toArray()
        console.log(listAll);
    } catch (error) {
        console.log(error);
    }
}
exports.removeMovies = async (collection, args) => {
    try {
        await collection.deleteMany({ "title": args })
        console.log(`${args} removed`);
    } catch (error) {
        console.log(error);
    }
}
exports.updateOne = async (collection, args) => {
    try {
        await collection.updateOne({"title": args.title}, {$set: {"rating": args.rating}})
    } catch (error) {
        console.log(error);
    }
}