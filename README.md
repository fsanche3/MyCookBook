# MyCookBook
 
This is a micro-service based application built using AWS SAM. This application parses, saves, and presents recipes from the spoonacular api.

- MyCookBookApi - Rest Api Lambda Proxy integration.
- MyCookBookPoller - Scheduled Event's (Fetch Recipes & Populate DB, Delete DB Recipes, Delete Refresh Tokens)

## Key Features For API and Scheduled Events
- Dependency Injection With tsyringe   
- JWT & Refresh Token Implementation
- TypeScript Type Saftey

## AWS Services
- KMS
- IAM
- SQS
- CloudFormation
- CloudWatch
- Lambda
- RDS