const express = require("express");
const app = express();
const port = 8080;
const userRouter = require("./routes/user");
const dbConnect = require("./db/database");
const authenticate = require("./middleware/middleware");
const User = require("./models/user");
const productRouter = require("./routes/products");
const cors = require("cors");
const cartRouter = require("./routes/cart");
const orderReducer = require("./routes/order");
const adminRouter = require("./routes/admin");

dbConnect().catch((err) => console.log(`Connecting to database failed ${err}`));

app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/", productRouter);
app.use("/", cartRouter);
app.use("/", orderReducer);
app.use("/", adminRouter);

app.get("/", authenticate, async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  res.send(user);
});

app.listen(port, () => console.log(`Server is running on ${port}`));
