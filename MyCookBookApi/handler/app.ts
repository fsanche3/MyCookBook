import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy } from "aws-serverless-express";
import { UserController, AuthController } from '../src/layers/controller';
import { RecipeController } from '../src/layers/controller/recipeController';
import { RecipeRepository } from '../src/layers/repository';
import {RecipeService} from '../src/layers/service/recipeService';
import { createInjector } from 'typed-inject';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());
app.use(express.json());


const appInjector = createInjector().provideClass('recipeRepository', RecipeRepository).provideClass('recipeService', RecipeService);

const recipeController = appInjector.injectClass(RecipeController);
app.use("/recipes", recipeController.router());
// app.use("/auth", container.resolve(AuthController).router());
// app.use("/recipes", container.resolve(RecipeController).router());
// //app.use("/user", container.resolve(UserController).router());

const server = createServer(app);

export const lambdaHandler = (event: APIGatewayProxyEvent, context: Context) => proxy(server, event, context);
