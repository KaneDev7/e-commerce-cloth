import { baseRequest } from "@/axios/baseRequest"


export const updateRecentlyViewsData = async (data, productId) => {
   console.log(productId, typeof productId)
    try {
        const response = await baseRequest.put(`/products/${productId}`,
            JSON.stringify(data),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        console.log('succes')
    } catch (err: any) {
        console.log(err)
    }
}