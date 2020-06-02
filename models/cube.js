const  { v4 } = require('uuid');
const { saveCube } = require('../controllers/database')

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
        saveCube(newCube)
    }
}

module.exports = Cube