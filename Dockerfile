FROM dordoka/octopress:latest

RUN sudo apt-get update && sudo apt-get install -y python

COPY . /home/octopress/Code

RUN bundle install

EXPOSE 4000
