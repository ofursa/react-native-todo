/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';
import Task from './src/Components/Task';

const App = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isTaskExisted, setIsTaskExisted] = useState(false);
  const [taskIndex, setTaskIndex] = useState(null);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTimeout(() => setTaskItems(itemsCopy), 500);
  };

  const updateTask = index => {
    showModal();
    setTaskIndex(index);
    setTask(taskItems[index]);
    setIsTaskExisted(true);
  };

  const handleUpadteTask = () => {
    let itemsCopy = [...taskItems];
    itemsCopy[taskIndex] = task;
    setTaskItems(itemsCopy);
    setTaskIndex(null);
    setTask('');
    setIsTaskExisted(false);
    hideModal();
  };

  const deleteTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const hideModal = () => {
    setModalVisible(!modalVisible);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <Task
                text={item}
                key={uuid()}
                completeTask={completeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                index={index}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.addTaskWrapper}>
        <TouchableOpacity onPress={showModal}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={hideModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modal}>
            <View style={styles.modalInner}>
              <View style={styles.writeTaskWrapper}>
                <TextInput
                  placeholder="Add new task"
                  style={styles.input}
                  value={task}
                  onChangeText={text => setTask(text)}
                  autoFocus={true}
                />
              </View>
              <View style={styles.btnContainer}>
                {!isTaskExisted ? (
                  <Button
                    style={styles.btn}
                    onPress={handleAddTask}
                    title="Add"
                    color="#000"
                  />
                ) : (
                  <Button
                    style={styles.btn}
                    onPress={handleUpadteTask}
                    title="Edit"
                    color="#000"
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  addTaskWrapper: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  input: {
    padding: 15,
    width: '100%',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {},
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 0,
  },
  modalInner: {
    maxHeight: '40%',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  btnContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 20,
  },
});

export default App;
