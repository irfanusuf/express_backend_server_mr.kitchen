const Item = require("../models/createItemModel");
const User = require("../models/userModel");



//home work: same user is not allowed to like and dislike the same item ...? solve this in below apis

const likeHandler = async (req, res) => {
  try {
    const { userId } = req.info;    // is an object in which decoded info of token is stored
    const { itemId } = req.query;
    const isItem = await Item.findById(itemId);

    const alreadyLiked = await isItem.likes.findIndex(
      (individualLike) => individualLike.user._id.toString() === userId
    )

    if (userId) {
      console.log(alreadyLiked)
     
      if (alreadyLiked === -1) {
     
       await isItem.likes.push({ user: userId });
       const likePost =  await isItem.save();

        if (likePost) {
          res.json({ message: "Post Liked" });
        } else {
          res.json({ message: "Some Error!" });
        }
      } else {
        res.json({ message: "U already Liked The Post!" });
      }
    } else {
      res.json({ message: "Loggin first" });
    }
  } catch (err) {
    console.log(err);
  }
};




const unlikeHandler = async (req, res) => {
  try {
    const { userId } = req.info;    // is an object in which decoded info of token is stored
    const { itemId } = req.query;
    const isItem = await Item.findById(itemId);

    const alreadyUnLiked = await isItem.unlikes.findIndex(
      (individualLike) => individualLike.user._id.toString() === userId
    )
    
    if (userId) {
      
     
      if (alreadyUnLiked === -1) {
     
       await isItem.unlikes.push({ user: userId });
       const unlikePost =  await isItem.save();

        if (unlikePost) {
          res.json({ message: "Post UnLiked" });
        } else {
          res.json({ message: "Some Error!" });
        }
      } else {
        res.json({ message: "U already unliked The Post!" });
      }
    } else {
      res.json({ message: "Loggin first" });
    }
  } catch (err) {
    console.log(err.message);
  }
};


module.exports = { likeHandler ,unlikeHandler  };
