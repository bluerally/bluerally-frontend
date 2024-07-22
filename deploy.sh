#!/bin/bash

# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# Docker Hub에서 최신 이미지 가져오기
sudo docker pull bluerally/blue-rally-fe-build.zip

# 기존 컨테이너 중지 및 제거
sudo docker stop bluerally-fe || true
sudo docker rm bluerally-fe || true

# Docker 컨테이너 실행
sudo docker run -d -p 3000:3000 --name bluerally-fe bluerally/blue-rally-fe-build.zip
