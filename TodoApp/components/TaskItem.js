import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskItem = (props) => {
  const [selected, setSelected] = useState(false);
  const handleToggleSelect = (tit,desc) => {
    setSelected(!selected);
    props.settitleList(tit)
    props.setdescList(desc)
  };

  return (
    <TouchableOpacity
      style={[
        styles.taskItem,
        selected && styles.selectedItem,
      ]}
      onPress={()=>handleToggleSelect(props.title,props.desc)}
    >
      <Icon
        name={selected ? 'checkmark-circle-sharp' : 'ellipse-outline'}
        size={30}
        color={selected ? '#7f56d9' : 'grey'}
      />
      <Text style={styles.itemText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default TaskItem;
