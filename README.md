
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
# Week 2
## Jenkinks instance.

Jenkins instance running on
````
http://ec2-54-226-220-170.compute-1.amazonaws.com:8080
````
Teachers have been given access to jenkins, username and password will be provided in comments on canvas.

The ip addresss of the running instance changes with every commit to github, so the latest instance can be found by:
1. log into jenkins using the provided username and password
2. Click on the "Deployment" pipline
3. Find the latest working build
4. Click Console output
5. Search for "Game API running at"
****
## Folder structure
```
.
├── Jenkinsfile
├── README.md
├── assignments
│   ├── day01
│   │   └── answer.md
│   ├── day02
│   │   └── answers.md
│   └── day11
│       └── answers.md
├── docker-compose.yml
├── game-api
│   ├── Dockerfile
│   ├── app.js
│   ├── config.js
│   ├── context.js
│   ├── database.js
│   ├── database.json
│   ├── dealer.js
│   ├── dealer.unit-test.js
│   ├── deck.js
│   ├── deck.unit-test.js
│   ├── inject.js
│   ├── lucky21.js
│   ├── lucky21.unit-test.js
│   ├── migrations
│   │   ├── 20181211131021-GameResultTable.js
│   │   └── 20181211135554-GameResultTable.js
│   ├── package.json
│   ├── random.js
│   ├── random.unit-test.js
│   ├── server.api-test.js
│   ├── server.capacity-test.js
│   ├── server.js
│   ├── server.lib-test.js
│   └── statsD.js
├── game-client
│   ├── Dockerfile
│   ├── README.md
│   ├── cards
|       |── **
│   ├── index.js
│   ├── package.json
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── components
│   │   │   └── AppContainer.js
│   │   ├── index.css
│   │   ├── index.html
│   │   └── utils.js
│   └── yarn.lock
├── infrastructure.tf
└── scripts
    ├── deploy.sh
    ├── docker_build.sh
    ├── docker_build_ui.sh
    ├── docker_compose_up.sh
    ├── docker_push.sh
    ├── docker_push_ui.sh
    ├── initialize_game_api_instance.sh
    ├── sync_session.sh
    └── verify_environment.sh

```

