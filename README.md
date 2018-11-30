
# HGOP
## Matthías Skjöldur & Gunnlaugur Guðmundsson
****
## The verify_environment script
For day one we created a script that collects information a bout tools being used in this course. It also checks the system kernal and prints out the time when script started and ended. All this information is then logged into a .log file in the script folder.  
To run script from root of program:
````
$ ./scripts/verify_environment.sh
````
  ****
## The deploy script

The deploy script in scripts deploys an instance of the application on the aws console. First it checks if all files needed for deployment are present, if theres a missing file it will not run. The script can only be executed from the root of the application.  
If every needed file is present and the script is run from the root, it will first destroy the instance that was running before. Then a new instance will be initiated and deployd to the aws console. After thad is done, the initialize_game_api_instance script will run on the virtual maching, and that script will install docker and docker-compose, or anything needed to run the api, and the starts the api.  
  
  We have created an instance of the application and it is running on: 
  ```
  http://34.227.161.216:3000/status
```
This page should return an "`The API is running!`" message.
****

## Folder structure
```
.
├── README.md
├── assignments
│   ├── day01
│   │   └── answer.md
│   └── day02
│       └── answers.md
├── docker-compose.yml
├── infrastructure.tf
├── itemrepository
│   ├── Dockerfile
│   ├── app.js
│   ├── database.js
│   └── package.json
└── scripts
   ├── deploy.sh
   ├── initialize_game_api_instance.sh
   └── verify_environment.sh

```