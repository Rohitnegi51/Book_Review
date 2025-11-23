# 📖 BookReview
A mobile app for book lovers to add books, write reviews, rate them, and manage personalized reading lists. Built with **React Native, Expo, Node.js, and MongoDB** — secure, responsive, and user-friendly.

---

### 📱 Live Demo

Scan the QR code below with **Expo Go** to open the app:

![BookReview QR Code](mobile/assets/images/qrcode.png)
---

## ✏️ Why I Built This
Reading and sharing opinions about books is more engaging when it’s easy to track and interact.  
BookReview helps users to:  
- Add books to personal reading lists.  
- Write, edit, and manage book reviews.  
- Rate books and see overall ratings.  
- Upload book cover images.  

This project also helped me:  
- Learn mobile app development with **React Native** and **Expo**.  
- Implement secure authentication and CRUD operations.  
- Deploy backend APIs on **Render** with MongoDB.  
- Integrate real-time updates and automated tasks with cron jobs.

---

## 🛠️ Tech Stack & Architecture

| Layer             | Technologies                                                                 |
|------------------|-------------------------------------------------------------------------------|
| Frontend          | React Native, Expo                                                           |
| Backend           | Node.js, Express, MongoDB, Mongoose                                          |
| Auth              | JWT + bcrypt                                                                 |
| Image Uploads     | Cloudinary                                                                   |
| Automation        | cron jobs                                                                    |
| Deployment        | Backend on Render, App runs via Expo                                         |

---

# 📁 Project Structure

Below is the folder structure of **BookReview**:
```plaintext
📦 
BookReview/
├── backend/                 # Backend source code
│   └── src/
│       ├── index.js         # Entry point of backend
│       ├── lib/             # Helper functions and utilities
│       ├── middleware/      # Auth & error handling
│       ├── models/          # Mongoose schemas
│       └── routes/          # Express API routes
└── mobile/                   # Frontend (React Native / Expo)
    ├── app/
    │   ├── (auth)/           # Authentication screens
    │   ├── (tabs)/           # Main app tabs/screens
    │   └── _layout.jsx       # App layout
    ├── assets/               # Fonts, images, styles
    ├── components/           # Reusable UI components
    ├── constants/            # API endpoints, colors, etc.
    ├── lib/                  # Utility functions
    └── store/                # Zustand / global state

```
# ✨ Key Features
✅ Add books to personal reading lists  
✅ Write, edit, and delete book reviews  
✅ Rate books and view overall ratings  
✅ Upload book cover images via Cloudinary  
✅ User authentication with JWT and bcrypt  
✅ Automated tasks with cron jobs  
✅ Backend APIs built with Node.js, Express, and MongoDB  
✅ Fully deployable backend (Render) and mobile app (Expo)

---

## ⚙️ Installation

### 🖥 Backend
```bash
git clone https://github.com/yourusername/BookReview.git
cd BookReview/backend
npm install
```
Create .env in backend
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-secret>
```

Run the server 
```
npm run dev
```
Your API will be available at http://localhost:5000.


### 📱 Frontend (Expo)
```bash
cd ../mobile
npm install
```

Run the Expo app: 
```
npx expo
```
By default Vite serves at http://localhost:5173.

---

### 🏃 Usage
Open the app and sign up / log in.

Add books to your personal reading list.

Write, edit, and delete book reviews.

Rate books and view overall ratings.

Upload book cover images.

View your reading list and manage books.

---

### 📌 Limitations & Future Ideas
No social or sharing features yet.

Could add: notifications, user profiles, recommendation system, or social book discussions.

---

📫 **Contact**  
Rohit Negi → [@Rohitnegi51](https://github.com/Rohitnegi51)


