import { useReducer, useState } from "react";
const initialState = {}
const reducer = 
const ToDo: React.FC = () => {
    const [dispatch, initialState] = useReducer(state = initialState, reducer)
    type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
    const handleFormSubmit: FormSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const response = formData.get('todo') ?? ""

    };
    return (
        <>
            <h1>To-Do</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="todo" />
                <button>add</button>
            </form>

        </>
    )
}

export default ToDo;