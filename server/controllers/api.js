// api controller

exports.alive = (req, res) => {
  res.send({
    location: "api",
    status: "alive"
  });
}
