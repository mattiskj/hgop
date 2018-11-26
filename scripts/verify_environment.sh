#!/bin/bash
rm -f "logfile.txt"
getInfo(){
	echo starting time `date`
	echo Hello $USER
	echo

	#get the system info
	echo System `uname -mrs`
	echo

	#get versions of git, npm, node
	echo node version  `node --version`
	echo `git --version`
	echo npm version `npm --version`

	#displaying the end time
	echo end time `date`
}
getInfo | tee -a "logfile.txt"

