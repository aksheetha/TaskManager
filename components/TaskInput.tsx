import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  onAddTask: (taskText: string) => void; // Function to handle adding a new task
}

const TaskInput: React.FC<Props> = ({ onAddTask }) => {
  const [enteredTask, setEnteredTask] = useState(''); // State to store the entered task text

  // Function to handle the "Add" button press
  const handleAdd = () => {
    if (enteredTask.trim()) { // Ensure the task is not empty or just whitespace
      onAddTask(enteredTask); // Pass the task text to the parent component
      setEnteredTask(''); // Clear the input field
    }
  };

  return (
    <View style={styles.container}>
      {/* Input field for entering a new task */}
      <TextInput
        placeholder="Add a new task..."
        placeholderTextColor="#aaa"
        value={enteredTask}
        onChangeText={setEnteredTask}
        style={styles.input}
      />
      {/* Button to add the task */}
      <Pressable
        onPress={handleAdd}
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }, // Add visual feedback on press
        ]}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
};

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
