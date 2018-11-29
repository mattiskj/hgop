#!/bin/bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
rm -f "$SCRIPTPATH/logfile.log"
getInfo(){
	timeStarted=$(date)
	echo Hello $USER
	echo This script checks the version of all tools that are being used for thos project.
	
	#get the system info
	echo System `uname -mrs`
	echo

	if hash git >/dev/null 2>&1; then
		echo git Version: `git --version`
	else
		echo git Not Installed
	fi

	if hash node >/dev/null 2>&1; then
		echo node Version: `node --version`
	else
		echo Node not installed
	fi

	if hash npm >/dev/null 2>&1; then
		echo Npm Version: `npm --version`
	else
		echo Npm not installed
	fi

	if hash docker >/dev/null 2>&1; then
		echo Docker Version: `docker --version`
	else
		echo Docker not installed
	fi

	if hash aws >/dev/null 2>&1; then
		echo aws Version: `aws --version`
	else
		echo aws not installed
	fi

	if hash terraform >/dev/null 2>&1; then
		echo Terraform Version: `terraform --version`
	else
		echo Terraform not installed
	fi
	echo

	#displaying the end time
	echo This program started ad: $timeStarted
	echo And ended on: `date`
}
getInfo | tee -a "$SCRIPTPATH/logfile.log"