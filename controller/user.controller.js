const { registerServices, loginServices } = require("../services/user.services");

const userRegister = async (req, res) => {
  try {
    const user = await registerServices(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const data = await loginServices(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { userLogin, userRegister };
