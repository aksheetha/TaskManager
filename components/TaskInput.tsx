// Import necessary libraries and components
import React, { useState, useRef } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Animated } from 'react-native';

// Define the props for the TaskInput component
interface Props {
  onAddTask: (taskText: string) => void; // Function to handle adding a new task
}

// TaskInput component for adding new tasks
const TaskInput: React.FC<Props> = ({ onAddTask }) => {
  // State to store the entered task text
  const [enteredTask, setEnteredTask] = useState('');

  // Animated value for the shake effect
  const shakeAnimation = useState(new Animated.Value(0))[0];

  // Reference to the TextInput for focusing after adding a task
  const inputRef = useRef<TextInput>(null);

  // Function to trigger a shake animation when the input is invalid
  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -6, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Function to handle adding a task
  const handleAdd = () => {
    if (enteredTask.trim()) {
      // If the task is valid, call the onAddTask function and clear the input
      onAddTask(enteredTask.trim());
      setEnteredTask('');
      // Focus the input field after a short delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Trigger the shake animation if the input is empty
      triggerShake();
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated container for the input field */}
      <Animated.View style={{ flex: 1, transform: [{ translateX: shakeAnimation }] }}>
        <TextInput
          ref={inputRef} // Reference to the input field
          placeholder="Add a new task..." // Placeholder text
          placeholderTextColor="#aaa" // Placeholder text color
          value={enteredTask} // Bind the input value to the state
          onChangeText={setEnteredTask} // Update the state when the input changes
          onSubmitEditing={handleAdd} // Add the task when the "Enter" key is pressed
          style={styles.input} // Apply styles to the input
          returnKeyType="done" // Set the return key type to "done"
        />
      </Animated.View>

      {/* Button to add the task */}
      <Pressable
        onPress={handleAdd} // Call handleAdd when the button is pressed
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }, // Add visual feedback when pressed
        ]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
};

// Styles for the TaskInput component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange input and button in a row
    marginBottom: 16, // Add spacing below the container
    alignItems: 'center', // Align items vertically in the center
    gap: 10, // Add spacing between input and button
  },
  input: {
    flex: 1, // Take up available space
    padding: 12, // Add padding inside the input
    borderRadius: 12, // Round the corners
    backgroundColor: '#f1f5f9', // Soft gray background
    color: '#333', // Text color
    fontSize: 16, // Font size for input text
    borderWidth: 1, // Add a border
    borderColor: '#e0e0e0', // Light gray border color
  },
  button: {
    backgroundColor: '#007aff', // Blue background for the button
    paddingHorizontal: 18, // Horizontal padding
    paddingVertical: 12, // Vertical padding
    borderRadius: 12, // Round the corners
  },
  buttonText: {
    color: '#fff', // White text color
    fontWeight: '600', // Semi-bold text
    fontSize: 16, // Font size for button text
  },
});

export default TaskInput;
