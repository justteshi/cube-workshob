const Accessory = require('../models/accessory')

const getAllAccessories = async () => {

    const accessories = await Accessory.find().lean()
    //console.log('Cubes', cubes)
    return accessories
}

const getAccessory = async (id) => {

    const accessory = await Accessory.findById(id).lean()
    //console.log(cube)
    return accessory
}


module.exports = {
    getAllAccessories,
    getAccessory,
} 