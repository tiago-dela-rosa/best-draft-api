import jwt from "jsonwebtoken";
import logger from "./logger";
import { Request as req, Response as res, NextFunction as next } from "express";

export default function VerifyJWT(req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.DEV_AUTH_SECRET, function (err, decoded) {
    if (err) {
      logger.info(`Jwt verify Error ${JSON.stringify(err)}`);
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}
