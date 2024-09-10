// components/SearchBox.js
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react';
import { loadingBarProgress_Reducer } from '../redux/sharingData/sharingDataSlice';
import { useDispatch } from 'react-redux';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push(`/search/${encodeURIComponent(query)}`);
    };

    return (
            <div className='hidden md:flex items-center gap-3 border rounded-full px-10 py-2'>
                
                {/* <input className='outline-none' type='text' placeholder='Search' /> */}
                <form onSubmit={handleSubmit} className='flex'>
                    <input
                        className='outline-none'
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search..."
                    />
                    <button type="submit" onClick={()=>{dispatch(loadingBarProgress_Reducer(50))}}><Search /></button>
                </form>
            </div>
    );
};

export default SearchBox;
