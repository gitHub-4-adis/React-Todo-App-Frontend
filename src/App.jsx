import React from 'react';
import { ListContextProvider } from './context/listContextProvider.jsx';
import Home from './components/Home.jsx';
import TodoItem from './components/TodoItem.jsx';

const App = () => {
    return (
        <>
            <Home />
            <TodoItem />
        </>
    );
}

export default App;