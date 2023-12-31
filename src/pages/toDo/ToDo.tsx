import { useReducer } from "react";
import './toDo.css'

// declaring Type information.
type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;

type Todo = {
    name: string,
    status: boolean,
    id: number
}

type ActionType = {
    type: string,
    payload: string | number | Todo
}

interface StateType {
    toDoList: Todo[]
}

interface Reducertype { (state: StateType, action: ActionType): StateType }

// Initial state for the reducer function.
const initialState: StateType = {
    toDoList: [{ name: 'drink water', status: true, id: 1702844138587 }, { name: "exercise", status: false, id: 1702844156580 }],
}

// deckaring reducer function.
const reducer: Reducertype = (state = initialState, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                toDoList: [...state.toDoList, action.payload as Todo]
            }
        case 'toggle':
            return {
                ...state,
                toDoList: state.toDoList.map(toDo => toDo.id === action.payload ? { ...toDo, status: !toDo.status } : toDo)
            }

        case 'remove':
            return {
                ...state,
                toDoList: state.toDoList.filter(toDo => toDo.id !== action.payload)
            }

        default:
            return state;
    }
}

// creating ToDo component
const ToDo: React.FC = () => {
    // using useReducer for state management.
    const [state, dispatch] = useReducer(reducer, initialState);

    const totalTasks = state.toDoList?.length ?? 0;
    const completedTasks = state.toDoList?.filter((todo) => todo.status)?.length ?? 0;

    // declaring a form handler function
    const handleFormSubmit: FormSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const newTodoName = formData?.get('todo') + '' ?? "";

        // Check if the todo name already exists or any other invalid input
        if (state.toDoList.some(todo => todo.name.toLocaleLowerCase() === newTodoName.toLocaleLowerCase())) {
            alert("Todo with the same name already exists!");
            return;
        } else if (newTodoName.trim() === "") {
            alert("invalid input");
            return;
        }

        const response: Todo = { name: newTodoName, status: false, id: Date.now() };
        dispatch({
            type: "add",
            payload: response,
        });
        e.currentTarget.reset();
    };

    return (
        <div className="todo-container">
            <h1>To-Do</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="todo" required />
                <button>Add</button>
            </form>
            <ul>
                {state.toDoList.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span className={`todo-name ${todo.status ? 'completed' : ''}`}>{todo.name}</span>
                        <input
                            type="checkbox"
                            checked={todo.status}
                            onChange={() => {
                                dispatch({ type: "toggle", payload: todo.id });
                            }}
                        />
                        <button onClick={() => dispatch({ type: "remove", payload: todo.id })}>Delete</button>
                    </li>
                ))}
            </ul>
            <div>
                <h2>Summary</h2>
                <h4>Total Tasks: {totalTasks}</h4>
                <h4>Completed Tasks: {completedTasks}</h4>
            </div>
        </div>
    );
};

export default ToDo;