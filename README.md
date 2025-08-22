# How to Run This Project

This project offers two methods for running the application: **Docker Compose** (recommended) and **Bare Metal**.

## Docker Compose (Recommended)

This method is highly recommended as it simplifies the setup process by managing all dependencies within containers.

### Dependencies

- **Docker**
- **Docker Compose**

### Instructions

1. Navigate to the root directory of the project.
2. Open your terminal or command prompt.
3. Run the following command:

   ```bash
   docker compose up --build
   ```

   This command builds the necessary images and starts the application services as defined in the `docker-compose.yml` file.

---

## Bare Metal

This method requires you to manually install and configure all dependencies on your local machine.

### Dependencies

- **Ruby on Rails**
- **SQLite**
- **Angular**

### Instructions

1. Navigate to the root directory of the project.
2. Execute the setup script from your terminal:

   ```bash
   ./setup.sh
   ```

   This script automates the configuration of both the Ruby on Rails backend and the Angular frontend.
   Remenber, you need install Dependencies

---

# How to Use

If the setup process completes successfully, a populated database will be available. The client-side application runs on the default Angular port, **4200**.

You can access the application at [http://localhost:4200](http://localhost:4200), which will redirect you to the [login page](http://localhost:4200/login).

- To log in, use the following credentials:
  - **Email**: `admin@admin`
  - **Password**: `admin`
- Alternatively, you can register a new user on the [registration page](http://localhost:4200/register).

Upon successful authentication, both pages will redirect you to the **home page**. From the home page, you can create new tasks by clicking the **"Create New Task"** button, filling out the form, and clicking **"Save"**. You can also view, edit, delete, and add comments to existing tasks fetched from the database.

---

# Features

- **JWT Token** for authentication
- **RESTful API**
- Client-side authentication system
- **Single-page application** (SPA)

# See more

Look for the readme of the [client](./client/README.md) and the [server](./server/README.md)
