import {useEffect, useState} from 'react'
import { baseRequest } from '../../infrastructure/axios/baseRequest'

type Product = {
      
}

export default function useFetch(url : string) {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const  fetchData = async ()=> {
         try {
          setIsLoading(true)
          const response = await baseRequest.get(url)
          setData(response.data.data)

         } catch (err : any) {
          console.log(err)
          setError(err)
         }
         setIsLoading(false)

        }
        fetchData()
      }, [url])

      return {data, isLoading, error}
}