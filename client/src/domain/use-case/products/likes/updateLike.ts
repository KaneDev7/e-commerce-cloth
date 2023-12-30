import { baseRequest } from "@/infrastructure/axios/baseRequest"

export const updateLikeData = async (data, productId) => {
    try {
        const response = await baseRequest.put(`/products/${productId}`,
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
