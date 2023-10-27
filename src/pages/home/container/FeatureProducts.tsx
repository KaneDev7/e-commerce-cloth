import Card from "../../../components/Card"

type FetureType = { type: string }

export type ProductType = {
  id: number,
  img: string,
  img2?: string
  title: string,
  isNew?: boolean
  oldPrice: number,
  price: number
}

export const products: ProductType[] = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
    img2: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: 'Long Sleeve Graphic T-shirt',
    isNew: true,
    oldPrice: 19,
    price: 12
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: 'Coat',
    isNew: true,
    oldPrice: 19,
    price: 12
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1457983/pexels-photo-1457983.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: 'Strick',
    oldPrice: 19,
    price: 12
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: 'Hat',
    oldPrice: 19,
    price: 12
  },
]
export default function FeatureProducts({ type }: FetureType) {


  return (
    <div className="flex justify-center items-center my-[5rem] mx-20">

      <div className="w-full max-w-[1500px] ">
        <div className=" flex justify-between items-center gap-20 flex-wrap">
          <h1 className="text-4xl text-black/90 font-bold"> {`${type === 'feature' ? 'Featured Products' : 'Tending Products'}`} </h1>
          <p className="w-full max-w-[900px] text-gray-500 text-[17px] text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque neque error numquam?
            Suscipit iusto quasi consequuntur repudiandae dicta, minima nesciunt veritatis
            natus cupiditate cum quisquam laboriosam non accusantium temporibus quod?
            Suscipit iusto quasi consequuntur repudiandae dicta, minima nesciunt veritatis
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-wrap gap-12 mt-10">

            {
              products.map(product => (
                <Card product={product} />
              ))
            }
          </div>
        </div>

      </div>

    </div>
  )
}
