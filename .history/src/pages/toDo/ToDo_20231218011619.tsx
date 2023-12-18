import { useReducer, useState } from "react";
const initialState = {}
function reducer() {

}
const ToDo: React.FC = () => {
    const [dispatch, state] = useReducer(state = initialState, reducer)
    type FormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => void;
    const handleFormSubmit: FormSubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const response = formData.get('todo') ?? ""
        dispatch({
            type: "add",
            payload
        })
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