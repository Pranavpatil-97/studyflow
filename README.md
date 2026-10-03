# Studyflow

Student productivity platform (MERN). Step 1: project scaffold, auth, sidebar + layout shell.

## Run

```bash
# Terminal 1 - API
cd server
cp .env.example .env      # edit MONGO_URI and JWT_SECRET
npm install
npm run dev

# Terminal 2 - client
cd client
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173, create an account, and you land on the dashboard shell.
