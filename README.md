# Welcome 👋
# 📸 React Native Image Gallery App

A professional-level **React Native image gallery app** built using the **Flickr API**. This app enables users to:

- Explore recent images
- Search for keywords like `cat`, `dog`, etc.
- View full-screen images
- Enjoy smooth navigation with infinite scrolling
- Handle offline support with caching
- Receive user-friendly feedback on network issues with retry options

---

## ✨ Features

- 🖼️ Fetches recent images using the **Flickr API**
- 🔄 **Pagination** support: loads more images on scroll (page 1, 2, 3...)
- 🔍 Powerful **search** by keyword (e.g., "cat", "dog")
- ⚙️ **Drawer Navigation**: Home, Explore, and Search screens
- 📥 Offline image **caching** using `AsyncStorage`
- 💬 Error **Snackbar** with “RETRY” on network failure
- 🔁 Pull-to-refresh support
- 📱 Runs on **Android and iOS**

---

## 🎥 Demo Video

[![Watch the demo](https://drive.google.com/file/d/1auAlqNm8PXCdbAOavQxJtyUbJrzI6Q35/view?usp=sharing)

---

## 🧠 How It Works

- **Explore Screen:** Uses `flickr.photos.getRecent` with pagination (`page=1`, `page=2`, `page=3`…).
- **Search Screen:** Calls `flickr.photos.search` with a user-entered keyword like “cat”.
- **Drawer Navigation:** Lets users switch between Home, Explore, and Search easily.
- **Offline Cache:** Recently fetched images are stored using `AsyncStorage`.
- **Error Handling:** Network failures are caught and prompt a “Retry” Snackbar.

---

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
---
## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
---

🧱 Technologies Used

⚛️ React Native
📦 Axios / Fetch API
🧭 React Navigation (Drawer + Stack)
🖼️ Flickr API (getRecent & search)
💾 AsyncStorage for caching
💬 React Native Paper Snackbar
📜 FlatList with pagination (onEndReached)
---
📂 Folder Structure

├── App.js
├── screens/
│   ├── HomeScreen.js
│   ├── ExploreScreen.js
│   ├── SearchScreen.js
│   └── ImageViewScreen.js
├── components/
│   └── ImageCard.js
├── utils/
│   └── api.js
---
❗ Error Handling

✅ Snackbar with “Retry” button on API/network failure
🔃 Loader shows during image fetch or pagination
🚫 Empty state handling if no results found
---
📸 App Screens

🏠 Home – Intro screen with navigation drawer
🔍 Explore – Recent image feed with infinite scroll
🧭 Search – Enter keywords and display images
👁️ ImageView – Fullscreen display of tapped image
---
Author
Made with ❤️ by Tejashwini

💼 GitHub: github.com/tejashwini-h

📬 Email: approachteju@gmail.com

🌐 LinkedIn: linkedin.com/in/tejashwini-h-n

