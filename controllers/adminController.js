const Item = require("../models/createItemModel");
const cloudinary = require("../utils/cloudinary");

const createItemHandler = async (req, res) => {
  try {
    const { title, description , price } = req.body;
    const image = req.file.path;

    if (title !== "" && description !== "" && price !=="") {
      const upload = await cloudinary.uploader.upload(image, {
        folder: "mr. kitchen Items",
      });

      const imageUrl = upload.secure_url;

      if (upload) {
        const item = new Item({ title, description,price, imageUrl });
        const saveItem = await item.save();

        if (saveItem) {
          res.json({ message: "Item saved " });
        } else {
          res.json({ message: "file system error" });
        }
      } else {
        res.json({ message: "Cloudinary Error" });
      }
    } else {
      res.json({ message: "All Feilds Required!" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();

    if (items) {
      res.json({ message: "All Items are here!", items });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { createItemHandler, getAllItems };
