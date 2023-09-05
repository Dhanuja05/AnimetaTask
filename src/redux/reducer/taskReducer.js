const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task, index) => index !== action.payload),
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    default:
      return state;
  }
};

export default taskReducer;
