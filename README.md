# MaListe+

**MaListe+** makes shopping simple: create, manage, and access your lists instantly.

---

## Table of Contents

- [Author](#author)
- [Languages](#languages)
- [Versions](#versions)
- [Starting](#starting)

---

## Author

- Raphaël RACLOT also known as [Raxuis](https://github.com/Raxuis)

---

## Languages

This project is built using the following technologies:

- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [LeafPHP](https://leafphp.dev/)
- [PHP](https://php.net/)
- [MySQL](https://www.mysql.com/)
- [PHPMyAdmin](https://www.phpmyadmin.net/)
- [Composer](https://getcomposer.org/)
- [PNPM](https://pnpm.io/)
- [Git](https://git-scm.com/)

---

## Versions

For this project I used the following versions:

- **Node.js**: v20.11.0
- **npm**: v10.2.4
- **React.js**: ^19.0.0
- **TailwindCSS**: v4
- **PHP**: v8.3.16
- **LeafPHP**: v3.7
- **Composer**: v2.8.5

---

## Starting

If on windows, try launching file `launch-application-and-server.bat`.

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Raxuis/MaListe-.git
   ```

2. Navigate to the project folder:
   ```bash
   cd MaListe-
   ```

### Frontend :

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open your browser or emulator to view the application.

### Backend :

1. First, you need to have a MySQL server running on your machine :
    - Use MAMP
    - Use LAMP
    - Use WAMP
    - Use XAMPP
    - Use Docker

2. You need to create a database and import the `/database/coda_shopping_lists.sql` file.

3. Go to the backend folder:
   ```bash
   cd api/
   ```
4. Install dependencies:
   ```bash
    composer install
    ```
5. Run the development server:
   ```bash
   php leaf serve
   ```
6. Now your backend is ready to use.

---
