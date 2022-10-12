router.get("/game", async (req, res, next) => {
  try {
    const spaceshipList = await Spaceship.findAll({
      where: { id: req.user.id },
    });
    const userDetail = await User.findAll({
      where: { id: req.user.id },
    });
    res
      .status(200)
      .json({ success: true, data: spaceshipList, message: "success" });
    res
      .status(200)
      .json({ success: true, data: userDetail, message: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
