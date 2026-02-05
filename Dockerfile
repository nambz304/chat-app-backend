# Stage 1: Cài đặt tất cả dependencies (bao gồm cả devDeps để build)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Build source code từ TypeScript sang JavaScript
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Stage chạy thực tế (Production)
FROM node:20-alpine AS runner
WORKDIR /app

# Thiết lập môi trường mặc định (có thể bị ghi đè bởi Render Dashboard)
ENV NODE_ENV=production
ENV PORT=8080

# Chỉ copy những thứ thực sự cần để chạy
COPY package*.json ./
# Chỉ cài các thư viện cần thiết cho production (bỏ qua devDependencies)
RUN npm install --only=production

# Copy file đã build từ stage build
COPY --from=build /app/dist ./dist

# Render sẽ sử dụng cổng này
EXPOSE 8080

# Khởi chạy ứng dụng
CMD ["node", "dist/service.js"]