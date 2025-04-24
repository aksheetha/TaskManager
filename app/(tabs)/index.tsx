// Import necessary hooks and components from React and React Native
import { useState } from 'react';
import { LayoutAnimation, UIManager, View, FlatList, Platform, StyleSheet, Text } from 'react-native';
import TaskInput from '@/components/TaskInput'; // Custom component for adding tasks
import TaskItem, { TaskItemTitle } from '../../components/TaskItem'; // Custom components for task display

// Enable layout animation for Android if supported
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define Task interface for strong typing of task objects
export interface Task {
  id: string; // Unique identifier for the task
  text: string; // Task description
  completed: boolean; // Completion status of the task
}

// Main component for the Home screen
export default function HomeScreen() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Handler to add a new task
  const addTaskHandler = (taskText: string) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), text: taskText, completed: false }, // Add new task with unique ID
    ]);
  };

  // Handler to toggle the completion status of a task
  const toggleTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation for UI updates
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task // Toggle the `completed` property
      )
    );
  };

  // Handler to delete a task
  const deleteTaskHandler = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth animation for UI updates
    setTasks((prev) => prev.filter((task) => task.id !== id)); // Remove the task with the given ID
  };

  return (
    <View style={styles.container}>
      {/* Title component for the task list */}
      <TaskItemTitle />
      
      {/* Input component to add new tasks */}
      <TaskInput onAddTask={addTaskHandler} />

      {/* Conditional rendering: Show message if no tasks, otherwise show the task list */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks} // Data source for the list
          keyExtractor={(item) => item.id} // Unique key for each item
          renderItem={({ item }) => (
            <TaskItem
              task={item} // Pass task data to the TaskItem component
              onToggleComplete={toggleTaskHandler} // Pass toggle handler
              onDelete={deleteTaskHandler} // Pass delete handler
            />
          )}
        />
      )}
    </View>
  );
}

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff', // White background
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center', // Center the message
  },
  emptyText: {
    color: '#666', // Gray text color
    fontSize: 16, // Font size for the message
  },
});