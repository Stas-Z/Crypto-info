# Описание проекта

Данный проект представляет собой веб-приложение для работы с криптовалютными кошельками в сети Ethereum.
Основной функционал включает:

1. **Импорт приватного ключа** и получение публичного адреса.
2. **Просмотр балансов** на кошельке, включая ETH и токены (1INCH, ETH, USDT, UNI, DAI, GRT, LINK).
3. **Редактирование списка отслеживаемых токенов**.
4. **Конвертация балансов в USD** на основе данных с CoinGecko.
5. **Сохранение данных на сервере** для обеспечения постоянного доступа.

Ознакомиться с приложением можно по ссылке [https://evercode-lab-client.vercel.app](https://evercode-lab-client.vercel.app/)

## Запуск проекта

### 1. Установка зависимостей

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/Stas-Z/Crypto-info.git
    cd Crypto-info
    ```

2. Установите зависимости для фронтенда и бэкенда:

    - Для фронтенда:

    ```bash
    cd client
    npm install
    ```

    - Для бэкенда:

    ```bash
    cd server
    npm install
    ```

### 2. Настройка переменных окружения

Перед запуском проекта необходимо настроить переменные окружения.

#### Клиентская часть (client/.env.development):

```env
NEXT_PUBLIC_API=http://localhost:5000
```

#### Серверная часть (server/.development.env):

```env
PORT=5000
DB_URL='mongodb+srv://<username>:<password>@<your-cluster>.mongodb.net/?retryWrites=true&w=majority&appName=<your-app-name>'
CLIENT_URL=http://localhost:3000

JWT_ACCESS_TOKEN_SECRET=<your_secret>
JWT_ACCESS_TOKEN_EXPIRATION_MS=3600000

JWT_REFRESH_TOKEN_SECRET=<your_refresh_secret>
JWT_REFRESH_TOKEN_EXPIRATION_MS=604800000

INFURA_URL=https://mainnet.infura.io/v3/<your-infura-key>
```

Замените `<username>`, `<password>`, `<your-cluster>`, `<your-app-name>`, `<your_secret>`, `<your_refresh_secret>` и `<your-infura-key>` на актуальные данные.

### Установка зависимостей

#### Клиент

```sh
cd client
npm install
```

#### Сервер

```sh
cd server
npm install
```

### Запуск разработки

#### Клиент

```sh
npm run dev
```

#### Сервер

```sh
npm run start:dev
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000).


## Оптимизация и решения

### 1. **Оптимизация кеширования API-запросов**

-   Используется кеширование курсов токенов с помощью **cache-manager** и **keyv**, что снижает нагрузку на CoinGecko API.

### 2. **Безопасность**

-   Токены доступа защищены с помощью **JWT** (access/refresh токены).
-   Приватные ключи хранятся только на клиенте.
-   Сервер взаимодействует с **Infura** без передачи приватных ключей.

### 3. **Архитектура FSD**

Приложение построено на основе **Feature-Sliced Design (FSD)**:

-   **Entities**: основные сущности (кошельки, токены, пользователи).
-   **Features**: обработка бизнес-логики (авторизация, управление токенами, кошельками).
-   **Shared**: переиспользуемые модули (UI-компоненты, утилиты, API-запросы).
-   **Widgets**: готовые модули из нескольких компонентов.
-   **Pages**: представления с логикой загрузки данных.

### 4. **Работа с балансами токенов**

-   Получение балансов ETH через **Infura**.
-   Запрос балансов ERC-20 токенов через смарт-контракты (ABI `balanceOf`).
-   Конвертация балансов в USD через CoinGecko API.

### 5. **Персистентность данных**

-   Выбранные токены сохраняются в базе данных (MongoDB).
-   Авторизация через **JWT** с механизмом refresh-токенов.


## 🛠 Дальнейшие улучшения

-   Добавление поддержки других сетей (Polygon, BSC и т.д.)
-   Расширение списка токенов и их данных
-   Улучшение UI/UX для работы с кошельками

## Заключение

Проект предоставляет удобный интерфейс для просмотра и управления балансами в сети Ethereum. Используются современные технологии, обеспечивающие безопасность, масштабируемость и удобство работы с криптовалютами.
