import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useFetch(url){
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios(url).then(res =>{setData(res.data)})
    },[url])

    return data
}