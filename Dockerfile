# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Устанавливаем только необходимые файлы для установки зависимостей
COPY package.json yarn.lock ./
# Включаем corepack и устанавливаем нужную версию yarn
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install --frozen-lockfile

# Копируем исходники и конфиги
COPY check-env-variables.js ./
COPY next.config.js ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL

# Собираем production-версию
RUN yarn build

# Stage 2: Production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копируем только production-зависимости
COPY package.json yarn.lock ./
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install --immutable

# Копируем собранный бандл и необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Открываем порт Next.js
EXPOSE 3000

# Запуск приложения
CMD ["yarn", "start"] 