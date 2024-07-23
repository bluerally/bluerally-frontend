# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# 디렉토리 이동
cd $REPOSITORY

DEPLOY_LOG="/home/ec2-user/deploy-fe.log"
# 배포 로그 파일 초기화
echo "" > $DEPLOY_LOG

echo "$(date '+%Y-%m-%d %H:%M:%S') > 배포 시작" >> $DEPLOY_LOG

aws s3 cp s3://blue-rally/fe-metadata.txt fe-metadata.txt
IMAGE_TAG=$(cat fe-metadata.txt)

# Docker 이미지 다운로드
echo "$(date '+%Y-%m-%d %H:%M:%S') > Pulling Docker image" >> $DEPLOY_LOG
sudo docker pull bluerally/blue-rally-fe:$IMAGE_TAG 2>&1 | tee -a $DEPLOY_LOG

# Docker 컨테이너 실행
echo "$(date '+%Y-%m-%d %H:%M:%S') > Running new Docker container" >> $DEPLOY_LOG
sudo docker run -d -p 3000:3000 --name bluerally-fe --network bluerally-network bluerally/bluerally-fe:$IMAGE_TAG 2>&1 | tee -a $DEPLOY_LOG

# 네트워크 연결 확인 및 필요시 연결
if ! sudo docker network inspect bluerally-network | grep -q "bluerally-fe"; then
    sudo docker network connect bluerally-network bluerally-fe
fi

# 오래된 Docker 이미지 정리
echo "$(date '+%Y-%m-%d %H:%M:%S') > Cleaning up old Docker images" >> $DEPLOY_LOG
sudo docker image prune -a -f 2>&1 | tee -a $DEPLOY_LOG