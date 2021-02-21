# forge-dev

## 概要

このレポジトリは forge の API を利用した web アプリケーションの開発を行っています

今は各種 API をフロントからテストする機能を実装しています。

## 開発環境構築

forge で callbackURL を設定したアプリケーションを作成し、 client id と client secret, BIM360 account id を取得しておきます

```bash
cp .dot.env.tmpl .dot.env
```

.dot.env に取得した client id と client secret, BIM360 account id を設定、 HOST には forge app の callbackURL を設定します

```bash
docker-compose up -d
docker-compose exec app npm i
docker-compose exec app npm run dev
```

## インフラ

`infra/terraform` 以下のコードで AWS 環境にデプロイできます。

`infra/terraform/prd.tfvars` は

```
app = "<アプリ名、何でも良い>"
codestar_connection_arn = "arn:aws:codestar-connections:ap-northeast-1:<AWSアカウントID>:connection/<codestar connectionのuuid>"
```

を設置し

```bash
terraform apply -var-file=prd.tfvars
```

forge の CLIENT_ID, CLIENT_SECRET, BIM360_ACCOUNT_ID は AWS System Manager のパラメータストアで暗号化し管理されているので、デプロイ後、AWS のコンソールから設定してください。
