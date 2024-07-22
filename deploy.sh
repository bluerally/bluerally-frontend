#!/bin/bash

DEPLOY_LOG="/home/ec2-user/deploy-fe.log"
# 배포 로그 파일 초기화
echo "" > $DEPLOY_LOG

# Docker 이미지 다운로드
echo "$(date '+%Y-%m-%d %H:%M:%S') > Pulling Docker image" >> $DEPLOY_LOG
sudo docker pull bluerally/blue-rally-fe:latest 2>&1 | tee -a $DEPLOY_LOG

# 기존 컨테이너 중지 및 제거
echo "$(date '+%Y-%m-%d %H:%M:%S') > Stopping and removing existing container" >> $DEPLOY_LOG
sudo docker stop bluerally-fe || true
sudo docker rm bluerally-fe || true

# Docker 컨테이너 실행
echo "$(date '+%Y-%m-%d %H:%M:%S') > Running new Docker container" >> $DEPLOY_LOG
sudo docker run -d -p 3000:3000 --name bluerally-fe bluerally/blue-rally-fe:latest 2>&1 | tee -a $DEPLOY_LOG
