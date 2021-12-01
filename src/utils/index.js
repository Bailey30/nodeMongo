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
exports.searchAll = async (collection, args) => {
    try {
        const list = await collection.find({$or: [{"title": args},{"actor": args}, {"rating": args} ]}).toArray()
        // for (let i = 0; i < list.length/2; i++) {
        //     let x = list[i]
        //     let y = list[(list.length/2)-1]
        //     if (x === y) {
        //         list.splice(i, 1)
        //     } //// removes duplicates from the array that is logged
        // }
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}

exports.removeDuplicates = async (collection, args, removeMovies) => {
    try {
        const list = await collection.find().toArray()
        for (let i = 0; i < list.length; i++) {
            const list = await collection.find().toArray()
            if (Object.values(list[i]).includes(args)) {
                this.removeMovies(collection, args)
            } // removes duplicates from database - dont use on actors
        }
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.searchTerm = async (collection, args) => { ///searches for partial names
    try {
        const list = await collection.find( {$text: { $search: args}}, {score: {$meta: "textScore"}}).toArray()
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.findAndUpdate = async (collection, args) => {
    try {
    const list = await collection.findOneAndUpdate( { "title" : args.title }, {$set: { "actor": args.actor}})
    console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.setValue = async (collection, args) => {
    

    try {
        const list = await collection.updateOne({"title": args.title}, {$set: {[args.key]: args.value}})
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}