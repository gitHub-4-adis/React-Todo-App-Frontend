import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { ListContext } from '../context/listContextProvider';

const Home = () => {
    const {list, setList} = useContext(ListContext);
    const [item, setItem] = useState({title: '', desc: ''});

    function handleOnChange(e) {
        setItem({...item, [e.target.name]: e.target.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post(`/api`, {
                title: item.title,
                desc: item.desc
            });
            setList([res.data, ...list]);

        } catch(err) {
            if(err) throw `error calling api: ${err}`;
        }
    }

    async function handleDelete(e, id) {
        e.preventDefault();
        try {
            const res = await axios.delete(`/api/item/${id}`);
            const {title} = list.find(item => item._id === id);
            setList(list => list.filter(item => item._id !== id));
            toast.error(`item deleted: ${title}`);

        } catch(err) {
            if(err) throw `error calling api: ${err}`;
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`/api`);
                setList(res.data);

            } catch(err) {
                console.error('Error fetching data:', err);
            }
        }
        fetchData();
    }, []);


    function getCurTime() {
        const arr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date();
        return (
            <div className='w-[100%] flex justify-between items-center my-[.75rem]'>
                <h6 className='font-poppins-bold text-[1rem]'>{arr[date.getDay()]}</h6>
                <div>
                    <span className='font-poppins-bold text-[1rem]'>{year[date.getMonth()]}, </span>
                    <span className='font-poppins-bold'>{[date.getFullYear()]}</span>
                </div>
            </div>
        ) 
    }

  return (
    <div className='px-[1rem] pb-[1rem] bg-gradient-to-b from-blue-950 to-blue-600 text-white min-h-[100vh]'>
        <div className="flex justify-start padding">{getCurTime()}</div>
        <form action="" className='flex flex-col justify-between gap-[.5rem] wmax-[10rem] md:max-w-[50vw] md:m-auto'>
            <input type="text" name='title' className='border bg-transparent border-solid border-white p-[.25rem] text-white rounded outline-none' placeholder='Title' onChange={handleOnChange}/>
            <input type="textarea" name='desc' placeholder='Add description' className='border bg-transparent border-solid border-white p-[.25rem] text-white rounded outline-none' onChange={handleOnChange}/>
            <button type='submit' onClick={(e) => handleSubmit(e)} className='p-[.25rem] border border-solid border-[#cfcfcf] rounded-lg bg-[#cfcfcf] text-sm text-black font-poppins-medium md:w-[auto] md:m-auto'>Add Item</button>
        </form>
        <ul className='flex flex-col gap-[1rem] mt-[2rem] md:mt-[1rem] md:max-w-[50vw] md:m-auto'>
            {list.map((item, ind) => (
                <li key={ind} className='flex justify-between items-center border border-white rounded-lg p-[.5rem]'>
                    <div className='font-poppins-medium text-3xl'>{item.title}</div>    
                    <div className='flex flex-col items-center gap-[.25rem]'>
                        <Link to={`/item/${item._id}`} className='font-poppins-medium text-sm'>View</Link>
                        <span onClick={(e) => handleDelete(e, item._id)} className="font-poppins-medium cursor-pointer text-sm">Delete</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Home;