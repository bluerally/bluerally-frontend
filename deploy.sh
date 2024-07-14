# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# 디렉토리 이동
cd $REPOSITORY

# 기존 Node.js 제거
if command -v node &> /dev/null; then
  sudo yum remove -y nodejs
fi

# Node.js 18.x 설치
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# npm 설치 확인 및 경로 설정
if ! command -v npm &> /dev/null; then
  sudo npm install -g npm
fi

# pnpm 설치 확인 및 설치
if ! command -v pnpm &> /dev/null; then
  sudo npm install -g pnpm
  export PATH="$HOME/.npm-global/bin:$PATH"
  source ~/.bashrc
fi

# pm2 설치 확인 및 설치
if ! command -v pm2 &> /dev/null; then
  sudo npm install -g pm2
fi

# 프로젝트 종속성 설치
pnpm install

# 배포 스크립트 실행
pnpm run deploy
