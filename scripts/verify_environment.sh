#!/bin/bash
rm -f "logfile.txt"
getInfo(){
	
	echo Hello $USER
	echo
	echo starting time `date`
	echo
	#get the system info
	echo System `uname -mrs`
	echo

	#get versions of dependencies
	gitVersion=$(git --version)
	npmVersion=$(npm --version)
	nodeVersion=$(node --version)
	awsCli=$(aws --version)
	terraformVersion=$(terraform --version)
	echo node version: $nodeVersion
	echo git version : $gitVersion
	echo npm version : $npmVersion
	echo aws version : $awsCli
	echo terraform version: $terraformVersion


	#displaying the end time
	echo end time `date`
}
getInfo | tee -a "logfile.txt"