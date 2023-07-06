const express = require("express");
const cors = require("cors");
const app = express();
import mongoose from "mongoose";
import user from './modals/user';


let db;



app.use(cors());
app.use(express.json());

const router = express.Router();

router.route("/").get(function (req, res) {
  db.collection("user")
    .find()
    .toArray(function (err, items) {
      res.send(items);
    });
});

router.route("/add").post(function (req, res) {
  db.collection("user").insertOne(req.body, function (err, info) {
    res.json(info);
  });
});

router.route("/update/:id").put(function (req, res) {
  db.collection("user").findOneAndUpdate(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        fullname: req.body.fullname,
        address: req.body.address,
        ph_number: req.body.ph_number,
      },
    },
    function () {
      res.send("Success updated!");
    }
  );
});

router.route("/delete/:id").delete(function (req, res) {
  db.collection("user").deleteOne(
    { _id: new ObjectId(req.params.id) },
    function () {
      res.send("Successfully deleted!");
    }
  );
});

app.use("/contactlist", router);

