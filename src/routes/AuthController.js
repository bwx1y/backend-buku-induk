const { Router } = require("express");
const { Models } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { loginRequest, generateTokenRequest, getMeRequest } = require("../DTO/login-request");
const nodemailer = require("nodemailer");

const router = Router();

function makeRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

router.post("/login", loginRequest, async (req, res) => {
  const { email, password } = req.body;
  const data = await Models.user.findOne({
    where: {
      email,
      password,
    },
  });

  if (data == undefined) {
    res.status(400).json({ message: "not found user" });
    return;
  }

  // const transporter = nodemailer.createTransport({
  //   host: "smtp.elasticemail.com",
  //   port: 2525,
  //   secure: false,
  //   auth: {
  //     user: "nedynugroho2007@gmail.com",
  //     pass: "8DADBBAD601E031C75B1E92937DEB35E1662",
  //   },
  // });

  const code = makeRandomString(5);

  // transporter.sendMail(
  //   {
  //     from: "nedynugroho2007@gmail.com",
  //     to: data.email,
  //     subject: "Buku Induk Code",
  //     html: `<h1>Your Code: ${code}</>`,
  //   },
  //   (err, info) => {
  //     if (err) {
  //       res.status(500).json(err.message);
  //       return;
  //     }
  //   }
  // );

  await Models.user.update(
    {
      code: code,
    },
    {
      where: {
        id: data.id,
      },
    }
  );

  res.json({ code });
});

router.post("/generate-code", generateTokenRequest, async (req, res) => {
  const { code } = req.body;
  const data = await Models.user.findOne({
    where: {
      code: code,
    },
  });

  if (data == undefined) {
    res.status(400).json({ message: "not found user" });
    return;
  }

  const token = uuidv4();
  await Models.user.update(
    {
      token,
      code: null,
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  res.json({
    email: data.email,
    username: data.username,
    role: data.role,
    token: token,
  });
});

router.get("/me", getMeRequest, async (req, res) => {
  const data = await Models.user.findOne({
    where: {
      id: req.user_id,
    },
    attributes: ["id", "username", "role", "email"],
  });
  res.json(data);
});

module.exports = router;
