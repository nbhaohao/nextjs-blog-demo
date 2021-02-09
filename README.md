# 初始代码

## 开发

```bash
yarn dev
# or
npm run dev
```

## 数据库启动
``` bash
docker run -v "/home/blog/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 部署

```bash 
yarn build
yarn start
```

## Docker run
```bash
docker run -p 3000:3000 -d nbhaohao/node-web-app
```