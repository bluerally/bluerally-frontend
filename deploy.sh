# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# 디렉토리 이동
cd $REPOSITORY

# Node.js 설치 확인 및 설치
if ! command -v node &> /dev/null; then
  curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
  sudo yum install -y nodejs
fi

# npm 설치 확인 및 경로 설정
if ! command -v npm &> /dev/null; then
  sudo yum install -y npm
fi

# pnpm 설치 확인 및 설치
if ! command -v pnpm &> /dev/null; then
  sudo npm install -g pnpm
  export PATH="$HOME/.npm-global/bin:$PATH"
  source ~/.bashrc
fi

# 배포 스크립트 실행
pnpm run deploy
