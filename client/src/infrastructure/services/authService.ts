import { baseRequest } from '../axios/baseRequest'

type Props = {
  url: string,
  data: Object
}

export class AuthService {

  async register(data : Object ) {
    try {
       const response = await baseRequest.post('/auth/local/register', JSON.stringify(data),
      {
        headers: { 'Content-Type': 'application/json' },
      })

    return response
      
    } catch (error) {
      return error.response
    }
  }


  async login(data : Object ) {
    try {
      const  response = await baseRequest.post('/auth/local', JSON.stringify(data),
      {
        headers: { 'Content-Type': 'application/json' },
      })
    return response
      
    } catch (error) {
      return error.response
    }
  }


}


