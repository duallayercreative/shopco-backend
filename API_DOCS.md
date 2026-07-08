# 🔗 API Endpoints

### Authentication (Managed by Better Auth)

| Method | Endpoint                   | Access | Description                    |
| ------ | -------------------------- | ------ | ------------------------------ |
| POST   | /api/v1/auth/register      | PUBLIC | register new user              |
| POST   | /api/v1/auth/verify-email  | PUBLIC | verify user email              |
| POST   | /api/v1/auth/login         | PUBLIC | log in verified user           |
| GET    | /api/v1/auth//login/google | PUBLIC | google login by api call       |
| GET    | /api/v1/auth/get-me        | SECURE | get user data by session token |

### User

### Brand

| Method | Endpoint           | Access | Description                      |
| ------ | ------------------ | ------ | -------------------------------- |
| POST   | /api/v1/brands     | ADMIN  | create a new brand               |
| GET    | /api/v1/brands     | PUBLIC | get all brands                   |
| GET    | /api/v1/brands/:id | PUBLIC | get brand by id                  |
| PATCH  | /api/v1/brands/:id | ADMIN  | update brand by id               |
| DELETE | /api/v1/brands/:id | ADMIN  | delete brand by id (soft delete) |

### Category

| Method | Endpoint               | Access | Description                         |
| ------ | ---------------------- | ------ | ----------------------------------- |
| POST   | /api/v1/categories     | ADMIN  | create a new category               |
| GET    | /api/v1/categories     | PUBLIC | get all categories                  |
| GET    | /api/v1/categories/:id | PUBLIC | get category by id                  |
| PATCH  | /api/v1/categories/:id | ADMIN  | update category by id               |
| DELETE | /api/v1/categories/:id | ADMIN  | delete category by id (soft delete) |
