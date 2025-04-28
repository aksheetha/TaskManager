/**
 * HomeScreen Component
 * 
 * This is the main screen of the Task Manager App. It allows users to add, toggle, delete, 
 * and filter tasks. The tasks can be filtered by "all", "active", or "completed" states.
 * 
 * Features:
 * - Add new tasks with a unique ID, text, and completion status.
 * - Toggle the completion status of tasks.
 * - Delete tasks from the list.
 * - Filter tasks based on their completion status.
 * - Smooth animations for task toggling and deletion using LayoutAnimation.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered HomeScreen component.
 * 
 * @example
 * // Usage in a React Navigation stack
 * <Stack.Screen name="Home" component={HomeScreen} />
 * 
 * @interface Task
 * @property {string} id - Unique identifier for the task.
 * @property {string} text - The text description of the task.
 * @property {boolean} completed - Indicates whether the task is completed.
 * 
 * @function addTaskHandler
 * Adds a new task to the list.
 * @param {string} taskText - The text of the task to be added.
 * 
 * @function toggleTaskHandler
 * Toggles the completion status of a task.
 * @param {string} id - The ID of the task to toggle.
 * 
 * @function deleteTaskHandler
 * Deletes a task from the list.
 * @param {string} id - The ID of the task to delete.
 * 
 * @function filteredTasks
 * Filters the tasks based on the current filter state.
 * @returns {Task[]} The filtered list of tasks.
 * 
 * @constant styles
 * Contains the styles for the HomeScreen component, including container, filter buttons, 
 * and empty state styles.
 */
import { useState } from 'react';
import { LayoutAnimation, UIManager, View, FlatList, Platform, StyleSheet, Text, Pressable } from 'react-native';
import TaskInput from '@/components/TaskInput';
import TaskItem, { TaskItemTitle } from '../../components/TaskItem';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';


// Enable layout animation for Android if supported
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define Task interface
export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

// Main Home Screen
export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  const addTaskHandler = (taskText: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), text: taskText, completed: false },
    ]);
  };

  const toggleTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Filtered tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  return (
    <View style={styles.container}>
      <TaskItemTitle />
      <TaskInput onAddTask={addTaskHandler} />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <Pressable onPress={() => setFilter('all')} style={[styles.filterButton, filter === 'all' && styles.activeFilter]}>
          <Text style={styles.filterText}>All</Text>
        </Pressable>
        <Pressable onPress={() => setFilter('active')} style={[styles.filterButton, filter === 'active' && styles.activeFilter]}>
          <Text style={styles.filterText}>Active</Text>
        </Pressable>
        <Pressable onPress={() => setFilter('completed')} style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}>
          <Text style={styles.filterText}>Completed</Text>
        </Pressable>
      </View>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
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
            />
          )}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeFilter: {
    backgroundColor: '#007aff',
  },
  // Removed duplicate filterText definition
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666',
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
    color: '#333',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#333',
  },
});
