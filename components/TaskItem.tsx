import React, { useState, useEffect } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Task } from '../app/(tabs)/index';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

interface Props {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isDarkMode: boolean;
}

interface TaskItemTitleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  bulbScale: Animated.Value;
}

const TaskItemTitle: React.FC<TaskItemTitleProps> = ({
  isDarkMode,
  toggleDarkMode,
  bulbScale,
}) => (
  <View style={styles.titleContainerWithBulb}>
    <View>
      <Text
        style={[styles.title, { color: isDarkMode ? '#fff' : '#007aff' }]}
      >
        Task Manager
      </Text>
      <Text
        style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#666' }]}
      >
        Organize. Track. Complete.
      </Text>
    </View>
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

const TaskItem: React.FC<Props> = ({
  task,
  onToggleComplete,
  onDelete,
  isDarkMode,
}) => {
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, []);

  const renderRightActions = () => (
    <Pressable onPress={() => onDelete(task.id)} style={styles.rightAction}>
      <MaterialIcons name="delete" size={24} color="white" />
    </Pressable>
  );

  const content = (
    <Animated.View
      style={[
        styles.taskItem,
        { opacity: fadeAnim, backgroundColor: isDarkMode ? '#1c1c1e' : '#eef7f1' },
        task.completed && {
          backgroundColor: isDarkMode ? '#2c2c2e' : '#e9fbe9',
        },
      ]}
    >
      <Pressable
        onPress={() => onToggleComplete(task.id)}
        style={styles.taskTextContainer}
      >
        <MaterialCommunityIcons
          name={task.completed ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={task.completed ? '#007aff' : isDarkMode ? '#aaa' : '#ccc'}
          style={styles.status}
        />
        <Text
          style={[
            styles.text,
            { color: isDarkMode ? '#fff' : '#333' },
            task.completed && styles.textDone,
          ]}
        >
          {task.text}
        </Text>
      </Pressable>
    </Animated.View>
  );

  // Skip Swipeable on web to avoid findDOMNode warning
  return Platform.OS === 'web' ? content : (
    <Swipeable renderRightActions={renderRightActions}>
      {content}
    </Swipeable>
  );
};

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
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 1,
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
