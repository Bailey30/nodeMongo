const { connect } = require("http2")
const yargs = require("yargs")

const connection = require("./db/connection.js")
const {addMovie, listMovies, removeMovies ,updateOne} = require("./utils")

const command = process.argv[2]

const app = async () => {
    if (command === "add") {
        const newMovie = {
            title: process.argv[3],
            actor: process.argv[4],
            rating: process.argv[5]
        }
        await connection(addMovie, newMovie)
    } else if (command === "list") {
        await connection(listMovies)
    } else if (command === "remove") {
        await connection(removeMovies, process.argv[3])
    } else if (command === "updateone") {
        const newRating = {
            title: process.argv[3],
            rating: process.argv[4]
        }
        await connection(updateOne, newRating)
    }
    else {
        console.log("Incorrent input");
    }
}
app()