# Generetro IAC

## Pulumi 実行環境の構築手順

```bash
pulumi login
```

## gcloud ツール

gcloud のバージョンが上がったことにより、WSL やコンテナ上からのログインができなくなたそう。  
`--no-launch-browser` オプションを付与することによりその問題を解消できる。

⚠️ 以下の警告が表示される。  
WARNING: The login flow that you are using with the --no-launch-browser flag will be updated by July 12, 2022 to address a security issue. No immediate action is required to continue using this flag, but be sure to upgrade your gcloud installation by running `gcloud components update` between July 12, 2022 and August 2, 2022.  
いずれ対応する時期が来る。

```bash
gcloud auth login --no-launch-browser
```
