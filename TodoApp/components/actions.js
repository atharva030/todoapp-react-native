export const setModalVisible = (visible) => ({
    type: 'SET_MODAL_VISIBLE',
    payload: visible,
  });
  
  export const setNewTaskTitle = (title) => ({
    type: 'SET_NEW_TASK_TITLE',
    payload: title,
  });
  
  export const setNewTaskDescription = (description) => ({
    type: 'SET_NEW_TASK_DESCRIPTION',
    payload: description,
  });
  
  export const setTitleList = (title) => ({
    type: 'SET_TITLE_LIST',
    payload: title,
  });
  
  export const setDescList = (description) => ({
    type: 'SET_DESC_LIST',
    payload: description,
  });
  
  export const addTask = () => ({
    type: 'ADD_TASK',
  });
  
  export const clearTasks = () => ({
    type: 'CLEAR_TASKS',
  });
  