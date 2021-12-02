const { connect } = require("http2")
const yargs = require("yargs")

const connection = require("./db/connection.js")
const { addMovie, listMovies, removeMovies, updateRating, searchRating, addActor, searchActor, searchAll, removeDuplicates, searchTerm, findAndUpdate, setValue, deleteMany, updateMany } = require("./utils")

const command = process.argv[2]

const app = async () => {
    if (yargs.argv.add) { //add movie
        const newMovie = {
            title: yargs.argv.title,
            actor: [yargs.argv.actor],
            rating: yargs.argv.rating
        }
        await connection(addMovie, newMovie)
    } else if (yargs.argv.list) { // list movies
        await connection(listMovies)
    } else if (yargs.argv.remove) { // remove one movie
        await connection(removeMovies, yargs.argv.title)
    } else if (yargs.argv.searchRating) { // search by rating
        console.log("attempting search");
        await connection(searchRating, yargs.argv.rating)
    }
    else if (yargs.argv.changeRating) { // change rating of one film
        const newRating = {
            title: yargs.argv.title,
            rating: yargs.argv.rating
        }
        await connection(updateRating, newRating)
    } else if (yargs.argv.addActor) { // add actor to a film
        const dataObj = {
            title: yargs.argv.title,
            actor: yargs.argv.actor
        }
        await connection(addActor, dataObj)
    } else if (yargs.argv.searchActor) { // search films by actor
        await connection(searchActor, yargs.argv.actor)
    } else if (yargs.argv.searchAll) { // search titles, actors and ratings
        await connection(searchAll, yargs.argv.query)
    } else if (yargs.argv.removeDuplicates) { // removes duplicates from database
        await connection(removeDuplicates, yargs.argv.query)
    } else if (yargs.argv.searchTerm) { // search by term eg first or last name
        await connection(searchTerm, yargs.argv.term)
    } else if (yargs.argv.findandupdate) { // search for a film and change the actor
        const searchData = {
            title: yargs.argv.title,
            actor: yargs.argv.actor
        }
        await connection(findAndUpdate, searchData)
    } else if (yargs.argv.setvalue) { // search by title, add or change and value
        const setData = {
            title: yargs.argv.title,
            key: yargs.argv.key,
            value: yargs.argv.value
        }
        await connection(setValue, setData)
    } else if (yargs.argv.deletemany) { // delete every instance with same title
        await connection(deleteMany, yargs.argv.title)
    } else if (yargs.argv.updatemany) { // search by any key:value pair and update or add any key:value pair in every matching instance eg all films with sean bean change rating
        const dataObj = {
            key1: yargs.argv.key1,
            value1: yargs.argv.value1,
            key2: yargs.argv.key2,
            value2: yargs.argv.value2,
        }
        await connection(updateMany, dataObj)
    }
    else {
        console.log("Incorrent input");
    }
}
app(yargs.argv)
// console.log(yargs.argv);