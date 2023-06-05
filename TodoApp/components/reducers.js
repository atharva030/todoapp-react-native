const initialState = {
    modalVisible: false,
    newTaskTitle: '',
    newTaskDescription: '',
    titleList: '',
    descList: '',
    tasks: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MODAL_VISIBLE':
        return { ...state, modalVisible: action.payload };
      case 'SET_NEW_TASK_TITLE':
        return { ...state, newTaskTitle: action.payload };
      case 'SET_NEW_TASK_DESCRIPTION':
        return { ...state, newTaskDescription: action.payload };
      case 'SET_TITLE_LIST':
        return { ...state, titleList: action.payload };
      case 'SET_DESC_LIST':
        return { ...state, descList: action.payload };
      case 'ADD_TASK':
        const newTask = {
          id: Math.random().toString(),
          title: state.newTaskTitle,
          description: state.newTaskDescription,
        };
        return { ...state, tasks: [...state.tasks, newTask] };
      case 'CLEAR_TASKS':
        return { ...state, tasks: [] };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  