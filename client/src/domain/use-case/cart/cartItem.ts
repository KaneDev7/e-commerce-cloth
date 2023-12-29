
export const  getArticleInCartOfCurrentUser = (cart, cartInfos) =>{
    const articleInCartOfCurrentUser = cart.find(item => {
      return  item.id === cartInfos.productId && 
      cartInfos.username.trim() === item.username.trim()
    })

    return articleInCartOfCurrentUser
}


export const checkIsArticleHasSameSize = (article, selectSize) =>{
    const isArticleHasSameSize = article.size.some(item =>{
        return item === selectSize
    } )

    return isArticleHasSameSize 
}