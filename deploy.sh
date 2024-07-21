# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

echo "Starting deployment at $(date)" >> /home/ec2-user/deploy.log

# 디렉토리 이동
cd $REPOSITORY

# 기존 Node.js 제거
if command -v node &> /dev/null; then
  sudo yum remove -y nodejs
fi

echo "Node.js removed at $(date)" >> /home/ec2-user/deploy.log

# Node.js 18.x 설치
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

echo "Node.js installed at $(date)" >> /home/ec2-user/deploy.log

# npm 설치 확인 및 경로 설정
if ! command -v npm &> /dev/null; then
  sudo yum install -y npm
fi

echo "npm checked at $(date)" >> /home/ec2-user/deploy.log

# pnpm 설치 확인 및 설치
if ! command -v pnpm &> /dev/null; then
  sudo npm install -g pnpm
fi

echo "pnpm installed at $(date)" >> /home/ec2-user/deploy.log

# pnpm 설치 후 경로 설정
if command -v pnpm &> /dev/null; then
  export PATH="$HOME/.npm-global/bin:$PATH"
  echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
fi

echo "PATH set at $(date)" >> /home/ec2-user/deploy.log

# pm2 설치 확인 및 설치
if ! command -v pm2 &> /dev/null; then
  sudo npm install -g pm2
fi

echo "pm2 installed at $(date)" >> /home/ec2-user/deploy.log

# 프로젝트 종속성 설치
pnpm install

echo "Dependencies installed at $(date)" >> /home/ec2-user/deploy.log

# 배포 스크립트 실행
pnpm run deploy

echo "Deployment script executed at $(date)" >> /home/ec2-user/deploy.log
