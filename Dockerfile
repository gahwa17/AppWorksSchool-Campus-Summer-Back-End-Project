# 使用 Node.js 18 的 alpine 鏡像
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到容器內
COPY package*.json ./

# 安裝 Node.js 應用程式的相依套件
RUN npm install

# 複製應用程式的其餘程式碼到容器內
COPY . .

# 定義應用程式的預設執行指令
CMD ["npm", "start"]
# CMD ["sh -c", "while ! nc -z mysql 3306; do sleep 1; done && node server.js"]
