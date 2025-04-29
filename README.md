# Welcome to Task Manager 👋

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

## Features

### Task Management
- **Add Tasks**: Users can add tasks using the input field or by pressing the "Enter" key.
- **Toggle Task Completion**: Tasks can be marked as completed or active by tapping on them.
- **Delete Tasks**: Users can delete individual tasks with a delete button.
- **Clear All Tasks**: A feature to clear all tasks with confirmation prompts for safety.

### Animations
- **Shake Animation**: Input field shakes when trying to add an empty task.
- **Layout Animation**: Smooth animations for toggling and deleting tasks using `LayoutAnimation`.

### Dark Mode
- **Dark Mode Toggle**: Users can toggle between light and dark modes with a button.
- **Dynamic Styling**: The app adapts its colors based on the selected mode.

### Navigation
- **Tab Navigation**: Includes two tabs:
  - **Home**: Main task management screen.
  - **Explore**: Placeholder for future features.
- **Custom Tab Bar**: A custom tab bar with haptic feedback and a transparent background on iOS.

### Custom Components
- **TaskInput**: A reusable component for adding tasks with validation and animations.
- **TaskItem**: Displays individual tasks with toggle and delete functionality.
- **TaskItemTitle**: Displays the app title with a lightbulb icon that animates when toggling dark mode.

### Platform-Specific Features
- **iOS-Specific Styling**: Transparent tab bar background for iOS to show the blur effect.
- **Web-Specific Confirmation**: Uses `window.confirm` for clearing all tasks on the web.

### Fonts
- **Custom Fonts**: Uses `Inter_400Regular` and `Inter_600SemiBold` fonts loaded via `@expo-google-fonts`.

### Error Handling
- **Input Validation**: Prevents adding empty tasks and provides visual feedback.

---

Feel free to add this section to your `README.md` file under the "Features" heading. Let me know if you'd like to include anything else!

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
