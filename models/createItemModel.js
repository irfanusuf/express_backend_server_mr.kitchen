
const mongooose = require('mongoose')



const Item =  mongooose.model('Item',{


    title : String,
    imageUrl : String,
    description : String,
    likes : [],
    review : []


} )



module.exports = Item