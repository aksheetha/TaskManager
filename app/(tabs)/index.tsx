import { useState } from 'react';
import { LayoutAnimation, UIManager, View, FlatList, Platform, StyleSheet, Text, Pressable, Animated } from 'react-native';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bulbScale = useState(new Animated.Value(1))[0];
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <TaskItemTitle
        isDarkMode={isDarkMode}
        toggleDarkMode={() => {
          bounceBulb();
          setIsDarkMode((prev) => !prev);
        }}
        bulbScale={bulbScale}
      />

      <TaskInput onAddTask={addTaskHandler} />

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['all', 'active', 'completed'].map((type) => (
          <Pressable
            key={type}
            onPress={() => setFilter(type as 'all' | 'active' | 'completed')}
            style={[styles.filterButton, { backgroundColor: isDarkMode ? '#333' : '#eee' }, filter === type && { backgroundColor: '#007aff' }]}
          >
            <Text
              style={[styles.filterText, { color: filter === type ? '#fff' : isDarkMode ? '#eee' : '#333' }]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </Pressable>
        ))}
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

// Styles
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
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
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
