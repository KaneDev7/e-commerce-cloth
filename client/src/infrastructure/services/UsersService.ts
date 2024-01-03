import { baseRequest } from '../axios/baseRequest'

type Props = {
  url: string,
  data: Object
}

export class UsersService {

  async getUsers() {
    try {
      const response = await baseRequest.get('/users',
        {
          // headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      return response.data

    } catch (error) {
     console.log(error)
    }
  }

  async getUserDetail(jwt : string) {
    try {
      const response = await baseRequest.get('/users/me',
        {
          headers: { 
            'Content-Type': 'application/json' ,
            'Authorization': `Bearer ${jwt}`,
        },
          
          withCredentials: true
        })
      return response.data

    } catch (error) {
     console.log(error)
    }
  }
 
  async toggleUserStatut(userId: number, statut : boolean | null) {
    
    try {
      await baseRequest.put(`/users/${userId}`,
      JSON.stringify({isOnLine : statut}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })

    } catch (error) {
     console.log('toggleUserStatutErro', error)
    }
  }
}


