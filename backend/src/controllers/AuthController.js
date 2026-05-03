class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  signup = async (req, res) => {
    const result = await this.authService.signup(req.body);
    return res.status(201).json(result);
  };

  login = async (req, res) => {
    const result = await this.authService.login(req.body);
    return res.status(200).json(result);
  };

  forgotPassword = async (req, res) => {
    const result = await this.authService.resetPassword(req.body);
    return res.status(200).json(result);
  };
}

module.exports = { AuthController };
