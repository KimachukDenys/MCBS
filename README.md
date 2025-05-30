## 🧾 **Документація для проєкту**

### 1. 📌 Назва проєкту

```
# Avicenna Booking System
```

### 2. 📄 Опис проєкту

```
Система для бронювання медичних послуг у клініці. Підтримує ролі: пацієнт, лікар, адміністратор. Реалізовано перегляд послуг, запис до лікаря, управління послугами та можливість залишати відгуки.
```

### 3. 🏗 Технології

```
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL, Sequelize ORM
```

### 4. 📂 Структура проєкту (спрощено)

```
/client – фронтенд частина на React
└── /src – основна логіка застосунку
├── /api – функції для взаємодії з бекендом (запити до API)
├── /components – багаторазові компоненти (форми, кнопки, блоки)
├── /pages – сторінки відповідно до роутів (реєстрація, сервіси, запис)
└── App.tsx – головний компонент, відповідає за маршрутизацію та структуру

/server – бекенд частина на Node.js + Express
└── /src – вихідний код сервера
├── /controllers – обробники HTTP-запитів (вхід/вихід)
├── /services – бізнес-логіка й DI-класи
├── /models – моделі Sequelize та їхні зв’язки
├── /routes – оголошення REST-маршрутів та валідація
├── /middlewares – авторизація, перевірка ролей, логування
├── app.ts – конфігурація Express: middleware, маршрути, Sentry, статика
└── index.ts – точка входу: ініціалізація сервера, БД та маршрутів


README.md – цей файл
```

### 5. ⚙️ Встановлення

```bash
git clone https://github.com/KimachukDenys/MCBS.git
cd MCBS
npm install
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

**Запуск фронтенду та бекенду:**
```bash
cd MCBS
npm run dev
```

### 6. 🛠 Налаштування бази даних PostgreSQL v13(min)

Для запуску бекенду необхідно створити базу даних і користувача в PostgreSQL, які відповідають налаштуванням у `src/config/database.ts`.

**Приклад підключення знаходиться в (server/src/config/database.ts):**

```Bash
psql -U postgres
```
Створіть нового користувача:

```sql
CREATE USER admin_k WITH PASSWORD '123456';
```
Створіть базу даних:

```sql
CREATE DATABASE clinic_db OWNER admin_k;
```

(Опційно) Надати користувачу всі привілеї:

```sql
GRANT ALL PRIVILEGES ON DATABASE clinic_db TO admin_k;
```

⚠️ Переконайтесь, що PostgreSQL запущено локально і порт (звичайно 5432) відкритий.


### 7. 👤 Користувацькі ролі


- Пацієнт: перегляд сервісів, запис, перегляд записів 
Автоматично встановлюється при реєстрації(patient)

- Лікар: перегляд записів, зміна статусу
Потрбіно змінювати через pSql консоль
```sql
UPDATE users SET role='doctor' WHERE id='your_user_id';
```

- Адміністратор: створення/редагування сервісів, категорій
Потрбіно змінювати через pSql консоль
```sql
UPDATE users SET role='admin' WHERE id='your_user_id';
```

🔸 **Пояснення:**
- Блоки `sql` записані правильно — обгорнуті потрійними бектіками з вказаним типом мови (`sql`).
- Порожній `id` слід замінити на фактичний `id` користувача (типово UUID).
- Ролі `patient`, `doctor`, `admin` — текстові значення в полі `role`.

### 8. 🔐 Аутентифікація

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

### 10. 📝 Сценарії Використання

```
Пацієнт:
Реєстрація → Авторизація → Перегляд послуг → Створення бронювання → Перегляд своїх записів → Залишення відгуку

Лікар:
Авторизація → Перегляд призначених записів → Зміна статусу прийому → Перегляд відгуків

Адміністратор:
Авторизація → Управління послугами (створення, редагування, приховування) → Керування бронюваннями
```

---

###