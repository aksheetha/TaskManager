// components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Task } from '../app/(tabs)/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

// Define the props for the TaskItem component
interface Props {
  task: Task; // The task object containing task details
  onToggleComplete: (id: string) => void; // Function to toggle task completion
  onDelete: (id: string) => void; // Function to delete the task
}

// A reusable title component for the Task Manager app
const TaskItemTitle = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>Task Manager</Text>
    <Text style={styles.subtitle}>Organize. Track. Complete.</Text>
  </View>
);

// The main TaskItem component to display individual tasks
const TaskItem: React.FC<Props> = ({ task, onToggleComplete, onDelete }) => {
  const renderRightActions = () => {
    return (
      <Pressable onPress={() => onDelete(task.id)} style={styles.rightAction}>
        <MaterialIcons name="delete" size={24} color="white" />
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={[styles.taskItem, task.completed && styles.completedTask]}>
        {/* Pressable to toggle task completion */}
        <Pressable onPress={() => onToggleComplete(task.id)} style={styles.taskTextContainer}>
          <MaterialCommunityIcons
            name={task.completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={task.completed ? '#007aff' : '#ccc'}
            style={styles.status}
          />
          <Text style={[styles.text, task.completed && styles.textDone]}>
            {task.text} {/* Display task text */}
          </Text>
        </Pressable>
      </View>
    </Swipeable>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4, // Space between title and subtitle
  },
  titleContainer: {
    marginBottom: 20, // Space below the title container
    alignItems: 'center', // Center align title and subtitle
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007aff', // Blue color for the title
  },
  taskItem: {
    flexDirection: 'row', // Arrange items in a row
    alignItems: 'center',
    backgroundColor: '#eef7f1', // Light green background
    marginVertical: 6, // Space between task items
    padding: 14, // Padding inside the task item
    borderRadius: 16, // Rounded corners
    justifyContent: 'space-between', // Space between text and delete icon
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.05, // Shadow transparency
    shadowRadius: 2, // Shadow blur radius
    elevation: 1, // Elevation for Android shadow
  },
  completedTask: {
    backgroundColor: '#e9fbe9', // Light green background for completed tasks
  },
  taskTextContainer: {
    flexDirection: 'row', // Arrange status and text in a row
    alignItems: 'center',
    flex: 1, // Take up remaining space
  },
  text: {
    fontSize: 16,
    color: '#333', // Dark text color
    fontWeight: '500', // Medium font weight
  },
  textDone: {
    textDecorationLine: 'line-through', // Strike-through for completed tasks
    color: '#999', // Gray color for completed tasks
    fontWeight: '400', // Regular font weight
  },
  status: {
    fontSize: 18,
    color: '#333', // Dark color for status icon
    marginRight: 8, // Space between status icon and text
  },
  rightAction: {
    backgroundColor: '#f54242', // Red background for delete action
    justifyContent: 'center', // Center align the delete icon
    alignItems: 'center', // Center align the delete icon
    width: 70, // Fixed width for the swipe action
    borderRadius: 16, // Match the task item border radius
  },
});

export default TaskItem;
export { TaskItemTitle };
