## MyCookBook
 
This is a micro-service based application built using AWS SAM. This application parses, saves, and presents recipes from the spoonacular api.

- MyCookBookApi - Rest Api Lambda Proxy integration.
- MyCookBookPoller - Scheduled Event Lambda that runs on cron job and populates database.

# Features For API and Scheduled Events
- Dependency Injection With tsyringe   
- JWT & Refresh Token Implementation
- TypeScript Type Saftey
- Singleton pattern

# AWS Cloud
- KMS
- SAM 
- SQS 