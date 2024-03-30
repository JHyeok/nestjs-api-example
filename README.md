# NestJS API Example

NestJS API Boilerplate

## 설치 및 구성

```bash
# 1. 프로젝트 생성
git clone git@github.com:JHyeok/nestjs-api-example.git nestjs-project

# 2. 프로젝트 폴더로 이동
cd nestjs-project

# 3. 의존성 설치
yarn install
```

설치가 끝났으면 `src/.env.example`을 복사해서 `.env`를 만듭니다.

`.env`를 본인이 사용하려는 DB 연결 정보에 맞게 수정하면 됩니다.

## Docker 로컬 개발환경

docker-compose.yml
- E2E 테스트, 통합 테스트를 위한 테스트 데이터베이스 환경을 구성할 수 있습니다.

docker-compose.dev.yml
- DB와 NestJS 앱을 실행하는 목적으로 사용합니다.
- Dockerfile.dev를 사용합니다.

Dockerfile.dev는 로컬에서 개발 환경으로 사용하는 목적이고 Dockerfile은 운영 환경에서 사용할 수 있도록 최적화했습니다.

```bash
# 테스트 데이터베이스 실행
$ docker-compose up -d

# 실행
$ docker-compose -f docker-compose.dev.yml up -d

# 빌드
$ docker-compose -f docker-compose.dev.yml build

# 재시작
$ docker-compose -f docker-compose.dev.yml restart

# 중지
$ docker-compose -f docker-compose.dev.yml down

# 중지 (도커 볼륨 삭제)
$ docker-compose -f docker-compose.dev.yml down -v
```

## 실행

```bash
# 운영 환경으로 실행
$ yarn start:prod

# 개발 환경으로 실행
$ yarn start:dev
```

## 테스트

```bash
$ yarn test
```
