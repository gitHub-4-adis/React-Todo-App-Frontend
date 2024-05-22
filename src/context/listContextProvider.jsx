import React, {useState} from 'react';

const ListContext = React.createContext();

const ListContextProvider = ({children}) => {
    const [list, setList] = useState([]);
    return (
        <>
            <ListContext.Provider value={{list, setList}} >
                {children}
            </ListContext.Provider>
        </>
    );
}

export {ListContext, ListContextProvider};