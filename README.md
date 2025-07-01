# ChronoMaths 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

ChronoMaths is an engaging math practice game that challenges players to solve arithmetic problems against the clock. Built with Next.js and Firebase, it offers a fun way to improve mental math skills while competing for high scores.

## ✨ Features

- ⏱️ Timed math challenges (60 seconds per game)
- 🏆 Global and personal leaderboards
- 🔒 User authentication with Firebase
- 🎮 Multiple game modes (addition, subtraction, multiplication, division)
- 📊 Track your progress over time
- 🎨 Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm or pnpm
- Firebase account (for authentication and database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DavidLC578/chronomaths.git
   cd chronomaths
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Firebase configuration:
   - The project already comes preconfigured with Firebase credentials
   - If you want to use your own Firebase project, replace the credentials in `firebase/client.js`
   - Make sure you have enabled:
     - Authentication (Email/Password and Google Sign-In)
     - Firestore Database
     - Security rules configured appropriately

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 How to Play

1. Sign in with your account
2. Select a game mode (addition, subtraction, multiplication, or division)
3. Solve as many math problems as you can in 60 seconds
4. Earn points for each correct answer
5. Compete for the top spot on the leaderboard
6. Track your personal best scores in your profile

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework for server-rendered applications
- [Firebase](https://firebase.google.com/) - Authentication and real-time database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking and better developer experience
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by mental math training apps
- Built with ❤️ for math enthusiasts and competitive learners
- Special thanks to the Next.js and Firebase communities for their amazing tools and documentation
