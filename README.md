# MyCookBook
 
This is a Serverless application using Event Driven Architecture and it was built using AWS SAM. It parses, saves, and presents recipes from the spoonacular api.

- MyCookBookApi (BFF) - Rest Api Lambda Proxy integration.
- MyCookBookPoller (Scheduled Event's) - (Fetch Recipes & Populate DB, Delete DB Recipes, Delete Refresh Tokens, Email Incedent Alert)

## Key Features For This Event Driven Architecture
- Decoupling between Microservices
- Event-based integration and communication 
- Event-based auditability with SQS and Dead-Letter Queue (DLQ)

## Features For Application Development
- Dependency Injection With tsyringe   
- JWT & Refresh Token Implementation
- Request Validator 
- TypeScript Type Saftey
- Password Hashing
- Environment Variable Encryption

## AWS Services
- KMS
- IAM
- SQS
- CloudFormation
- CloudWatch
- Lambda
- RDS