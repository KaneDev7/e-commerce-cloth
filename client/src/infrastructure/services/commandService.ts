import { baseRequest } from '../axios/baseRequest'


export class CommandService {
  constructor(item = {}, coordonnes = {}) {
    this.coordonnes = coordonnes
    this.item = item
  }

  async getNumberOfCommand() {
    try {
      const response = await baseRequest.get(`/commands?[filters][productId]=${this.item.id}`)
      return response?.data?.data.length + 1

    } catch (error) {
      console.log(error)
    }
  }

  async createCommandData(email) {

    const numberOfCommand = await this.getNumberOfCommand()
    return {
      data: {
        productId: this.item.id,
        name: this.item.title,
        quantity: this.item?.quantity?.toString(),
        price: this.item?.price?.toString(),
        size: this.item?.size?.toString(),
        username: this.item.username,
        email,
        adress: this.coordonnes.adress,
        phone: this.coordonnes.phone,
        img: this.item.img,
        numberOfCommand: numberOfCommand * this.item?.quantity,
        statut: 'en attente'
      }
    }
  }

  async setCommande(data: Object, jwt: string) {
    try {
      await baseRequest.post('/commands',
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
          withCredentials: true,
        })

    } catch (error) {
      console.log(error)
    }
  }


  async updateCommand(id: number, updateItem) {
    await baseRequest.put(`/commands/${id}`,
      JSON.stringify({ data: updateItem }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
  }

  async getCommandsOfCurrentUser(username: string) {
    try {
      const response = await baseRequest.get(`/commands?populate=*&[filters][username]=${username}`);
      return response?.data?.data

    } catch (error) {
      console.log(error)
    }
  }

  async getCommands() {
    try {
      const response = await baseRequest.get(`/commands?populate=*&`);
      return response?.data?.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteCommand(id) {
    try {
      await baseRequest.delete(`/commands/${id}`)
    } catch (error) {
      console.log(error)
    }
  }
}


