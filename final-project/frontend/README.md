Harjoitteluseuranta – Full Stack React Rebuild
A Full Stack rebuild of the PHP-based internship tracking application. This version features a React frontend, a Node.js API, and a PostgreSQL database, all containerized with Docker.

🚀 Features
Frontend: React + Vite + Tailwind CSS

Backend: Node.js + Express API

Database: PostgreSQL for persistent storage

Proxy: Nginx handling routing and serving the static build

🛣 Pages & Routes
Route	Description
/	Main page – student internship tracking table
/kirjaudu	Login page
/register	Register page
/lisaauusiopiskelija	Add a new student
/tyopaikat	Task J: Form to add a workplace (Saves to DB)
/tyolista	Read Task: Displays workplaces from the Database
/muokka	Edit student info
🛠 Running the Application
Ensure you have Docker Desktop running, then execute:

Bash
docker compose up --build
Once the containers are ready, open your browser at:

http://localhost:8080

📂 Project Structure
Plaintext
FinalProject/
├── docker-compose.yml
├── backend/            # Express API & Database connection
│   ├── server.js
│   └── package.json
├── db/                 # Database initialization
│   └── 01_init.sql
└── frontend/           # React Frontend
    ├── src/
    │   ├── App.jsx
    │   └── components/
    │       └── pages/  # React components for each route
    ├── originalPage/   # Original HTML/PHP files for comparison
    ├── nginx.conf      # Nginx configuration
    └── Dockerfile
📝 Database Initialization
The database is automatically initialized using the script in db/01_init.sql. It creates the tyopaikat table and inserts sample data upon the first launch.

Final Check before pushing:

Port Change: I updated the URL to http://localhost:8080 in the README because that is what your docker-compose.yml (Nginx) is using.

Structure: I updated the structure to show the backend and db folders you created.
