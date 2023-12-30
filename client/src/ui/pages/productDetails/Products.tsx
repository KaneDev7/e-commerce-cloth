import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../infrastructure/hooks/useFetch";
import List from "../../components/List";
import { AiFillCloseCircle } from "react-icons/ai";
import { LuListFilter } from "react-icons/lu";

import { useDispatch, useSelector } from "react-redux";
import { addFilter, resetFilter } from "../../../domain/use-case/products/filterSlice";
import { addSelectedFilter, deleteSelectedilter, resetSelectedFilter } from "../../../domain/use-case/products/SelectedFilterSlice";
import { addCustomeFilter, deletCustomeFilter, resetCustomeFilter } from "../../../domain/use-case/products/CustomeFilterSlice";
import { colorCode } from "../../../helpers/colorsCode";
import { Button } from "@/ui/components/ui/button";
import ProductLoad from "@/ui/components/ProductLoad";

import Navbar from '@/ui/components/Navigation/Navbar'
import NavbarFixed from '@/ui/components/Navigation/NavbarFixed'

import {
  Accordion,
} from "@/ui/components/ui/accordion"


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/components/ui/sheet"

import RecentlyViews from "@/ui/components/RecentlyViews";
import { UserContext } from "@/ui/context/UserContext";
import { UserContextType } from "@/Layout";
import FilterItem from "@/ui/components/FilterItem";

export default function Products() {

  const catId = parseInt(useParams().id)
  const [sort, setSort] = useState('desc')
  const filters = useSelector(state => state.filter)
  const customFilters = useSelector(state => state.customFilters)
  const { user }: UserContextType = useContext(UserContext)

  const { data: categorie, isLoading: isLoadingCat, error: catError } = useFetch(`/categories/${catId}?populate=*&`)
  const { data: sizes, isLoading: isSizeLoading, error: sizeError } = useFetch(`/sizes`)
  const { data: subCategories, isLoading: isSubCategoriesLoading, error: subCategoriesError } = useFetch(`/sub-categories`)
  const { data: colors, isLoading: isColorsLoading, error: colorsError } = useFetch(`/colors`)

  const dispatch = useDispatch()

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
  }

  useEffect(() => {
    window.scroll(0, 0)
  }, [])


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
                <FilterItem
                  title='Couleurs'
                  handleAddFilter={handleAddFilter}
                  filterType={{
                    type: 'colors',
                    field: 'color',
                  }}
                  filterData={colors}
                />

                {
                  categorie?.attributes?.title !== 'sacs & accessoires' &&
                  <>
                    <FilterItem
                      title='Tailles'
                      handleAddFilter={handleAddFilter}
                      filterType={{
                        type: 'sizes',
                        field: 'size'
                      }}
                      filterData={sizes}
                    />
                    <FilterItem
                      title='Saisons'
                      handleAddFilter={handleAddFilter}
                      filterType={{
                        type: 'sub_categories',
                        field: 'subCategory'
                      }}
                      filterData={subCategories}
                    />
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
                    <FilterItem
                      title='Couleurs'
                      handleAddFilter={handleAddFilter}
                      filterType={{
                        type: 'colors',
                        field: 'color',
                      }}
                      filterData={colors}
                    />

                    {
                      categorie?.attributes?.title !== 'sacs & accessoires' &&
                      <>
                        <FilterItem
                          title='Tailles'
                          handleAddFilter={handleAddFilter}
                          filterType={{
                            type: 'sizes',
                            field: 'size'
                          }}
                          filterData={sizes}
                        />
                        <FilterItem
                          title='Saisons'
                          handleAddFilter={handleAddFilter}
                          filterType={{
                            type: 'sub_categories',
                            field: 'subCategory'
                          }}
                          filterData={subCategories}
                        />
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
        {user && <RecentlyViews />}

      </div >
    </>

  )
}
