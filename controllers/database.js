const fs = require('fs')
const path = require('path')

const dbFile = path.join(__dirname,'..', 'config/database.json')

const saveCube = (cube) => {
    getCubes((cubes) =>{

        cubes.push(cube)
        fs.writeFile(dbFile, JSON.stringify(cubes), (err) => {
    
            if(err){
                throw err
            }
            console.log('New Cube is stored in db')
        })
    })
}

const getCube = (id, callback) => {
    getCubes(cubes => {
        const cube = cubes.filter(c => c.id === id)[0]
        callback(cube)
    })
}

const getCubes = (callback) => {

    fs.readFile(dbFile, (err, dbData) => {
        if(err){
            throw err
        }
        const cubes = JSON.parse(dbData)
        callback(cubes)
    })
}

module.exports = {
    getCube,
    getCubes,
    saveCube
}