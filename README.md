# Task Manager App (React Native)

✨ A simple, elegant, and intuitive task management app built with React Native and Expo.

---

## 📱 Features
- ✅ **Add New Tasks** — Quickly add tasks via input bar or pressing Enter key.
- ✅ **Mark Tasks as Completed** — Tap checkbox to toggle a task as done.
- ✅ **Swipe to Delete** — Swipe left to delete tasks using `react-native-gesture-handler`.
- ✅ **Dark/Light Mode Toggle** — Beautiful theme switching with animated bulb icon.
- ✅ **Task Filters** — View All, Active, or Completed tasks easily.
- ✅ **Input Refocus** — After adding, the input cursor automatically refocuses.
- ✅ **Shake on Empty Input** — Prevents blank task addition with subtle shake animation.
- ✅ **Clear All Tasks** — Remove all tasks with a confirmation prompt.
- ✅ **Minimalistic UI** — Clean and polished mobile-first design.

---

## 🛠 Built With
- **React Native** via **Expo SDK 52**
- **TypeScript**
- **Expo Modules** (`splash-screen`, `status-bar`, `fonts`, `system-ui`)
- **react-native-gesture-handler** — Swipeable Delete
- **React Native Animated API** — Bounce, Fade, Shake Animations

---

## 🚀 How to Run the App Locally

### 1. Clone the Repository
```bash
git clone https://github.com/aksheetha/TaskManagerApp.git
cd TaskManagerApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server (Clear Metro Cache)
```bash
npx expo start --clear
```

### 4. Open the App
- 📱 Use the **Expo Go** app on your mobile to scan the QR code.
- 💻 Or press `w` to run it on Web.
- 🧪 For emulators:
  ```bash
  npm run android
  npm run ios
  ```

---

## ⚠️ Known Development Warnings (Safe to Ignore)

> These warnings occur only on web and do not affect functionality:

- `props.pointerEvents is deprecated`: Triggered by dependencies; not used in app code.


✅ All warnings are handled or documented and do **not appear on mobile (iOS/Android).**

---

## 🖼️ Optional: Demo Video / Screenshots (Add If You Have)
> 📹 Add a short GIF or video of the app running  
> 🖼️ Include screenshots in both light and dark mode

---

## 📚 Learn More
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

## 🤝 Contributing
Contributions are welcome! Feel free to submit issues or pull requests to improve the app.

---

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
