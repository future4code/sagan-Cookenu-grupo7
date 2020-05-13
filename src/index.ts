import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { signupEndpoint } from "./endPoints/singupEndpoint";
import { loginEndpoint } from "./endPoints/loginEndpoint";
import { getProfile } from "./endPoints/getProfile";
import { deleEndpoint } from "./endPoints/deleteEndpoint";
import { getProfileId } from "./endPoints/getProfileId";
import { newRecipe } from "./endPoints/newRecipe";

dotenv.config();

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
})

app.post("/signup", signupEndpoint);

app.post("/login", loginEndpoint)

app.get("/user/profile", getProfile)

app.delete("/user/:id", deleEndpoint)

app.get("/user/:id", getProfileId)

app.post("/recipe", newRecipe)