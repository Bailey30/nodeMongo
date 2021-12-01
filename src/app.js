const { connect } = require("http2")
const yargs = require("yargs")

const connection = require("./db/connection.js")
const { addMovie, listMovies, removeMovies, updateRating, updateAny, searchRating, addActor, searchActor } = require("./utils")

const command = process.argv[2]

const app = async () => {
    if (yargs.argv.add) {
        const newMovie = {
            title: yargs.argv.title,
            actor: [yargs.argv.actor],
            rating: yargs.argv.rating
        }
        await connection(addMovie, newMovie)
    } else if (yargs.argv.list) {
        await connection(listMovies)
    } else if (yargs.argv.remove) {
        await connection(removeMovies, yargs.argv.title)
    } else if (yargs.argv.searchRating) {
        console.log("attempting search");
        await connection(searchRating, yargs.argv.rating)
    }
    else if (yargs.argv.changeRating) {
        const newRating = {
            title: yargs.argv.title,
            rating: yargs.argv.rating
        }
        await connection(updateRating, newRating)
    } else if (yargs.argv.addActor) {
        const dataObj = {
            title: yargs.argv.title,
            actor: yargs.argv.actor
        }
        await connection(addActor, dataObj)
    } else if (yargs.argv.searchActor) {
        await connection(searchActor, yargs.argv.actor)
    }
    else {
        console.log("Incorrent input");
    }
}
app(yargs.argv)
// console.log(yargs.argv);