import { useState, useEffect, useContext } from "react";
import Card from "../components/Card";
import { motion } from 'framer-motion'
import { useLocation, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import List from "../components/List";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuListFilter } from "react-icons/lu";

import { GlobalContext } from "../context/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetFilter } from "../redux/filterSlice";
import { addSelectedFilter, deleteSelectedilter, resetSelectedFilter } from "../redux/SelectedFilterSlice";
import { addCustomeFilter, deletCustomeFilter, resetCustomeFilter } from "../redux/CustomeFilterSlice";
import { colorCode } from "../helpers/colorsCode";
import { Button } from "@/components/ui/button";
import ProductLoad from "@/components/ProductLoad";

import Navbar from '@/components/Navbar'
import NavbarFixed from '@/components/NavbarFixed'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Products() {

  const catId = parseInt(useParams().id)
  const [sort, setSort] = useState('desc')
  const filters = useSelector(state => state.filter)
  const selectedFilter = useSelector(state => state.selectedFilter)
  const customFilters = useSelector(state => state.customFilters)

  // const [isMobile, setIsMobile] = useState(false)

  // const [showClosefilterBtn, setShowClosefilterBtn] = useState(false)

  const { data: categorie, isLoading: isLoadingCat, error: catError } = useFetch(`/categories/${catId}?populate=*&`)
  const { data: sizes, isLoading: isSizeLoading, error: sizeError } = useFetch(`/sizes`)
  const { data: subCategories, isLoading: isSubCategoriesLoading, error: subCategoriesError } = useFetch(`/sub-categories`)
  const { data: colors, isLoading: isColorsLoading, error: colorsError } = useFetch(`/colors`)

  const dispatch = useDispatch()

  // const { showFilter, setShowFilter } = useContext(GlobalContext)


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
    // if (isMobile) setShowFilter(false)
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])


  // useEffect(() => {
  //   window.addEventListener('resize', () => {
  //     const lgScreen = window.matchMedia("(max-width : 1024px)").matches
  //     if (lgScreen) {
  //       setShowFilter(false)
  //       setShowClosefilterBtn(true)
  //       setIsMobile(true)
  //     } else {
  //       setShowFilter(true)
  //       setShowClosefilterBtn(false)
  //       setIsMobile(false)
  //     }
  //   })
  // })


  // useEffect(() => {
  //   const lgScreen = window.matchMedia("(max-width : 1024px)").matches
  //   if (lgScreen) {
  //     setShowFilter(false)
  //   }

  // }, [])


  // useEffect(() => {
  //   dispatch(resetFilter())
  //   dispatch(resetCustomeFilter())
  //   dispatch(resetSelectedFilter())

  // }, [])

  if (isLoadingCat || isColorsLoading || isSizeLoading || isSubCategoriesLoading) {
    return <div className='flex justify-center items-center h-[500px] mt[100px] '>
      <ProductLoad />
    </div>
  }

  return (
    <>
      <NavbarFixed />
      <Navbar />
      <div className="w-full globalWidth mt-20  ">
        <div className="w-full flex gap-10 lg:px-0 px-5">
          {/* SIDEBAR CATEGORY */}

          <div className="h-full lg:sticky lg:block hidden  pt-5 translate-x-[0] top-[100px]
               left-5 px-10 z-20 w-[500px] bg-white">


            {/* FILTRER */}

            <div className="mb-10">
              <h1 className="text-primaryColor font-bold">Filtrer par</h1>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Couleurs</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="flex flex-wrap gap-2 bg-white cursor-pointer">
                      {colors?.map((item, index) => (
                        <div
                          key={item.id}
                          style={{
                            opacity: selectedFilter.includes(item?.attributes?.color) && '1'
                          }}
                          onClick={() => handleAddFilter({
                            id: item.id,
                            type: 'colors',
                            field: 'color',
                            value: item?.attributes?.color
                          })}
                          className="w-fit flex items-center gap-2 border p-2  opacity-50 hover:opacity-100"
                        >
                          <div
                            style={{
                              background: colorCode[item?.attributes?.color],
                            }}
                            className={`w-[20px] h-[20px] flex items-center justify-center border 
                            border-black/30 rounded-full`} >
                          </div>
                          <p> {item?.attributes?.color} </p>

                        </div>

                      ))}
                    </div>
                  </AccordionContent>

                </AccordionItem>
                {
                  categorie?.attributes?.title !== 'sacs & accessoires' &&
                  <>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Tailles</AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-10">

                          <div className="flex flex-wrap gap-5 cursor-pointer">
                            {sizes?.map(item => (
                              <div
                                key={item.id}
                                style={{
                                  background: selectedFilter.includes(item?.attributes?.size) && '#001355',
                                  color: selectedFilter.includes(item?.attributes?.size) && '#fff'

                                }}
                                onClick={() => handleAddFilter({
                                  id: item.id,
                                  type: 'sizes',
                                  field: 'size',
                                  value: item?.attributes?.size
                                })}
                                className="w-[35px] h-[35px] flex items-center justify-center border hover:bg-primaryColor hover:text-white border-black/10 ">
                                {item?.attributes?.size}
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>Sous catégories</AccordionTrigger>
                      <AccordionContent>
                        <div className="mb-10">
                          <div className="flex flex-wrap gap-5 cursor-pointer">
                            {subCategories?.map(item => (
                              <div
                                key={item.id}
                                onClick={() => handleAddFilter({
                                  id: item.id,
                                  type: 'sub_categories',
                                  field: 'subCategory',
                                  value: item?.attributes?.subCategory
                                })}
                                className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-black/75 text-[14px] py-2 px-4">
                                {item?.attributes?.subCategory}
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                }
              </Accordion>
            </div>

            {/* TIRER */}
            <h1 className="text-primaryColor font-bold mb-5">Tirer par</h1>

            <div className="mb-10">
              <div className="">
                <input type="radio" name="price" id="lowPrice" onChange={() => setSort('asc')} />
                <label htmlFor="lowPrice" className="ml-2">Prix ​​(inférieur d'abord)</label>
              </div>

              <div className="">
                <input type="radio" name="price" id="highestPrice" onChange={() => setSort('desc')} />
                <label htmlFor="highestPrice" className="ml-2">Prix ​​(superieur d'abord)</label>
              </div>

              <Button
                onClick={updateFilter}
                className='bg-primaryColor/95 hover:bg-primaryColor mt-5'>
                Appliquer le filtre
              </Button>
            </div>

          </div>



          {/* PRODUCT CATEGORY */}
          <div className="lg:w-[100%] w-full ">

            <h1
              className="primaryTitle text-center  text-black font-bold uppercase">
              {categorie?.attributes?.title}
              {categorie?.attributes?.title && 'S'}
            </h1>
            {/* SIDE BAR MOBILE */}

            <Sheet>
              <SheetTrigger asChild>
                <button
                  // onClick={() => setShowFilter(true)}
                  className="lg:hidden flex items-center gap-2 py-2 px-4 bg-white hover:bg-white shadow-md  cursor-pointer">
                  <LuListFilter /> Filtrer
                </button>
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetHeader>
                  <SheetTitle>Filtre</SheetTitle>
                </SheetHeader>
                <div className='mt-10'>
                  <h1 className="text-primaryColor font-bold">Filtrer par</h1>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Couleurs</AccordionTrigger>
                      <AccordionContent>
                        <div
                          className="flex flex-wrap gap-2 bg-white cursor-pointer">
                          {colors?.map((item, index) => (
                            <div
                              key={item.id}
                              style={{
                                opacity: selectedFilter.includes(item?.attributes?.color) && '1'
                              }}
                              onClick={() => handleAddFilter({
                                id: item.id,
                                type: 'colors',
                                field: 'color',
                                value: item?.attributes?.color
                              })}
                              className="w-fit flex items-center gap-2 border p-2  opacity-50 hover:opacity-100"
                            >
                              <div
                                style={{
                                  background: colorCode[item?.attributes?.color],
                                }}
                                className={`w-[20px] h-[20px] flex items-center justify-center border 
                                   border-black/30 rounded-full`} >
                              </div>
                              <p> {item?.attributes?.color} </p>
                            </div>

                          ))}
                        </div>
                      </AccordionContent>

                    </AccordionItem>
                    {
                      categorie?.attributes?.title !== 'sacs & accessoires' &&
                      <>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>Tailles</AccordionTrigger>
                          <AccordionContent>
                            <div className="mb-10">

                              <div className="flex flex-wrap gap-5 cursor-pointer">
                                {sizes?.map(item => (
                                  <div
                                    key={item.id}
                                    style={{
                                      background: selectedFilter.includes(item?.attributes?.size) && '#001355',
                                      color: selectedFilter.includes(item?.attributes?.size) && '#fff'

                                    }}
                                    onClick={() => handleAddFilter({
                                      id: item.id,
                                      type: 'sizes',
                                      field: 'size',
                                      value: item?.attributes?.size
                                    })}
                                    className="w-[35px] h-[35px] flex items-center justify-center border hover:bg-primaryColor hover:text-white border-black/10 ">
                                    {item?.attributes?.size}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3">
                          <AccordionTrigger>Sous catégories</AccordionTrigger>
                          <AccordionContent>
                            <div className="mb-10">
                              <div className="flex flex-wrap gap-5 cursor-pointer">
                                {subCategories?.map(item => (
                                  <div
                                    key={item.id}
                                    onClick={() => handleAddFilter({
                                      id: item.id,
                                      type: 'sub_categories',
                                      field: 'subCategory',
                                      value: item?.attributes?.subCategory
                                    })}
                                    className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-black/75 text-[14px] py-2 px-4">
                                    {item?.attributes?.subCategory}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    }
                  </Accordion>

                  <h1 className="text-primaryColor font-bold my-5">Tirer par</h1>

                  <div className="mb-10">
                    <div className="">
                      <input type="radio" name="price" id="lowPrice" onChange={() => setSort('asc')} />
                      <label htmlFor="lowPrice" className="ml-2">Prix ​​(inférieur d'abord)</label>
                    </div>

                    <div className="">
                      <input type="radio" name="price" id="highestPrice" onChange={() => setSort('desc')} />
                      <label htmlFor="highestPrice" className="ml-2">Prix ​​(superieur d'abord)</label>
                    </div>

                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button onClick={updateFilter}
                      className="bg-primaryColor/95 hover:bg-primaryColor">Appliquer le filtre</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            {customFilters.length !== 0 &&
              <div className="flex flex-wrap gap-5 cursor-pointer mt-10">

                {customFilters?.map((item, index) => (
                  <div key={index} className="flex items-center justify-center gap-3 bg-white text-black/90 text-[15px] py-2 px-4">
                    <div className="flex items-center gap-3">
                      {colorCode[item?.value] &&
                        <p style={{
                          background: colorCode[item?.value],
                        }}
                          className="w-[10px] h-[10px] rounded-full border "
                        >
                        </p>
                      }
                      <p className="capitalize">{item?.value} </p>
                    </div>
                    <AiFillCloseCircle size={23} className='text-gray-300 hover:text-gray-400'
                      onClick={() => handleDeleteFilter(item.id, item.value)} />
                  </div>
                ))}

                <button
                  onClick={handleResetFilter}
                  className="text-sm text-red-600 hover:underline">Effacer les filtres</button>

              </div>
            }

            <List catId={catId} subCat={filters} sort={sort} />

          </div>
        </div>
      </div >
    </>

  )
}
