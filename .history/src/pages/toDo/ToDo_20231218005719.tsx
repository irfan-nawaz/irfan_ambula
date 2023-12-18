const ToDo: React.FC = () => {
    function handleFormSubmit: React.Event (e) {
        e.preventDefault();
    }
    return (
        <>
            <h1>To-Do</h1>
            <form onSubmit={handleFormSubmit}>
                <input type="text" />
                <button>add</button>
            </form>
        </>
    )
}

export default ToDo;