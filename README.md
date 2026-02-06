# Task Management Web Application

A robust Full Stack web application built for the **Global Trend Full Stack Development Internship** skill assessment. This application allows users to manage their daily tasks with security and ease.

## 🚀 Features

* **User Authentication:** Secure Sign Up and Login system (Manual Authentication Strategy).
* **CRUD Operations:** Create, Read, Update, and Delete tasks.
* **Task Filtering:** Filter tasks by status (Pending, In Progress, Completed).
* **Responsive Design:** Fully responsive UI with a custom **Dark Mode** theme.
* **Security:** Protected routes ensuring only logged-in users can manage tasks.

## 🛠️ Tech Stack

* **Frontend:** EJS (Embedded JavaScript), CSS3
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** Passport.js (Custom Local Strategy), Express Session

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Make sure you have the following installed:
* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/try/download/community) (Running locally on port 27017)

### 2. Clone the Repository
```bash
git clone <PASTE_YOUR_GITHUB_REPO_LINK_HERE>
cd task-manager-assignment
3. Install Dependencies
Bash
npm install
4. Start MongoDB
Ensure your local MongoDB service is running.

Windows: Generally runs automatically as a service, or start via Task Manager/Services.

Mac/Linux: brew services start mongodb-community

5. Run the Server
Bash
node app.js
You should see the message: Server running on http://localhost:3000

6. Usage
Open your browser and visit http://localhost:3000.

You will be redirected to the Login page.

Click Sign Up to create a new account.

Once logged in, you can add, edit, delete, and filter your tasks.

📂 Project Structure
/task-manager
  ├── /models         # Database Models (User, Task)
  ├── /public         # Static files (CSS)
  ├── /views          # Frontend Templates (EJS)
  ├── app.js          # Main Server File
  └── package.json    # Project Dependencies
Developed by [Your Name]


---

### **Paste karne ke baad ye commands chalayein:**

Terminal mein ye commands run karein taaki ye file GitHub par upload ho jaye:

```bash
git add README.md
git commit -m "Added final documentation"
git push