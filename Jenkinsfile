node {
    def git = checkout scm
    stage("Clean") {
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        git clean -dfxq
        git stash
    }
    stage("Install") {
        echo 'Installing depencies'
        /* need to get json file from game-api folder and then run install*/
        cd game-api
        npm install
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
}