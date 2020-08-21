export default function errorHandling(error, req, res, next) {
  if (error.joi) {
    return res.status(400).json({ error: error.joi.message });
  }
  return res.status(500).send(error);
}
