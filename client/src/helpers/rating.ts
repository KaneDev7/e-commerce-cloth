
export  const getRating = (rating = '[]') =>{
    if(rating === null) return '(0)'
    return `(${JSON.parse(rating).length})`
} 