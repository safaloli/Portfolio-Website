# 🚀 Portfolio SaaS – Backend (Phase 1)
A scalable backend system for a multi-user Portfolio SaaS platform that allows users to create and manage dynamic portfolio websites.
This project focuses on clean architecture, modular design, and production-ready backend structure.

## 📌 Project Status
✅ Phase 1 – Backend Architecture Completed
🚧 Phase 2 – Frontend & Advanced Features (In Progress)

##🧠 Vision
- To build a flexible SaaS platform where users can:
- Create personalized portfolio websites
- Dynamically manage sections
- Customize content easily
- Deploy portfolio pages with unique slugs

This is not just a portfolio project — it’s a scalable SaaS foundation.

##🏗️ Architecture
The project follows a Service–Controller architecture pattern:

###Route → Controller → Service → Database

###Key principles:
- Separation of concerns
- Modular folder structure
- Clean validation layer
- Scalable API design


##⚙️ Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Joi Validation

##🔐 Core Features (Phase 1)
- 👤 Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure middleware structure

##📁 Portfolio Management
- Create & manage portfolios
- Unique slug system
- SuperAdmin access control

##🧩 Dynamic Section System
- Unique section type per portfolio
- Dynamic validation logic
- Auto ordering system
- Structured content management

##🗄 Database Design
- UUID-based primary keys
- Sequelize model relationships
- Clean migration-ready structure

##📂 Folder Structure
src/
 ├── config/
 ├── controllers/
 ├── services/
 ├── models/
 ├── routes/
 ├── middlewares/
 └── utils/

Built for scalability and maintainability.

##🚀 Installation
- git clone https://github.com/safaloli/Portfolio-Website.git
- cd Portfolio-Website
- cd backend
- pnpm install

## Configure Environment Variables

Create .env file:

PORT=
FRONTEND_APP_URL=
BACKEND_APP_URL=
JWT_SECRET=
PG_DB_NAME=
PG_DB_USERNAME=
PG_DB_USER_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Run Server
npm run dev


##🎯 Upcoming Features (Phase 2)

- Frontend UI (React / Next.js)
- Public portfolio rendering
- Custom themes
- Deployment system
- Domain mapping
- SaaS subscription model
- 🤝 Contributing

Currently a personal project, but feedback and suggestions are welcome.

##👨‍💻 Author

Safal Oli
Backend Developer | SaaS Builder

###GitHub: https://github.com/safaloli

###LinkedIn: (https://www.linkedin.com/in/safaloli/)

⭐ If You Like This Project

Give it a star ⭐ and follow the journey.