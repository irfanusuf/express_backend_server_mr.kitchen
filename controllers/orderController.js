const Order = require("../models/orderModel");
const transporter =require("../utils/nodemailer")


const orderHandler = async (req, res) => {
  try {
    const { name, email, address, phone, order } = req.body;

    const receiver = {
      from: `irfanusuf33@gmail.com`,
      to: `${email}`,
      subject: "Order Confirmation",
      text: `Thank you Mr./Ms. ${name} for placing your order for ${order}. `,
    };

    const executor = {
      from: `irfanusuf33@gmail.com`,
      to: `irfanusuf34@gmail.com`,
      subject: "Kindly execute the order ",
      text: `order details are here : ${name} , ${address} ,  ${phone} order : ${order}`,
    };

    if (name && email && address && phone && order !== "") {
    

      const sendMailClient = await transporter.sendMail(receiver); // mail to customer
      await transporter.sendMail(executor); // mail to order executive

      if (sendMailClient) {
        const newOrder = new Order({ name, address, phone, order });
        await newOrder.save(); // save in mongo db
        res.json({
          message: "Your order has been accepted ..and will ready in 30 mins",
        });
      }
    } else {
      res.json({ message: "kindly fill in the details!" });
    }
  } catch (error) {
    res.json({ message: "server time out" });
    console.log(error);
  }
};

const cancelOrderHandler = async (req, res) => {
  // home work
};

module.exports = { orderHandler, cancelOrderHandler };
