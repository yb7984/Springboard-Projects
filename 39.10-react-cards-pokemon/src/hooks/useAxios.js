import axios from 'axios';
import useLocalStorage from './useLocalStorage';

const useAxios = (baseUrl, localStorageKey = '') => {
    const [array, setArray] = useLocalStorage(localStorageKey, []);

    const add = async (formatter = (data) => data, restUrl = '') => {

        const resp = await axios.get(baseUrl + restUrl);

        setArray(data => ([...data, formatter(resp.data)]))
    }

    const clear = () => {
        setArray([]);
    }

    return [array, add, clear]
}

export default useAxios;