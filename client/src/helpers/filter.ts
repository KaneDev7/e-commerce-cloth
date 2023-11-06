class Filter {
    #filterArr : string[ ]=[]

    addSize(size : string){
        this.#filterArr.push(`&[filters][type][$eq]=${size}`)
    }

    addColor(size : string){
        this.#filterArr.push(size)
    }

    addSubCategory(size : string){
        this.#filterArr.push(size)
    }
}