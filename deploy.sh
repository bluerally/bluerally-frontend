#!/bin/bash

# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# Docker Hub에서 최신 이미지 가져오기
docker pull bluerally/blue-rally-fe-build.zip

# 기존 컨테이너 중지 및 제거
docker stop bluerally-fe || true
docker rm bluerally-fe || true

# Docker 컨테이너 실행
docker run -d -p 3000:3000 --name bluerally-fe bluerally/blue-rally-fe-build.zip
