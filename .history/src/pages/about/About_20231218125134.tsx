import { useContextState } from "../../context/StateContext";
const About: React.FC = () => {
    const { name, data, setData } = useContextState()
    console.log(name)
    return (
        <>
            About
            {data}
            <button onClick={()}>inc</button>
        </>

    )
}

export default About;