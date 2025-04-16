# Mega City Cabs - Online Vehicle Reservation System 🚖  
**Automated Taxi Booking & Fleet Management Platform**  

[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Java](https://img.shields.io/badge/Java-17%2B-orange)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://react.dev/)
[![Swagger API Docs](https://img.shields.io/badge/API%20Docs-Swagger-blue)](http://localhost:8080/swagger-ui.html)

---

## 📸 Screenshots

| **Admin Dashboard** | **Booking Interface** | **WelcomeGate (Login & Register)** |
|---------------------|------------------------|-------------------------------------|
| ![Admin Dashboard](https://github.com/Anuradhasenaratne/MegaCityCabs/blob/df634648c03560692b208e72d2b54980d9b32406/Admin%20pannle.png) | ![Booking Page](https://github.com/Anuradhasenaratne/MegaCityCabs/blob/91dc2a9ee26da3e713d3f4b5e3cac20235852186/client%20booking%20car.png) | ![Register Page](https://github.com/Anuradhasenaratne/MegaCityCabs/blob/df634648c03560692b208e72d2b54980d9b32406/regpage.png) |

| **Admin – All Bookings** | **Client – Booking Confirmation** | **Login Page** |
|---------------------------|------------------------------------|----------------|
| ![All Bookings](https://github.com/Anuradhasenaratne/MegaCityCabs/blob/df634648c03560692b208e72d2b54980d9b32406/admin%20all%20bookin%20view%20page.png) | ![Confirm Booking](https://github.com/Anuradhasenaratne/MegaCityCabs/blob/91dc2a9ee26da3e713d3f4b5e3cac20235852186/confiram%20booking%20by%20client.png) | ![Login](https://github.com/Anuradhasenaratne/MegaCityCabs/blob/df634648c03560692b208e72d2b54980d9b32406/Loginpage.png) |

---

## 🚀 Features  
- **Role-Based Access**:  
  - **Admins**: Manage vehicles, drivers, bookings, and reports.  
  - **Drivers**: View assignments and update availability.  
  - **Customers**: Book rides, track status, and view history.  
- **Automated Workflows**: Fare calculation, booking confirmations, and alerts.  
- **Security**: JWT authentication, password encryption, RBAC.  
- **Analytics**: Vehicle utilization, revenue reports, and customer insights.  

---

## 🛠️ Tech Stack  
| Component       | Technologies |  
|-----------------|--------------|  
| **Frontend**    | React, Tailwind CSS, Axios, Chart.js |  
| **Backend**     | Spring Boot, Spring Security, JPA, Lombok |  
| **Database**    | MySQL, Hikari Connection Pool |  
| **DevOps**      | Docker, GitHub Actions, GitFlow |  
| **Testing**     | Cypress, JUnit, Postman |  

---

## ⚙️ Installation  

### Prerequisites  
- Java 17+, Node.js 18+, MySQL 8+  

### Steps  
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/Anuradhasenaratne/MegaCityCabs.git
   cd MegaCityCabs


   Configure the database:

Create a MySQL database named mcc_db.

Update credentials in /backend/src/main/resources/application.properties.

Run the backend:

bash
Copy
cd backend
mvn spring-boot:run
Run the frontend:

bash
Copy
cd frontend
npm install && npm run dev
Access the app:

Frontend: http://localhost:5173

Backend API: http://localhost:8080

📄 API Documentation
Explore endpoints interactively using Swagger UI:

bash
Copy
http://localhost:8080/swagger-ui.html
Example Request (Create Booking):
bash
Copy
curl -X POST "http://localhost:8080/api/bookings" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "pickupLocation": "Colombo Fort",
  "destination": "Katunayake Airport",
  "vehicleType": "CAR"
}'
🧪 Testing
Test Type	Command
Unit Tests	mvn test (in /backend)
E2E Tests	npm run test:cypress (in /frontend)
📂 Project Structure
plaintext
Copy
MegaCityCabs/  
├── frontend/               # React app  
│   ├── public/             # Static assets  
│   └── src/                # Components, services, and pages  
├── backend/                # Spring Boot app  
│   ├── src/main/java/      # Controllers, services, entities  
│   └── src/main/resources/ # DB config, properties  
├── postman/                # API test collections  
└── docker-compose.yml      # Docker setup  
🤝 How to Contribute
Fork the repository.

Create a branch:

bash
Copy
git checkout -b feat/your-feature
Commit changes:

bash
Copy
git commit -m "feat: Add payment gateway integration"
Push and submit a Pull Request.






