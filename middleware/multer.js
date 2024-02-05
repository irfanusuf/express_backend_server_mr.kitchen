const multer = require ("multer")



// const upload = multer({ dest: 'uploads/' })


const upload = multer({  dest: 'uploads/'  ,  limits: {
    fieldSize: 1024 * 1024 * 5, 
  }, }); 



// const multerMid = async (req , res ) =>{


//    const image = req.body.image  
//   upload.single(image)


// }


const multerMid = upload.single('image')
const multVid = upload.single('video')


module.exports = multerMid