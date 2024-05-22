import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { ListContext } from '../src/context/listContextProvider';

const useTodoItem = (id) => {
    const [item, setItem] = useState({});
    const {list} = useContext(ListContext);
    const exists = list.find(task => task._id === id);
    
    if(exists) return exists;
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`api/item/${id}`);
                setItem(res.data);

            } catch(err) {
                if(err) throw err;
            }
        }
        fetchItem();

    }, []);
    
    return item;
}

export default useTodoItem