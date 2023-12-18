import { useEffect, useState } from "react";

interface CatFacts {
    fact: string;
}

const ApiFetchView: React.FC = () => {
    const [catFacts, setCatFacts] = useState<CatFacts | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Function to fetch cat facts
        const fetchCatFacts = async () => {
            try {
                // Fetch cat facts from the Cat Facts API
                const response = await fetch('https://catfact.ninja/fact');
                const data = await response.json();
                setCatFacts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cat facts:', error);
                setError('Error fetching cat facts. Please try again.');
                setLoading(false);
            }
        };

        fetchCatFacts();
    }, []);
    return (
        <>
            <h2>Cat Facts</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <p>{catFacts.fact}</p>
                    <button onClick={}>Next</button>
                </>
            )}
        </>
    )
}

export default ApiFetchView;