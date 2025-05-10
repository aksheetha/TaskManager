import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  LayoutAnimation,
  UIManager,
  View,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  Pressable,
  Animated,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import TaskInput from '@/components/TaskInput';
import TaskItem, { TaskItemTitle } from './components/TaskItem';
import * as SplashScreen from 'expo-splash-screen'; // Import expo-splash-screen
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const warning = args[0];
    if (
      typeof warning === 'string' &&
      (
        warning.includes('"shadow*" style props are deprecated') ||
        warning.includes('pointerEvents is deprecated') ||
        warning.includes('useNativeDriver is not supported') ||
        warning.includes('Cannot record touch end')
      )
    ) {
      return;
    }
    originalWarn(...args);
  };
}

// Enable layout animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  // State for managing tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  // State for managing task filter (all, active, completed)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  // State for managing dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Animated value for bulb bounce effect
  const bulbScale = useState(new Animated.Value(1))[0];
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show loading screen until fonts are loaded
  if (!fontsLoaded) {
    return null; // Keep the splash screen visible
  }

  // Function to create a bounce animation for the bulb
  const bounceBulb = () => {
    Animated.sequence([
      Animated.timing(bulbScale, {
        toValue: 1.2, // Scale up
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',

      }),
      Animated.timing(bulbScale, {
        toValue: 1, // Scale back to normal
        duration: 150,
        useNativeDriver: Platform.OS !== 'web',

      }),
    ]).start();
  };

  // Add a new task
  const addTaskHandler = (taskText: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), text: taskText, completed: false },
    ]);
  };

  // Toggle the completion status of a task
  const toggleTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Clear all tasks with confirmation
  const clearAllTasksHandler = () => {
    if (tasks.length === 0) return; // Do nothing if there are no tasks

    if (Platform.OS === 'web') {
      // Confirmation dialog for web
      const confirm = window.confirm('Are you sure you want to delete all tasks?');
      if (confirm) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTasks([]);
      }
    } else {
      // Confirmation dialog for mobile
      Alert.alert(
        "Clear All Tasks",
        "Are you sure you want to delete all tasks?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear All",
            style: "destructive",
            onPress: () => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setTasks([]);
            },
          },
        ]
      );
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true; // Show all tasks
    if (filter === 'active') return !task.completed; // Show only active tasks
    if (filter === 'completed') return task.completed; // Show only completed tasks
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
        {/* Header with dark mode toggle */}
        <TaskItemTitle
          isDarkMode={isDarkMode}
          toggleDarkMode={() => {
            bounceBulb(); // Trigger bounce animation
            setIsDarkMode((prev) => !prev); // Toggle dark mode
          }}
          bulbScale={bulbScale}
        />

        {/* Input field for adding tasks */}
        <TaskInput onAddTask={addTaskHandler} />

        {/* Filter Buttons and Clear All */}
        <View style={styles.filterContainer}>
          {['all', 'active', 'completed'].map((type) => (
            <Pressable
              key={type}
              onPress={() => setFilter(type as 'all' | 'active' | 'completed')} // Set filter type
              style={[
                styles.filterButton,
                { backgroundColor: isDarkMode ? '#333' : '#eee' },
                filter === type && { backgroundColor: '#007aff' }, // Highlight selected filter
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: filter === type ? '#fff' : isDarkMode ? '#eee' : '#333' },
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize filter name */}
              </Text>
            </Pressable>
          ))}
          <Pressable
            onPress={clearAllTasksHandler} // Clear all tasks
            disabled={tasks.length === 0} // Disable button if no tasks
            style={({ pressed }) => [
              styles.clearButton,
              tasks.length === 0 && { backgroundColor: '#ccc' }, // Disabled style
              pressed && tasks.length !== 0 && { opacity: 0.8 }, // Pressed style
            ]}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </Pressable>
        </View>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: isDarkMode ? '#aaa' : '#666' }]}>
              No tasks yet. Add one above! {/* Message when no tasks */}
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTasks} // Render filtered tasks
            keyExtractor={(item) => item.id} // Unique key for each task
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onToggleComplete={toggleTaskHandler} // Toggle task completion
                onDelete={deleteTaskHandler} // Delete task
                isDarkMode={isDarkMode} // Pass dark mode state
              />
            )}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f54242',
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
    color: '#007aff',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  bulbButton: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});

