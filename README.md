# Sirius

Sirius is a simple web app to plan your appointments with collegues collaborativly. The goal is to provide a solution that is easy to customize, build and use. You can check out the prototype [@Vercel](https://sirius-appointments.vercel.app).

The web client is build with [SvelteKit](http://kit.svelte.dev). The web server is build with [NestJS](https://nestjs.com).

## Getting started
1. Clone and run the frontend in dev mode:
```bash
git clone https://github.com/Gohlisch/Sirius.git && cd Sirius/frontend && npm install && npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action. 

Make sure you have Docker installed (recommended) oder install Postgres directly
```bash
# with docker:
docker pull postgres &&
docker run -d \
    --name sirius_postgres \
    -e POSTGRES_PASSWORD=password123 \
    -e POSTGRES_DB=sirius \
    -p 5432:5432 \
    postgres
```

2. Then change the directory and run the backend in dev mode:
```bash
cd ../backend && npm install && npm run start:dev
```
