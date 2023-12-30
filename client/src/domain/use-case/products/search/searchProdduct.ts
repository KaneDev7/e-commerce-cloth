import { baseRequest } from "@/infrastructure/axios/baseRequest"


export const searchProduct = async (value: string) => {
    if (value.trim() === '') return []
    try {
        const response = await baseRequest.get(`/products?populate=*&filters[title][$contains]=${value}`)
        return response?.data?.data

    } catch (err: any) {
        console.log(err)
    }

}