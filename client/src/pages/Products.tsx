import { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import { motion } from 'framer-motion'
import {useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import List from "../components/List";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuListFilter } from "react-icons/lu";

import { GlobalContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetFilter } from "../redux/filterSlice";
import { addSelectedFilter, deleteSelectedilter, resetSelectedFilter } from "../redux/SelectedFilterSlice";
import { addCustomeFilter, deletCustomeFilter, resetCustomeFilter } from "../redux/CustomeFilterSlice";
//import { products } from "./home/container/FeatureProducts";

export default function Products() {

  const catId = parseInt(useParams().id)
  const [sort, setSort] = useState('desc')
  const filters = useSelector(state => state.filter)
  const selectedFilter = useSelector(state => state.selectedFilter)
  const customFilters = useSelector(state => state.customFilters)


  // const [customFilters, setcustomFilters] = useState<string[]>([])
  const [colorSelected, setColorSelected] = useState<string[]>([])
  const [sizeSelected, setSizeSelected] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const [showClosefilterBtn, setShowClosefilterBtn] = useState(false)

  const { data: categorie, isLoading: isLoadingCat, error: catError } = useFetch(`/categories/${catId}?populate=*&`)
  const { data: sizes, isLoading: isSizeLoading, error: sizeError } = useFetch(`/sizes`)
  const { data: subCategories, isLoading: isSubCategoriesLoading, error: subCategoriesError } = useFetch(`/sub-categories`)
  const { data: colors, isLoading: isColorsLoading, error: colorsError } = useFetch(`/colors`)

  const dispatch = useDispatch()

  const { showFilter, setShowFilter } = useContext(GlobalContext)


  const handleAddFilter = (option) => {
    const isFilterExist = customFilters.some(item => item.value === option.value)
    if (!isFilterExist) {
      dispatch(addCustomeFilter(option))
      dispatch(addSelectedFilter(option.value))
    }
  }

  const handleDeleteFilter = (id, value) => {
    dispatch(deletCustomeFilter(id))
    dispatch(deleteSelectedilter(value))

  }

  const handleResetFilter = () => {
    dispatch(resetFilter())
    dispatch(resetCustomeFilter())
    dispatch(resetSelectedFilter())
  }


  const updateFilter = () => {
    const newFilter = customFilters.map(item => `&[filters][${item.type}][${item.field}]=${item.value}`)
    dispatch(addFilter(newFilter))
    if (isMobile) setShowFilter(false)
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
        setIsMobile(true)
      } else {
        setShowFilter(true)
        setShowClosefilterBtn(false)
        setIsMobile(false)
      }
    })
  })

  useEffect(() => {
    dispatch(resetFilter())
    dispatch(resetCustomeFilter())
    dispatch(resetSelectedFilter())
  }, [])

  return (
    <div className="w-full globalWidth mt-20  ">
      <div className="w-full flex gap-10 ">
        {/* SIDEBAR CATEGORY */}
        {
          showFilter &&
          <motion.div initial={{ x: -500, opacity: .2 }} animate={{ x: 0, opacity: 1 }}
            className="h-full lg:sticky pt-5 lg:translate-x-[0] translate-x-[-500px] fixed top-[0] 
            left-0 lg:left-5 pr-10 pl-10 lg:pr-10 lg:pl-0 z-20  w-[500px] bg-white border-r">
            {
              showClosefilterBtn &&
              <AiFillCloseCircle size={25} className='absolute right-5 top-10 text-primaryColor hover:text-primaryColorActif'
                onClick={() => setShowFilter(false)} />
            }


            {/* FILTER BY SIZE */}
            {
              categorie?.attributes?.title !== 'sacs & accessoires' &&
              <div className="mb-10">
                <h1 className="text-black/80 mb-4 filterTitle">Filtrer par taille</h1>

                <div className="flex flex-wrap gap-5 cursor-pointer">
                  {sizes?.map(item => (
                    <div
                      style={{
                        background: selectedFilter.includes(item?.attributes?.size) && '#3378f0',
                        color: selectedFilter.includes(item?.attributes?.size) && '#fff'

                      }}
                      onClick={() => handleAddFilter({
                        id: item.id,
                        type: 'sizes',
                        field: 'size',
                        value: item?.attributes?.size
                      })}
                      className="w-[40px] h-[40px] flex items-center justify-center border hover:bg-primaryColor hover:text-white border-black/10 ">
                      {item?.attributes?.size}
                    </div>
                  ))}
                </div>
              </div>
            }



            {/* FILTER BY COLOR */}
            <div className="mb-10">
              <h1 className="text-black/80 mb-4 filterTitle">Filtrer par couleur</h1>

              <div className="flex flex-wrap gap-2">
                {colors?.map(item => (
                  <div
                    style={{
                      background: item?.attributes?.color,
                      opacity: selectedFilter.includes(item?.attributes?.color) && '1'

                    }}
                    onClick={() => handleAddFilter({
                      id: item.id,
                      type: 'colors',
                      field: 'color',
                      value: item?.attributes?.color
                    })}
                    className={`w-[25px] h-[25px] flex items-center justify-center border opacity-30 hover:opacity-100 border-black/30 rounded-full`} >
                  </div>
                ))}
              </div>
            </div>


            {/* FILTER BY SUB CATEGORY */}

            {
              categorie?.attributes?.title !== 'sacs & accessoires' &&

              <div className="mb-10">
                <h1 className="text-black/80 mb-4 filterTitle">Filtrer par sous categorie</h1>

                <div className="flex flex-wrap gap-5 cursor-pointer">
                  {subCategories?.map(item => (
                    <div
                      onClick={() => handleAddFilter({
                        id: item.id,
                        type: 'sub_categories',
                        field: 'subCategory',
                        value: item?.attributes?.subCategory
                      })}
                      className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-black/75 text-[15px] py-2 px-4">
                      {item?.attributes?.subCategory}
                    </div>
                  ))}
                </div>
              </div>

            }



            <div className="mb-10">
              <h1 className="text-black/80  mb-4 filterTitle">Trier par</h1>
              <div className="">
                <input type="radio" name="price" id="lowPrice" onChange={() => setSort('asc')} />
                <label htmlFor="lowPrice" className="ml-2">Prix ​​(inférieur d'abord)</label>
              </div>

              <div className="">
                <input type="radio" name="price" id="highestPrice" onChange={() => setSort('desc')} />
                <label htmlFor="highestPrice" className="ml-2">Prix ​​(superieur d'abord)</label>
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
        <div className="lg:w-[100%] w-full ">
        
          <h1 className="text-4xl text-center mt-10 text-black font-bold uppercase">{categorie?.attributes?.title}S </h1>
          {
            !showFilter &&
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-5 py-2 px-4 bg-gray-100 hover:bg-gray-200  cursor-pointer">
              <LuListFilter /> Filtrer
            </button>
          }

          <div className="flex flex-wrap gap-5 cursor-pointer mt-20">
            {customFilters?.map(item => (
              <div className="flex items-center justify-center gap-3 bg-gray-100 text-black/75 text-[15px] py-2 px-4">
                <p>{item?.value} </p>

                <AiFillCloseCircle size={23} className='text-gray-300 hover:text-gray-400'
                  onClick={() => handleDeleteFilter(item.id, item.value)} />
              </div>
            ))}
            {customFilters.length !== 0 &&
              <button
                onClick={handleResetFilter}
                className="text-sm text-red-600 hover:underline">Effacer les filtres</button>

            }
          </div>
          <List catId={catId} subCat={filters} sort={sort} />

        </div>
      </div>
    </div>
  )
}
