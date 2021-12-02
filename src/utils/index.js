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
exports.removeMovies = async (collection, args) => { // removes from database
    try {
        await collection.deleteOne({ "title": args })
        console.log(`${args} removed`);
    } catch (error) {
        console.log(error);
    }
}

exports.updateMany = async (collection, args) => { //searches for key value pair and updates defined key value pair
    try {
        const list = await collection.updateMany({[args.key1]: args.value1}, {$set: {[args.key2]: args.value2}})
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}


exports.updateRating = async (collection, args) => { //updates rating
    try {
        await collection.updateOne({"title": args.title}, {$set: {"rating": args.rating}})
    } catch (error) {
        console.log(error);
    }
}
exports.searchRating = async (collection, args) => { //search for films with defined rating
    try {
        const list = await collection.find({"rating": args}).toArray()
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.addActor = async (collection, args) => { //adds to actor array
    try {
        await collection.updateOne({"title": args.title}, {$push: {"actor": args.actor}} )
    } catch (error) {
        console.log(error);
    }
}
exports.searchActor = async (collection, args) => { //search for actor
    try {
        const list = await collection.find({"actor": args}).toArray()
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.searchAll = async (collection, args) => { //search for title, actor or rating
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

exports.removeDuplicates = async (collection, args) => { // removes duplicates from database - dont use on actors - ugly code, probably shouldnt use at all
    try {
        const list = await collection.find().toArray()
        for (let i = 0; i < list.length; i++) {
            const list = await collection.find().toArray()
            if (Object.values(list[i]).includes(args)) {
                this.removeMovies(collection, args)
            } 
        }
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteMany = async (collection, args) => { // remove every instance of film with same name
    try {
        const list = await collection.deleteMany ({"title": args})
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}

exports.searchTerm = async (collection, args) => { ///searches for words rather than complete names. returns in order of relevance
    try {
        const list = await collection.find( {$text: { $search: args}}, {score: {$meta: "textScore"}}).toArray()
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.findAndUpdate = async (collection, args) => { ///updates actor only
    try {
    const list = await collection.findOneAndUpdate( { "title" : args.title }, {$set: { "actor": args.actor}})
    console.log(list);
    } catch (error) {
        console.log(error);
    }
}
exports.setValue = async (collection, args) => { //updates any value or creates new value
    try {
        const list = await collection.updateOne({"title": args.title}, {$set: {[args.key]: args.value}})
        console.log(list);
    } catch (error) {
        console.log(error);
    }
}