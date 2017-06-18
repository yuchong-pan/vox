FROM python:3.5

MAINTAINER Yuchong Pan <panyuchong@gmail.com>

RUN mkdir /code
WORKDIR /code

ADD requirements.txt /code/
RUN pip3 install -r requirements.txt

ADD . /code/
