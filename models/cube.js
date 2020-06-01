const  { v4 } = require('uuid');
const fs = require('fs');
const path = require('path')

const dbFile = path.join(__dirname,'..', 'config/database.json')

class Cube {
    constructor(name, description, imageUrl, difficulty){
        this.id = v4()
        this.name = name || "no name"
        this.description = description
        this.imageUrl = imageUrl || "laceholder"
        this.difficulty = difficulty || 0

    }

    //save Cube
    save(){
        
        //TODO validation

        const newCube    ={
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficulty: this.difficulty

        }
        fs.readFile(dbFile, (err, dbData) => {
            if(err){
                throw err
            }
            const cubes = JSON.parse(dbData)
            console.log(cubes)

            cubes.push(newCube)

            fs.writeFile(dbFile, JSON.stringify(cubes), (err) => {

                if(err){
                    throw err
                }
                console.log('New Cube is stored in db')
            })
        })
    }
}

module.exports = Cube