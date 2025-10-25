# NestJS API Example

NestJS API Boilerplate

## 설치 및 구성

```bash
# 1. 프로젝트 생성
git clone git@github.com:JHyeok/nestjs-api-example.git nestjs-project

# 2. 프로젝트 폴더로 이동
cd nestjs-project

# 3. 의존성 설치
npm install
```

설치가 완료되면 `src/.env.example`을 복사해서 `.env`를 만듭니다.

`.env`를 사용하려는 DB 연결 정보에 맞게 수정하면 됩니다.

## Docker 로컬 개발환경

docker-compose.yml
- E2E 테스트, 통합 테스트를 위한 테스트 데이터베이스 환경을 구성할 수 있습니다.

```bash
# 테스트 데이터베이스 실행
$ npm run docker:up

# 테스트 데이터베이스 삭제
$ npm run docker:down
```

## 실행

```bash
# 운영 환경으로 실행
npm run start:prod

# 개발 환경으로 실행
npm run start:dev
```

## 테스트

```bash
$ npm run test
```
