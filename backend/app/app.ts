//////////////////////////
///
///  Upgrade: random cookie for JWT reddis layer... first reddis layer
///
///////////////

 
require("dotenv").config();
import express from "express"
import http from 'http'
import socketIO from 'socket.io'
import bodyParser from "body-parser"
import formData from "express-form-data"
import glob from "glob"
import cors from "cors"
import expressPlayground from "graphql-playground-middleware-express"
import { graphqlHTTP } from "express-graphql"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { applyMiddleware } from "graphql-middleware"
import { shield } from "graphql-shield"
import subDomainInitScript from "./subDomain-init";
import domainInitScript from "./domain-init";
import multer from 'multer'
import uploadControllers from "./uploader/uploadControllers.app";

const upload = multer({ dest: 'uploads/' })

const makeApp = async function () {

  const app = express();
  const server = http.createServer(app)

  var corsOptions = {
    origin: "*",
    // origin: "http://localhost:8081",
  };

  //Add on: Anti-DDOS header.__ santization

  // app.use(cors(corsOptions));
  // var whitelist = ['http://localhost:8000', 'http://localhost:8010']
  // var whitelist = ['*']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }

  app.use(cors(corsOptions));


  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // upload

  // schema and database loader
  await domainInitScript({ app })
  await subDomainInitScript({ app })

  // simple route - simple page pointing to both playgrounds...
  app.get("/", (req, res) => {
    res.redirect("./domain/playground");
  });

  // app.post("/api/v1/user-avatar/", upload.single("avatar"), fileUploadsController.setUserAvatar)
  // app.get("/api/v1/user-avatar/:filename", fileUploadsController.getUserAvatar)
  // app.post("/api/v1/user-avatar-preview/", fileUploadsController.setUserAvatarPreview)
  // app.get("/api/v1/user-avatar-preview/:filename", fileUploadsController.getUserAvatarPreview)
  // app.post("/api/v1/company-logo/", setCompanyLogo)
  // app.get("/api/v1/company-logo/:filename", getCompanyLogo)

  await uploadControllers({ app })

  return server
}

export default makeApp

