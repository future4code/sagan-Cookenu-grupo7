import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { signupEndpoint } from "./endPoints/singupEndpoint";
import { loginEndpoint } from "./endPoints/loginEndpoint";
import { getProfile } from "./endPoints/getProfile";
import { deleteProfileEndpoint } from "./endPoints/deleteProfileEndpoint";
import { getProfileById } from "./endPoints/getProfileById";
import { newRecipe } from "./endPoints/newRecipe";
import { getFeed } from "./endPoints/getFeed";
import { followUser } from "./endPoints/followUser";
import { unfollowUser } from "./endPoints/unfollowUser";
import { getRecipeById } from "./endPoints/getRecipeById";
import { editRecipeEndpoint } from "./endPoints/editRecipeEndpoint";
import { deleteRecipe } from "./endPoints/deleteRecipe";

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

app.delete("/user/:id", deleteProfileEndpoint)

app.get("/user/feed", getFeed)

app.get("/user/:id", getProfileById)

app.post("/recipe/edit", editRecipeEndpoint)

app.delete("/recipe/delete", deleteRecipe)

app.post("/recipe", newRecipe)

app.get("/recipe/:id", getRecipeById)

app.post("/user/follow", followUser)

app.post("/user/unfollow", unfollowUser)
