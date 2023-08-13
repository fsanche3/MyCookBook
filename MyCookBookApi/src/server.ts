import 'reflect-metadata';
/*
** TESTING ONLY
** FILE IS ONLY FOR LOCAL SERVER SPIN-UP'S
*/
import { container } from 'tsyringe';
import express from 'express';  
import cors from 'cors';
import RecipeController from './controller/recipeController';
import Logger from './utils/logger';

const logger = Logger.getInstance();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/recipes", container.resolve(RecipeController).router());

app.get("/health", (req, res) => {res.send("Healthy")})

app.listen(3000, () => {
    logger.info({message: "Server started on port 3000"});
})