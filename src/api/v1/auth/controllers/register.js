const authServices = require("../../../../services/auth");
const { generateToken } = require("../../../../services/token");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    
    const user = await authServices.register({ name, email, password });

    //  generate token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateToken({ payload });

    // veriyfication email
    // boradcast and event

    // response
    const response = {
      code: 201,
      message: "Registration successful",
      data: {access_token:accessToken},
      links: {
        self: "/auth/register",
        signin: "/auth/login",
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = register;
