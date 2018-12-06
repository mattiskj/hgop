node {
    def git = checkout scm

    stage("Clean") {
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git stash"
    }
    stage("Install") {
        echo 'Installing depencies'
        /* need to get json file from game-api folder and then run install*/
        sh "npm install --prefix game-api"
    }
    stage("Lint test") {
        echo 'checking code quality'
        sh "npm run eslint --prefix game-api"
    }
    stage("Unit test") {
        echo 'Unit testing'
        sh "npm run test:unit --prefix game-api"
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    build job: 'Deployment', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
}