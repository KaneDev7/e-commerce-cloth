import { AuthService } from "@/infrastructure/services/authService"

export const registeUser = async (data) =>{
    let error, userData 
    const auth = new AuthService()
    const response = await auth.register(data)  

    if(response.status === 200){
        sessionStorage.setItem('user', JSON.stringify(response.data))
        userData = response.data
    }     

    const errMessage = response?.data?.error?.message 

    if(errMessage === 'Email or Username are already taken'){
        error = "L'email ou mots de passe est deja pris"
      }else if(errMessage === 'password must be at least 6 characters' ) {
         error = "Le mot de passe doit etre au minimum 6 caractères"       
      } 

    return {error, userData}
}


export const connectUser = async (data) =>{
    let error, userData 
    const auth = new AuthService()
    const response = await auth.login(data)       
    
    if(response.status === 200){
        sessionStorage.setItem('user', JSON.stringify(response.data))
        userData = response.data
    }     

    const errMessage = response?.data?.error?.message 

    if(errMessage === 'Invalid identifier or password'){
        error = "Identifiant ou mot de passe invalide"
      }

    return {error, userData}
}