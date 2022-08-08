exports.HelloGet = (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Hello Get!",
  });
};

exports.HelloPost = (req, res) => {
  res.status(201).json({
    status: "Success",
    message: "Hello Post!",
  });
};
