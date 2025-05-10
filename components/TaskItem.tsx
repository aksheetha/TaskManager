// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { Animated, Text, View, StyleSheet, Pressable } from 'react-native'
import { Platform } from 'react-native';;
import { Task } from '../index'; // Import Task interface for type safety
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Icons for task status and dark mode
import { MaterialIcons } from '@expo/vector-icons'; // Icons for delete action
import { Swipeable } from 'react-native-gesture-handler'; // Swipeable component for swipe actions

// Define props for the TaskItem component
interface Props {
  task: Task; // Task object containing id, text, and completion status
  onToggleComplete: (id: string) => void; // Function to toggle task completion
  onDelete: (id: string) => void; // Function to delete a task
  isDarkMode: boolean; // Boolean to determine if dark mode is enabled
}

// Define props for the TaskItemTitle component
interface TaskItemTitleProps {
  isDarkMode: boolean; // Boolean to determine if dark mode is enabled
  toggleDarkMode: () => void; // Function to toggle dark mode
  bulbScale: Animated.Value; // Animated value for scaling the lightbulb icon
}

// A reusable title component for the Task Manager app
const TaskItemTitle: React.FC<TaskItemTitleProps> = ({ isDarkMode, toggleDarkMode, bulbScale }) => (
  <View style={styles.titleContainerWithBulb}>
    {/* Title and subtitle of the app */}
    <View>
      <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#007aff' }]}>Task Manager</Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>Organize. Track. Complete.</Text>
    </View>
    {/* Lightbulb icon to toggle dark mode */}
    <Pressable onPress={toggleDarkMode} style={styles.bulbButton}>
      <Animated.View style={{ transform: [{ scale: bulbScale }] }}>
        <MaterialCommunityIcons
          name={isDarkMode ? 'lightbulb-off' : 'lightbulb-on'}
          size={30}
          color={isDarkMode ? '#aaa' : '#ffd700'}
        />
      </Animated.View>
    </Pressable>
  </View>
);

// Component to display individual tasks
const TaskItem: React.FC<Props> = ({ task, onToggleComplete, onDelete, isDarkMode }) => {
  // Function to render the delete button when swiping
  const renderRightActions = () => {
    return (
      <Pressable onPress={() => onDelete(task.id)} style={styles.rightAction}>
        <MaterialIcons name="delete" size={24} color="white" />
      </Pressable>
    );
  };

  // Animated value for fade-in effect
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Trigger fade-in animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, []);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      {/* Animated container for the task item */}
      <Animated.View
        style={[
          styles.taskItem,
          { opacity: fadeAnim, backgroundColor: isDarkMode ? '#1c1c1e' : '#eef7f1' }, // Background color based on dark mode
          task.completed && { backgroundColor: isDarkMode ? '#2c2c2e' : '#e9fbe9' }, // Different color for completed tasks
        ]}
      >
        {/* Task text and status */}
        <Pressable onPress={() => onToggleComplete(task.id)} style={styles.taskTextContainer}>
          <MaterialCommunityIcons
            name={task.completed ? 'checkbox-marked' : 'checkbox-blank-outline'} // Checkbox icon based on completion status
            size={24}
            color={task.completed ? '#007aff' : isDarkMode ? '#aaa' : '#ccc'}
            style={styles.status}
          />
          <Text
            style={[
              styles.text,
              { color: isDarkMode ? '#fff' : '#333' }, // Text color based on dark mode
              task.completed && styles.textDone, // Strikethrough style for completed tasks
            ]}
          >
            {task.text}
          </Text>
        </Pressable>
      </Animated.View>
    </Swipeable>
  );
};

// Styles for the TaskItem and TaskItemTitle components
const styles = StyleSheet.create({
  titleContainerWithBulb: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  bulbButton: {
    padding: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    padding: 14,
    borderRadius: 16,
    justifyContent: 'space-between',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', // Replaced shadow* properties with boxShadow
    elevation: 1, // Keep elevation for Android shadow
  },
  taskTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  textDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  status: {
    fontSize: 18,
  },
  rightAction: {
    backgroundColor: '#f54242',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderRadius: 16,
    marginVertical: 6,
  },
});

export default TaskItem;
export { TaskItemTitle };