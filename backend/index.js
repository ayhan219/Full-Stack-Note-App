const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("./models/LoginUser");
const Note = require("./models/Note")
const bcrypt = require("bcrypt");
const cors = require("cors");
dotenv.config();

app.use(cors())

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "The user already exist!" });
    }

    const hashedPW = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPW,
    });
    await newUser.save();
    res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "provide username and password" });
    }
    const checkedUser = await User.findOne({ username });

    if (!checkedUser) {
      return res.status(400).json({ message: "User didn't find" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      checkedUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { username: checkedUser.username, email: checkedUser.email },
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/createnote", async (req,res)=>{
    const {title,content, owner}= req.body;
    try {
        if(!title || !content){
            return res.status(400).json({message:"Provide all information"})
        }
        const newNote = new Note({
            title,
            content,
            owner,
        })
        await newNote.save();
        res.status(200).json({message:"Successfully posted"})
    } catch (error) {
        return res.status(400).json({message:error})
    }

})
app.get("/getnotes",async(req,res)=>{
    try {
        const notes = await Note.find();
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(400).json({message:error})
    }
})
app.put("/getnotes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      if (!title || !content) {
        return res.status(400).json({ message: "Please provide title and content" });
      }
  
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true } // Bu seçenek, güncellenmiş veriyi geri döndürür
      );
  
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.delete("/getnotes/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedNote = await Note.findByIdAndDelete(id);
  
      if (!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
  
      res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
      console.error("Error deleting note:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  


app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server listening on port:${process.env.PORT}`);
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
