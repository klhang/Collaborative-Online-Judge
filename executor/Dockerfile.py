FROM ubuntu:16.04  #based on ubuntu 16.04
MAINTAINER klhang

#run script on ubuntu16.04
RUN apt-get update # update
RUN apt-get install -y openjdk-8-jdk  # install JDK
RUN apt-get install -y python3 # install python
