import  {useCallback, useState} from 'react';


const UseFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async ({url, method = "GET", headers = {}, body}, setData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null
            })
            if (!response.ok) {
                throw new Error(`Request failed! ${response.status}`)
            }
            const data = await response.json()
            setData(data)
        } catch (e) {
            setError(e.message || "sth went wrong!!!")
        }
        setIsLoading(false)
    }, [])
    return {isLoading, error, sendRequest}
};

export default UseFetch;