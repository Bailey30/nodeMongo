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
        await collection.deleteOne({ "title": args })
        console.log(`${args} removed`);
    } catch (error) {
        console.log(error);
    }
}
exports.updateRating = async (collection, args) => {
    try {
        await collection.updateOne({"title": args.title}, {$set: {"rating": args.rating}})
    } catch (error) {
        console.log(error);
    }
}
exports.searchRating = async (collection, args) => {
    try {
        const list = await collection.find({"rating": args}).toArray()
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.addActor = async (collection, args) => {
    try {
        await collection.updateOne({"title": args.title}, {$push: {"actor": args.actor}} )
    } catch (error) {
        console.log(error);
    }
}
exports.searchActor = async (collection, args) => {
    try {
        const list = await collection.find({"actor": args}).toArray()
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}