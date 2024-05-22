import { useState, useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast  } from 'react-toastify';
import axios from 'axios';

import {ListContext} from '../context/listContextProvider.jsx';
import useTodoItem from '../../hooks/useTodoItem.js';

const TodoItem = () => {
  const {id} = useParams();
  const {setList,list} = useContext(ListContext);

  const item = useTodoItem(id);
  const [newItem, setNewItem] = useState({
    title: (item)? item.title: '',
    desc: (item)? item.desc: ''
  });
  
  function handleChange(e) {
    setNewItem({...newItem, [e.target.name]: e.target.value});
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if(newItem.title && newItem.desc) {
      try {
        const res = await axios.put(`/api`, {
          id: id,
          title: newItem.title,
          desc: newItem.desc
        });
        setList([...list, res.data]);
        toast.success(`Item updated!`);
  
      } catch(err) {
        if(err) throw `error updating the data: ${err}`;
      }
      
    } else {
      let res = (newItem.title.length == 0 && newItem.desc.length == 0)? "title and description are": 
      (newItem.title.length == 0)? "title is": 
      (newItem.desc.length == 0)? "description is": "";
      toast.error(`${res} required`);
    }
  }

  useEffect(() => {
    setNewItem(item);
  }, [item]);


  return (
    <div className='px-[1rem] pb-[1rem] bg-gradient-to-b from-blue-950 to-blue-600 text-white fixed top-0 left-0 h-[100vh] w-[100vw] overflow-auto'>
      <div className="text-[2rem] text-center font-poppins-medium my-[1rem]">What's new?</div>
      <form className='flex flex-col justify-between gap-[1rem] md:max-w-[90vw] md:m-auto'>
        <textarea rows={1} type="text" name='title' value={newItem?.title} onChange={(e) => handleChange(e)} className='border bg-transparent border-b-white p-[.25rem] text-white rounded outline-none text-center text-[2rem] md:text-[3rem]'/>
        <textarea rows={1} name='desc' value={newItem?.desc} onChange={(e) => handleChange(e)} className='h-[20rem] border bg-transparent border-b-white  text-white rounded outline-none text-center text-[2rem] md:text-[2rem]'/>
        <div className='flex flex-col items-center gap-[.75rem] mt-[.5rem] md:flex-row md:justify-center'>
          <button type='submit' onClick={(e) => handleUpdate(e)} className='py-[.25rem] border border-solid border-green-600 rounded-lg text-black bg-green-600 text-sm font-poppins-medium w-[100%] md:w-[7rem] md:p-[.5rem]'>Update Item</button>
          <Link to='/home' className='py-[.25rem] border border-solid border-[#1c1c1c] rounded-lg text-white bg-[#1c1c1c] text-sm font-poppins-medium w-[100%] text-center md:w-[7rem] md:p-[.5rem]'>Go back</Link>
        </div>
      </form>
    </div>
  )
}

export default TodoItem