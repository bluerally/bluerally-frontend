# REPOSITORY 변수 설정
REPOSITORY=/home/ec2-user/fe-app

# 디렉토리 이동
cd $REPOSITORY

# Node.js 및 npm 설치 확인
if ! command -v node &> /dev/null; then
  curl -sL https://rpm.nodesource.com/setup_16.x | bash -
  yum install -y nodejs
fi

# npm 설치 확인 및 경로 설정
if ! command -v npm &> /dev/null; then
  curl -L https://www.npmjs.com/install.sh | sh
fi

# pnpm 설치 확인 및 설치
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm
  export PATH="$HOME/.npm-global/bin:$PATH"
  source ~/.bashrc
fi

# 배포 스크립트 실행
pnpm run deploy
