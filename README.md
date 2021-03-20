# NestJS API Example

NestJS API Boilerplate

## 설치 및 구성

```bash
# 1. 프로젝트 생성
git clone https://github.com/JHyeok/nestjs-api-example.git nestjs-project

# 2. 프로젝트 폴더로 이동
cd nestjs-project

# 3. 의존성 설치
npm install
```

설치가 끝났으면 `src/.env.example`을 복사해서 `.env`를 만든다.

```
# APP
APP_PORT=3000

# DATABASE
DB_TYPE=mysql
DB_HOST=db
DB_PORT=3306
DB_ROOT_PASSWORD=rootpass
DB_NAME=test
DB_USERNAME=test
DB_PASSWORD=test
```

`.env`를 본인이 사용하려는 DB 연결 정보에 맞게 수정하면 된다. 예시 `.env`를 사용하게 되면 `DB_HOST`가 Docker 컨테이너에서 올라가는 데이터베이스를 사용하도록 설정했다.

## Docker 환경에서 실행

```bash
# 실행
$ docker-compose -f docker-compose.dev.yml up -d
# 재시작
$ docker-compose -f docker-compose.dev.yml restart
# 중지
$ docker-compose -f docker-compose.dev.yml down
```

## 실행

```bash
# 개발환경으로 실행
$ npm run start:dev
```
