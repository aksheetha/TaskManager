import { useState } from 'react';
import { LayoutAnimation, UIManager, View, FlatList, Platform, StyleSheet, Text, Pressable, Animated, Alert } from 'react-native';
import TaskInput from '@/components/TaskInput';
import TaskItem, { TaskItemTitle } from '../../components/TaskItem';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

// Enable layout animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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

  // Show loading screen until fonts are loaded
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Function to create a bounce animation for the bulb
  const bounceBulb = () => {
    Animated.sequence([
      Animated.timing(bulbScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(bulbScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Clear all tasks with confirmation
  const clearAllTasksHandler = () => {
    if (tasks.length === 0) return;

    if (Platform.OS === 'web') {
      const confirm = window.confirm('Are you sure you want to delete all tasks?');
      if (confirm) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTasks([]);
      }
    } else {
      Alert.alert(
        "Clear All Tasks",
        "Are you sure you want to delete all tasks?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Clear All", style: "destructive", onPress: () => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setTasks([]);
            }
          }
        ]
      );
    }
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}> 
      {/* Header with dark mode toggle */}
      <TaskItemTitle
        isDarkMode={isDarkMode}
        toggleDarkMode={() => {
          bounceBulb();
          setIsDarkMode((prev) => !prev);
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
            onPress={() => setFilter(type as 'all' | 'active' | 'completed')}
            style={[styles.filterButton, { backgroundColor: isDarkMode ? '#333' : '#eee' }, filter === type && { backgroundColor: '#007aff' }]}
          >
            <Text
              style={[styles.filterText, { color: filter === type ? '#fff' : isDarkMode ? '#eee' : '#333' }]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={clearAllTasksHandler}
          disabled={tasks.length === 0}
          style={({ pressed }) => [
            styles.clearButton,
            tasks.length === 0 && { backgroundColor: '#ccc' },
            pressed && tasks.length !== 0 && { opacity: 0.8 },
          ]}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </Pressable>
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDarkMode ? '#aaa' : '#666' }]}>No tasks yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleComplete={toggleTaskHandler}
              onDelete={deleteTaskHandler}
              isDarkMode={isDarkMode}
            />
          )}
        />
      )}
    </View>
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
