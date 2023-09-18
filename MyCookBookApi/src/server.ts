// import 'reflect-metadata';
/*
**
** TESTING ONLY
** FILE IS ONLY FOR LOCAL SERVER SPIN-UP'S
**
*/
// import { container } from 'tsyringe';
import { createInjector } from 'typed-inject';
import express from 'express';
import cors from 'cors';
import { UserController, AuthController } from './layers/controller';
import { RecipeController } from './layers/controller';
import { RecipeRepository } from './layers/repository';
import {RecipeService} from './layers/service/recipeService';
import Logger from './layers/utils/logger';

const logger = Logger.getInstance();
const app = express();

app.use(cors());
app.use(express.json());

const appInjector = createInjector().provideClass('recipeRepository', RecipeRepository).provideClass('recipeService', RecipeService);

const recipeController = appInjector.injectClass(RecipeController);
app.use("/recipes", recipeController.router());
// app.use("/auth", container.resolve(AuthController).router());
// app.use("/recipes", container.resolve(RecipeController).router());
// app.use("/user", container.resolve(UserController).router());


app.listen(3000, () => {
    logger.info({message: "Server started on port 3000"});
})