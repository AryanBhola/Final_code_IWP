const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8090;

app.get("/", (req, res) => {
  res.json({ message: "server is running 8090" });
});

const studentSchema = mongoose.Schema(
  {
    image: String,
    name: String,
    address: String,
    grade: Number,
    class: String,
    homeMobile: String,
    motherName: String,
    fatherName: String,
    motherMobile: String,
    fatherMobile: String,
    isMotherEmployed: Boolean,
    motherEmployerName: String,
    motherJobPosition: String,
    isFatherEmployed: Boolean,
    fatherEmployerName: String,
    fatherJobPosition: String,
    hasSiblings: Boolean,
    sibling1Name: String,
    sibling2Name: String,
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("student", studentSchema);

// create data // save data to MongoDB
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new studentModel(req.body);
  await data.save();

  res.json({ success: true, message: "data saved successfully", data: data });
});
// Read - Fetch all data
app.get("/getData", async (req, res) => {
  try {
    const data = await studentModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
});

// update data
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;

  console.log(rest);
  const data = await studentModel.updateOne({ _id: _id }, rest);

  res.send({ success: true, message: "data updated successfully", data: data });
});

// delete data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await studentModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully", data: data });
});
mongoose
  .connect("mongodb+srv://aryanbhola2021:aryanbhola@iwp-cluster.p2n0q.mongodb.net/")
  .then(async () => {
    console.log("Connected to DB");

    // Check if data exists, if not, add multiple dummy students
    const count = await studentModel.countDocuments();
   
      await studentModel.insertMany([
        {
          name: "Alice Johnson",
          address: "456 Maple St",
          grade: 9,
          class: "9B",
          homeMobile: "1111111111",
          motherName: "Catherine Johnson",
          fatherName: "David Johnson",
          motherMobile: "1111111112",
          fatherMobile: "1111111113",
          isMotherEmployed: true,
          motherEmployerName: "Tech World",
          motherJobPosition: "Designer",
          isFatherEmployed: true,
          fatherEmployerName: "Health Co",
          fatherJobPosition: "Doctor",
          hasSiblings: false
        },
        {
          name: "Bob Smith",
          address: "789 Oak Ave",
          grade: 10,
          class: "10A",
          homeMobile: "2222222222",
          motherName: "Laura Smith",
          fatherName: "Tom Smith",
          motherMobile: "2222222223",
          fatherMobile: "2222222224",
          isMotherEmployed: false,
          fatherEmployerName: "Finance Hub",
          fatherJobPosition: "Accountant",
          hasSiblings: true,
          sibling1Name: "Charlie Smith"
        },
        {
          name: "Charlie Brown",
          address: "123 Pine St",
          grade: 8,
          class: "8C",
          homeMobile: "3333333333",
          motherName: "Sarah Brown",
          fatherName: "Chris Brown",
          motherMobile: "3333333334",
          fatherMobile: "3333333335",
          isMotherEmployed: true,
          motherEmployerName: "Retail Giant",
          motherJobPosition: "Manager",
          isFatherEmployed: false,
          hasSiblings: true,
          sibling1Name: "Sam Brown"
        },
        {
          name: "David Lee",
          address: "321 Birch Rd",
          grade: 12,
          class: "12D",
          homeMobile: "4444444444",
          motherName: "Helen Lee",
          fatherName: "Frank Lee",
          motherMobile: "4444444445",
          fatherMobile: "4444444446",
          isMotherEmployed: false,
          isFatherEmployed: true,
          fatherEmployerName: "Construction Co",
          fatherJobPosition: "Engineer",
          hasSiblings: false
        },
        {
          name: "Eve Kim",
          address: "789 Cedar Blvd",
          grade: 11,
          class: "11E",
          homeMobile: "5555555555",
          motherName: "Anna Kim",
          fatherName: "Daniel Kim",
          motherMobile: "5555555556",
          fatherMobile: "5555555557",
          isMotherEmployed: true,
          motherEmployerName: "Finance Partners",
          motherJobPosition: "Analyst",
          isFatherEmployed: true,
          fatherEmployerName: "Tech Corp",
          fatherJobPosition: "Product Manager",
          hasSiblings: false
        },
        {
          name: "Frank Zhao",
          address: "654 Cherry Ln",
          grade: 7,
          class: "7A",
          homeMobile: "6666666666",
          motherName: "Linda Zhao",
          fatherName: "Mike Zhao",
          motherMobile: "6666666667",
          fatherMobile: "6666666668",
          isMotherEmployed: true,
          motherEmployerName: "Media House",
          motherJobPosition: "Editor",
          isFatherEmployed: true,
          fatherEmployerName: "Local Bank",
          fatherJobPosition: "Branch Manager",
          hasSiblings: true,
          sibling1Name: "Grace Zhao"
        },
        {
          name: "Grace Wong",
          address: "987 Elm St",
          grade: 5,
          class: "5B",
          homeMobile: "7777777777",
          motherName: "Rebecca Wong",
          fatherName: "Henry Wong",
          motherMobile: "7777777778",
          fatherMobile: "7777777779",
          isMotherEmployed: false,
          isFatherEmployed: true,
          fatherEmployerName: "Car Dealership",
          fatherJobPosition: "Sales Manager",
          hasSiblings: true,
          sibling1Name: "Ian Wong",
          sibling2Name: "Jill Wong"
        },
        {
          name: "Hannah Green",
          address: "246 Aspen St",
          grade: 6,
          class: "6C",
          homeMobile: "8888888888",
          motherName: "Melissa Green",
          fatherName: "Joe Green",
          motherMobile: "8888888889",
          fatherMobile: "8888888880",
          isMotherEmployed: true,
          motherEmployerName: "Tech Corp",
          motherJobPosition: "HR Specialist",
          isFatherEmployed: false,
          hasSiblings: false
        },
        {
          name: "Ian Thomas",
          address: "135 Maple St",
          grade: 4,
          class: "4D",
          homeMobile: "9999999999",
          motherName: "Sophia Thomas",
          fatherName: "James Thomas",
          motherMobile: "9999999991",
          fatherMobile: "9999999992",
          isMotherEmployed: true,
          motherEmployerName: "Local Library",
          motherJobPosition: "Librarian",
          isFatherEmployed: true,
          fatherEmployerName: "County Office",
          fatherJobPosition: "Administrator",
          hasSiblings: true,
          sibling1Name: "Kate Thomas"
        },
        {
          name: "Jack Wilson",
          address: "789 Fir St",
          grade: 3,
          class: "3A",
          homeMobile: "1010101010",
          motherName: "Natalie Wilson",
          fatherName: "Sam Wilson",
          motherMobile: "1010101011",
          fatherMobile: "1010101012",
          isMotherEmployed: false,
          isFatherEmployed: true,
          fatherEmployerName: "Logistics Ltd",
          fatherJobPosition: "Truck Driver",
          hasSiblings: false
        }
      ]);
      console.log("10 dummy students added");
    

    app.listen(PORT, () => console.log("Server is running on port " + PORT));
  })
  .catch((err) => console.log(err));
