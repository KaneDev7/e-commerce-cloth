import { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import { motion } from 'framer-motion'
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import List from "../components/List";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuListFilter } from "react-icons/lu";

import { GlobalContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetFilter } from "../redux/filterSlice";
//import { products } from "./home/container/FeatureProducts";

export default function Products() {

  const catId = parseInt(useParams().id)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [sort, setSort] = useState('desc')
  const filters = useSelector(state => state.filter)
  const [customFilters, setcustomFilters] = useState<string[]>([])
  const [showClosefilterBtn, setShowClosefilterBtn] = useState(false)

  const { data: categorie, isLoading: isLoadingCat, error: catError } = useFetch(`/categories/${catId}?populate=*&`)
  const { data: sizes, isLoading: isSizeLoading, error: sizeError } = useFetch(`/sizes`)
  const { data: subCategories, isLoading: isSubCategoriesLoading, error: subCategoriesError } = useFetch(`/sub-categories`)
  const { data: colors, isLoading: isColorsLoading, error: colorsError } = useFetch(`/colors`)

  const dispatch = useDispatch()

  const { showFilter, setShowFilter } = useContext(GlobalContext)


  // const { data, isLoading, error } = useFetch(`/products?[filters][categories][id][$eq]=${catId}`)

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxPrice(Number(e.target.value))
  }

  const handleAddFilter = (option) => {

    const isFilterExist = customFilters.some(item => item.id === option.id)
    if (!isFilterExist) {
      setcustomFilters(prev => [...prev, option])
    }
  }

  const handleDeleteFilter = (id) => {
    setcustomFilters(prev => prev.filter(item => item.id !== id))
  }

  const updateFilter = () => {
    const newFilter =  customFilters.map(item => `&[filters][${item.type}][${item.field}]=${item.value}` )
    dispatch(addFilter(newFilter))
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', () => {
      const lgScreen = window.matchMedia("(max-width : 1024px)").matches
      if (lgScreen) {
        setShowFilter(false)
        setShowClosefilterBtn(true)
      } else {
        setShowFilter(true)
        setShowClosefilterBtn(false)
      }
    })
  })

  useEffect(() => {
    dispatch(resetFilter())
  }, [])

  return (
    <div className="w-full globalWidth">
      <div className="w-full flex ">
        {/* SIDEBAR CATEGORY */}
        {
          showFilter &&
          <motion.div initial={{ x: -500, opacity: .2 }} animate={{ x: 0, opacity: 1 }}
            className="w-[25%] h-full p-10 lg:sticky lg:translate-x-[0] translate-x-[-500px] fixed top-[0] z-20  min-w-[400px] bg-white">
            {
              showClosefilterBtn &&
              <AiFillCloseCircle size={25} className='absolute right-5 top-10 text-primaryColor hover:text-primaryColorActif'
                onClick={() => setShowFilter(false)} />
            }


            {/* FILTER BY SIZE */}
            <div className="mb-10">
              <h1 className="text-black/80 text-2xl mb-4">Filtrer par taille</h1>

              <div className="flex flex-wrap gap-5 cursor-pointer">
                {sizes?.map(item => (
                  <div
                    onClick={() => handleAddFilter({
                      id: item.id,
                      type: 'sizes',
                      field: 'size',
                      value: item?.attributes?.size
                    })}
                    className="w-[40px] h-[40px] flex items-center justify-center border-2 border-black ">
                    <p>{item?.attributes?.size} </p>
                  </div>
                ))}
              </div>
            </div>


            {/* FILTER BY COLOR */}
            <div className="mb-10">
              <h1 className="text-black/80 text-2xl mb-4">Filtrer par couleur</h1>

              <div className="flex flex-wrap gap-2">
                {colors?.map(item => (
                  <div
                    style={{ background: item?.attributes?.color }}
                    onClick={() => handleAddFilter({
                      id: item.id,
                      type: 'colors',
                      field: 'color',
                      value: item?.attributes?.color
                    })}
                    className={`w-[30px] h-[30px] flex items-center justify-center border border-black rounded-full`} >
                  </div>
                ))}
              </div>
            </div>


            {/* FILTER BY CATEGORY */}

            <div className="mb-10">
              <h1 className="text-black/80 text-2xl mb-4">Filtrer par sous categorie</h1>

              <div className="flex flex-wrap gap-5 cursor-pointer">
                {subCategories?.map(item => (
                  <div
                  onClick={() => handleAddFilter({
                    id: item.id,
                    type: 'sub_categories',
                    field: 'subCategory',
                    value: item?.attributes?.subCategory
                  })}
                  className="flex items-center justify-center bg-black/10 rounded-md py-2 px-4">
                    <p>{item?.attributes?.subCategory} </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-black/80 text-2xl mb-4">Filter By Price</h1>
              <div className="">
                <span>0</span>
                <input type="range" max={1000} onChange={handleChangeMaxPrice} />
                <span>{maxPrice} </span>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-black/80 text-2xl mb-4">Sort By</h1>
              <div className="">
                <input type="radio" name="price" id="lowPrice" onChange={() => setSort('asc')} />
                <label htmlFor="lowPrice" className="ml-2">Price( Lower first)</label>
              </div>

              <div className="">
                <input type="radio" name="price" id="highestPrice" onChange={() => setSort('desc')} />
                <label htmlFor="highestPrice" className="ml-2">Price( Highest first)</label>
              </div>

              <button
                onClick={updateFilter}
                className="h-[40px] text-[16px] text-white mt-10 bg-primaryColor hover:bg-primaryColorActif  px-4">
                Appliquer
              </button>
            </div>

          </motion.div>
        }


        {/* PRODUCT CATEGORY */}
        <div className="lg:w-[75%] w-full p-10">
          <div className="w-full h-[300px] mb-20" style={{
            backgroundImage: `url(${import.meta.env.VITE_API_UPLOAD + categorie?.attributes?.img2?.data?.attributes?.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom'

          }}>
            {/* <img src={import.meta.env.VITE_API_UPLOAD + categorie?.attributes?.img2?.data?.attributes?.url} className="w-full h-full object-cover" alt="" /> */}

            {/* <img src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600" */}
            {/* className="w-full h-full object-cover" alt="" /> */}
          </div>
          {
            !showFilter &&
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-5 py-2 px-4 bg-black/10 hover:bg-black/20  cursor-pointer">
              <LuListFilter /> Filtrer
            </button>
          }

          <div className="flex flex-wrap gap-5 cursor-pointer mt-5">
            {customFilters?.map(item => (
              <div className="flex items-center justify-center gap-3 bg-black/10 rounded-md py-2 px-2">
                <p>{item?.value} </p>

                <AiFillCloseCircle size={23} className='text-gray-300 hover:text-gray-400'
                  onClick={() => handleDeleteFilter(item.id)} />
              </div>

            ))}
          </div>
          <List catId={catId} subCat={filters} maxPrice={maxPrice} sort={sort} />

        </div>
      </div>
    </div>
  )
}
