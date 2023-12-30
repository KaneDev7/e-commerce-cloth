import { UserDataResponse } from '@/domain/entities/User'
import { createContext } from 'react'

export const UserContext = createContext<UserDataResponse | null> (null)



