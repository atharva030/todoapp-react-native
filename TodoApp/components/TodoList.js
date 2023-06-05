import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';

const { width, height } = Dimensions.get('window');

const TodoList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [titleList, settitleList] = useState('');
  const [descList, setdescList] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  const loadTasksFromStorage = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.log('Error loading tasks from storage:', error);
    }
  };

  const saveTasksToStorage = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.log('Error saving tasks to storage:', error);
    }
  };
  const [selected, setSelected] = useState(false);

  const handleToggleSelect = () => {
    setSelected(!selected);
  };
  const handleAddTask = () => {
      const newTask = {
        id: Math.random().toString(),
        title: newTaskTitle,
        description: newTaskDescription,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setModalVisible(false);
  };

  const handleClearTasks = () => {
    setTasks([]);
    saveTasksToStorage([]);
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <Text style={styles.topText}>Task Details</Text>
          </View>
          <View style={styles.taskDetailsContainer}>
            <Text style={styles.taskLabel}>Task Title</Text>
            {titleList===""?<Text style={{color:"black"}}>Please select/create the note to show</Text>:
            <Text style={styles.taskTitle}>{titleList}</Text>}
            <Text style={styles.taskLabel}>Task Description</Text>
          {descList===""?<Text style={{color:"black"}}>Please select/create the note to show</Text>  :<Text style={styles.taskDescription}>{descList}</Text>}
          </View>
          <View style={styles.avatars}>
            <View style={styles.avatar}>
              <View style={styles.imageContainer} />
            </View>
            <View style={styles.avatar}>
              <View style={styles.imageContainer} />
            </View>
            <View style={styles.avatar}>
              <View style={styles.imageContainer} />
            </View>
            <View style={styles.avatar}>
              <View style={styles.imageContainer} />
            </View>
          </View>
          <View style={styles.taskListContainer}>
            <View style={styles.taskListHeader}>
              <Text style={styles.taskListHeaderText}>Task List</Text>
              <TouchableOpacity onPress={handleClearTasks}>
                <Icon name="md-trash" size={25} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
            {tasks.map((task) => (
              <TaskItem key={task.id} title={task.title} desc={task.description} settitleList={settitleList} setdescList={setdescList} />
            ))}

            <TouchableOpacity
              style={[
                styles.taskItem,
              ]}
              onPress={() => setModalVisible(true)}
            >
              <Icon
                name="ios-add"
                size={30}
                color="black"
              />
              <Text style={styles.itemText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Task</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter the title"
                placeholderTextColor="grey" 
                value={newTaskTitle}
                onChangeText={(text) => setNewTaskTitle(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Enter the Description"
                placeholderTextColor="grey" 
                value={newTaskDescription}
                onChangeText={(text) => setNewTaskDescription(text)}
                multiline
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleAddTask}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    padding: 20,
    flexGrow: 1,
  },
  topText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9fb',
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  selectedItem: {
    backgroundColor: '#e0e0e0',
  },
  itemText: {
    color: 'black',
    marginLeft: 20,
    fontSize: 16,
  },
  taskDetailsContainer: {
    marginTop: 20,
  },
  taskLabel: {
    color: 'grey',
    marginTop: 10,
  },
  taskTitle: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
  },
  taskDescription: {
    color: 'black',
    fontSize: 15,
    marginTop: 10,
  },
  avatars: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    borderRadius: 50,
    overflow: 'hidden',
    width: 30,
    height: 30,
    marginLeft: -10,
    borderWidth: 3,
    borderColor: '#FFF',
    marginTop: 10,
    marginBottom: 10,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: 'black',
  },
  taskListContainer: {
    marginTop: 10,
  },
  taskListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  taskListHeaderText: {
    color: 'grey',
    fontSize: 17,
  },
  deleteIcon: {
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7f56d9',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color:"black"
  },
  modalButton: {
    backgroundColor: '#7f56d9',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoList;
