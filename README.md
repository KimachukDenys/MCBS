## 🧾 **Структура документації для проєкту**

### 1. 📌 Назва проєкту

```
# Avicenna Booking System
```

### 2. 📄 Опис проєкту

```
Система для бронювання медичних послуг у клініці. Підтримує ролі: пацієнт, лікар, адміністратор. Реалізовано перегляд послуг, запис до лікаря, управління послугами.
```

### 3. 🏗 Технології

```
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL, Sequelize ORM
```

### 4. 📂 Структура проєкту (спрощено)

```
/client         – фронтенд (React)
/server         – бекенд (Express)
README.md       – цей файл
```

### 5. ⚙️ Встановлення

```bash
git clone https://github.com/KimachukDenys/MCBS.git
cd MCBS
npm install
```
**Запуск фронтенду та бекенду:**
```bash
cd MCBS
npm run dev
```


**Запуск фронтенду:**

```bash
cd client
npm install
npm start
```

**Запуск бекенду:**

```bash
cd server
npm install
npx ts-node-dev src/index.ts
```

### 6. 👤 Користувацькі ролі

```
- Пацієнт: перегляд сервісів, запис, перегляд записів, чат
- Лікар: перегляд записів, зміна статусу, чат
- Адміністратор: створення/редагування сервісів, контроль лікарів, категорій
```

### 7. 🔐 Аутентифікація

```
JWT токени, збереження у localStorage, middleware для захисту маршрутів.
```

### 9. 📎 API документація

* `/api/user/register` – реєстрація
* `/api/user/login` – вхід
* `/api/services` – список послуг
* `/api/services/appointments` – створення запису
  (додай список основних ендпоінтів)

---