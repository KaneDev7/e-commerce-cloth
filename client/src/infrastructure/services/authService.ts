import { baseRequest } from '../axios/baseRequest'

type Props = {
  url: string,
  data: Object
}

export class AuthService {

  async register(data: Object) {
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


  async login(data: Object) {
    try {
      const response = await baseRequest.post('/auth/local', JSON.stringify(data),
        {
          headers: { 'Content-Type': 'application/json' },
        })
      return response
    } catch (error) {
      return error.response
    }
  }



  async forgotPassword(email: string) {
    try {
      const response = await baseRequest.post('/auth/forgot-password',
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      return response.data.ok

    } catch (error) {
     console.log(error)
    }
  }

  
  async resetPassword(code : string | undefined, data) {
    try {
      const response = await baseRequest.post('/auth/reset-password',
        JSON.stringify({code,...data}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      return response.data.ok

    } catch (error) {
     console.log(error)
    }
  }


 
}


