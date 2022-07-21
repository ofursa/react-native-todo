import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Task = ({text, completeTask, deleteTask, updateTask, index}) => {
  const [completed, setCompleted] = useState(false);

  const handleClick = () => {
    setCompleted(true);
    completeTask(index);
  };

  const handleUpdate = () => {
    updateTask(index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={handleClick}>
          <View style={completed ? styles.squareCompleted : styles.square} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpdate} style={styles.itemTextWrapper}>
          <Text style={completed ? styles.itemTextCompleted : styles.itemText}>
            {text}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <View style={styles.circular} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    borderColor: '#55bcf6',
    borderWidth: 2,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  squareCompleted: {
    width: 24,
    height: 24,
    backgroundColor: '#55bcf6',
    opacity: 1,
    borderRadius: 5,
    marginRight: 15,
  },
  itemTextWrapper: {
    maxWidth: '80%',
  },
  itemTextCompleted: {
    width: '100%',
    textDecorationLine: 'line-through',
    opacity: 0.4,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55bcf6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
