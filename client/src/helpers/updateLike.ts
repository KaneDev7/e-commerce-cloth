import { baseRequest } from "@/services/axios/baseRequest"



export const updateLikeData = async (data, productId) => {
    try {
        const response = await baseRequest.put(`http://localhost:1337/api/products/${productId}`,
            JSON.stringify(data),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )

    } catch (err: any) {
        console.log(err)
    }
}