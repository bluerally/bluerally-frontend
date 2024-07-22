# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# 디렉토리 이동
cd $REPOSITORY

DEPLOY_LOG="/home/ec2-user/deploy-fe.log"
# 배포 로그 파일 초기화
echo "" > $DEPLOY_LOG

echo "$(date '+%Y-%m-%d %H:%M:%S') > 배포 시작" >> $DEPLOY_LOG

# Docker 이미지 다운로드
echo "$(date '+%Y-%m-%d %H:%M:%S') > Pulling Docker image" >> $DEPLOY_LOG
sudo docker pull bluerally/blue-rally-fe:latest 2>&1 | tee -a $DEPLOY_LOG

# Docker 컨테이너 실행
echo "$(date '+%Y-%m-%d %H:%M:%S') > Running new Docker container" >> $DEPLOY_LOG
sudo docker run -d -p 3000:3000 --name bluerally-fe bluerally/bluerally-fe:latest 2>&1 | tee -a $DEPLOY_LOG
