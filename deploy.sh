#!/bin/bash

# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app
#!/bin/bash

DEPLOY_LOG="/home/ec2-user/deploy-fe.log"
# 배포 로그 파일 초기화
echo "" > $DEPLOY_LOG

echo "$(date '+%Y-%m-%d %H:%M:%S') > 배포 시작" >> $DEPLOY_LOG

# shellcheck disable=SC2164
cd /home/ec2-user/app

# 프론트엔드 이미지 태그 가져오기
aws s3 cp s3://blue-rally/fe-metadata.txt fe-metadata.txt
FE_IMAGE_TAG=$(cat fe-metadata.txt)

# 프론트엔드 Docker 이미지 다운로드 및 서비스 시작 로깅
echo "$(date '+%Y-%m-%d %H:%M:%S') > Pulling Frontend Docker image with tag: $FE_IMAGE_TAG" >> $DEPLOY_LOG
sudo docker pull bluerally/bluerally-fe:$FE_IMAGE_TAG 2>&1 | tee -a $DEPLOY_LOG

# Docker 이미지 태그 업데이트 (docker-compose.yml)
sudo sed -i "s|bluerally/bluerally-fe:latest|bluerally/bluerally-fe:$FE_IMAGE_TAG|g" docker-compose.yml

echo "$(date '+%Y-%m-%d %H:%M:%S') > Starting Docker Compose services" >> $DEPLOY_LOG
sudo docker-compose down 2>&1 | tee -a $DEPLOY_LOG
sudo docker-compose up -d 2>&1 | tee -a $DEPLOY_LOG

# Docker Compose를 사용하여 Aerich 마이그레이션 실행
echo "$(date '+%Y-%m-%d %H:%M:%S') > Running Aerich database migrations" >> $DEPLOY_LOG
sudo docker-compose run --rm app aerich upgrade 2>&1 | tee -a $DEPLOY_LOG

# 오래된 Docker 이미지 정리
echo "$(date '+%Y-%m-%d %H:%M:%S') > Cleaning up old Docker images" >> $DEPLOY_LOG
sudo docker image prune -a -f 2>&1 | tee -a $DEPLOY_LOG

echo "$(date '+%Y-%m-%d %H:%M:%S') > 배포 완료" >> $DEPLOY_LOG
