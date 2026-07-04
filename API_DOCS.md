# 🔗 API Endpoints

### Authentication (Managed by Better Auth)

| Method | Endpoint                   | Access | Description                    |
| ------ | -------------------------- | ------ | ------------------------------ |
| POST   | /api/v1/auth/register      | PUBLIC | register new user              |
| POST   | /api/v1/auth/verify-email  | PUBLIC | verify user email              |
| POST   | /api/v1/auth/login         | PUBLIC | log in verified user           |
| GET    | /api/v1/auth//login/google | PUBLIC | google login by api call       |
| GET    | /api/v1/auth/get-me        | SECURE | get user data by session token |
