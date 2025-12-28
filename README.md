FocusFund – Smart Attention Management Platform

FocusFund is a parent–child attention management system that transforms daily habits into a token-based digital wallet, encouraging children to build discipline while giving parents transparent and healthy control.

📌 Problem Statement

Modern children spend excessive time on screens, leading to reduced attention, productivity, and discipline.
Existing solutions focus only on blocking apps or measuring screen time, which:

Do not teach responsibility

Create friction between parents and children

Lack real-time behavioral insights

💡 Solution Overview

FocusFund introduces a novel concept:

🎯 Attention is currency.

Children earn tokens by completing good habits and spend tokens on entertainment activities.
This creates a self-regulating system where focus, effort, and discipline are rewarded naturally.

🧠 Core Concept
Action	Result
Reading / Exercise / Homework	Tokens Earned
YouTube / Games / Social Media	Tokens Spent
Token Balance	Available Screen Time
Parent Limits	Controlled Spending
👥 User Roles
👶 Child

Earn tokens through positive habits

Spend tokens consciously

Track balance and activity

Learn self-discipline and decision-making

👨‍👩‍👧 Parent

Set daily token spending limits

Monitor child behavior in real time

Receive alerts when limits are reached

Encourage balance without micromanaging

✨ Features Implemented
1️⃣ Token Wallet System

Single source of truth using transaction history

Automatically calculates:

Total earned tokens

Total spent tokens

Available balance

2️⃣ Earn Tokens (Positive Reinforcement)

Children earn tokens by completing tasks like:

📘 Reading

🏃 Exercise

📝 Homework

Each action has a predefined token value.

3️⃣ Spend Tokens (Responsible Usage)

Tokens are required to access entertainment

Spending is blocked if:

Balance is insufficient

Daily limit is exceeded

4️⃣ Real-Time Updates (Live Sync)

Powered by Socket.io

Child and Parent dashboards update instantly when:

Tokens are earned

Tokens are spent

Limits are reached

5️⃣ Daily Spending Limits

Parents can set a daily token spending limit

Once reached:

Child receives a toast notification

Parent is notified instantly

Limits can be edited anytime

6️⃣ Smart Notifications (UX Focused)

Toast notifications instead of blocking alerts

Examples:

“🎉 You earned 10 tokens”

“🚫 Daily limit reached”

Improves experience without interruption

7️⃣ Transaction History

Displays recent activities

Helps both parent and child understand behavior patterns

8️⃣ Role-Based Dashboards

Child dashboard focuses on habits & learning

Parent dashboard focuses on monitoring & control

Clean UI separation using role-based rendering

🧱 System Architecture
Frontend (React)
   |
   | REST APIs + WebSockets
   |
Backend (Node + Express)
   |
   | MongoDB (Single Source of Truth)
   |
Socket.io (Live Updates)

🗂️ Data Design (Single Source of Truth)

All calculations are derived from transaction history, ensuring:

No data mismatch

No manual balance updates

Accurate recalculation anytime

history: [
  {
    type: "earn" | "spend",
    source: "Reading | YouTube | Exercise",
    amount: Number,
    date: Date
  }
]

🔐 Security & Reliability

JWT-based authentication

Role-based authorization (Parent / Child)

Server-side validation for:

Balance checks

Daily limit enforcement

Secure real-time events

🎯 Why FocusFund Stands Out

✅ Encourages discipline instead of restriction
✅ Teaches children decision-making
✅ Promotes healthy parent-child interaction
✅ Real-time and scalable architecture
✅ Practical, real-world impact

🚀 Future Enhancements

📊 AI-powered behavior insights

🎁 Reward store (real-world incentives)

🧠 Predictive alerts (usage forecasting)

🔥 Gamification (streaks, badges)

📱 Screen time integration

🏁 Conclusion

FocusFund is not just an app —
it’s a behavioral learning system.

We don’t block attention.
We teach how to manage it.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
