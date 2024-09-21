const authServices = require("../../../../services/auth");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {

    const accessToken = await authServices.login({ email, password });
 

    //generate response
    const response = {
      code: 201,
      message: "Login successful",
      data: { access_token: accessToken },
      links: {
        self: "/auth/signin",
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = login;
