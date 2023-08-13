import 'reflect-metadata';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import {createServer, proxy} from "aws-serverless-express";
import { container } from 'tsyringe';
import RecipeController from './controller/recipeController';
import express from 'express';  
import cors from 'cors';

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());
app.use(cors());
app.use(express.json());

app.use("/recipes", container.resolve(RecipeController).router())

const server = createServer(app);

export const lambdaHandler = (event: APIGatewayProxyEvent, context: Context) => proxy(server, event, context);
