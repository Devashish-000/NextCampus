# 🌐 NextCampus / CollegeSphere: 100% Free Production Deployment Guide

Yes! NextCampus can be deployed and hosted **100% live on the internet with zero hosting costs** and automatic free SSL (`https://`).

---

## 🏗️ Production Architecture

```
┌─────────────────────────────────┐
│     Global Internet Users       │
└────────────────┬────────────────┘
                 │
       https://nextcampus.vercel.app
                 ▼
┌─────────────────────────────────┐
│    Frontend SPA (Vercel CDN)    │
│    - React 18 + Vite            │
│    - Tailwind CSS + Lucide      │
│    - Global CDN Edge Network    │
└────────────────┬────────────────┘
                 │
       REST API Calls (JSON)
                 ▼
┌─────────────────────────────────┐
│   Backend API (Render.com)      │
│   - Node.js + Express           │
│   - JWT Auth & RBAC Security    │
│   - AI Cutoff & Counselor Engine│
└────────────────┬────────────────┘
                 │
       Mongoose TLS Connection
                 ▼
┌─────────────────────────────────┐
│   Cloud Database (MongoDB Atlas)│
│   - Multi-tenant Collections    │
│   - Colleges, Leads, Reviews    │
└─────────────────────────────────┘
```

---

## 🚀 Step-by-Step Deployment (Takes ~5 Minutes)

### Step 1: Save & Push Code to GitHub
Your local repository is already linked to:
`https://github.com/Devashish-000/NextCampus.git`

Run these commands in PowerShell inside `C:\react_pro\Smart-College-Recommendation-System-main`:
```bash
git add .
git commit -m "feat: production-ready NextCampus EdTech SaaS with AI predictor, CRM & payments"
git push origin main
```

---

### Step 2: Deploy Backend on Render.com (Free)

1. Open [Render.com](https://render.com) and click **"Sign in with GitHub"**.
2. On your Dashboard, click **New +** -> **Web Service**.
3. Select your repository: **`Devashish-000/NextCampus`**.
4. Configure the service settings:
   - **Name**: `nextcampus-api` (or any name you like)
   - **Region**: Singapore or Frankfurt (closest to India)
   - **Root Directory**: `backend` *(⚠️ Important! Set this to `backend`)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free` ($0/month)
5. Scroll down to **Environment Variables** and add these 4 keys:
   | Key | Value |
   | :--- | :--- |
   | `PORT` | `5000` |
   | `MONGODB_URI` | `mongodb://devashishasthana7_db_user:gvWEXlTky3gYtwwX@ac-em8xvbu-shard-00-00.gxdth4e.mongodb.net:27017/collegesphere?ssl=true&authSource=admin` |
   | `JWT_SECRET` | `collegesphere_super_secret_jwt_key_2026_production_grade` |
   | `JWT_EXPIRE` | `7d` |
6. Click **Create Web Service**.
7. In ~2 minutes, Render will output `Server is running on port 5000` and give you your live API URL:
   👉 Example: `https://nextcampus-api.onrender.com`

---

### Step 3: Deploy Frontend on Vercel.com (Free)

1. Open [Vercel.com](https://vercel.com) and click **"Continue with GitHub"**.
2. Click **"Add New..."** -> **"Project"**.
3. Select your repository: **`NextCampus`** and click **Import**.
4. Configure Project settings:
   - **Framework Preset**: `Vite` (Auto-detected)
   - **Root Directory**: `./` (Leave as default root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   | Key | Value |
   | :--- | :--- |
   | `VITE_API_BASE_URL` | `https://nextcampus-api.onrender.com/api` *(Use your actual Render URL from Step 2, appending `/api`)* |
6. Click **Deploy**.
7. In ~45 seconds, Vercel will complete the build and show confetti 🎉!
   👉 Your live website URL will be: `https://nextcampus.vercel.app` (or custom subdomain).

---

### Step 4: MongoDB Atlas Cloud Network Check (1-time check)
To ensure Render can connect to your MongoDB cluster:
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com).
2. Go to **Network Access** (under Security in the left sidebar).
3. Ensure there is an IP entry: `0.0.0.0/0` (Description: *Allow Access From Anywhere*).
   *(If not present, click "Add IP Address" -> select "Allow Access from Anywhere" -> Confirm).*

---

## 🎯 Production Test Credentials

Once deployed, anyone on the internet can test all three roles:

| Role | Email | Password |
| :--- | :--- | :--- |
| **👨‍🎓 Student** | `aarav@example.com` | `password123` |
| **🏛️ Institute Rep** | `institute@vit.edu` | `password123` |
| **👑 Super Admin** | `admin@collegesphere.com` | `password123` |
