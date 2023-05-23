const express = require("express");
const axios = require("axios");

const router = express.Router()

router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body
    console.log('At server side', email, password);

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": email,
          "User-Secret": password,
        },
      }
    )

    res.status(200).json({ response: chatEngineResponse.data });
    // res.status(200)
  } catch (error) {
    console.error("error: ", error.message);
    res.status(500).json({ error: error.message });
  }
  // res.send("good scn")
  // 
});

router.post("/signup", async (req, res) => {
  try {

    const { email, chatId } = req.body
    console.log(email, chatId);

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/", {
      username: email,
      secret: chatId
    },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY }
      }
    )


    res.status(200).json({ response: chatEngineResponse.data });
  } catch (error) {
    console.error("error: ", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router