class RatingController {
  constructor(ratingService) {
    this.ratingService = ratingService;
  }

  create = async (req, res) => {
    const result = await this.ratingService.submit(req.body, req.auth.sub);
    return res.status(201).json(result);
  };
}

module.exports = { RatingController };
