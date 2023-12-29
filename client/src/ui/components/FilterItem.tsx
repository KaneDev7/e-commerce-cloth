

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/ui/components/ui/accordion"
import { colorCode } from '@/helpers/colorsCode'
import { useSelector } from 'react-redux'


type FilterType = {
    type: string,  
    field: string, 
} 

type Options = {
    type: string,  
    field: string, 
    id: number,
    value: string
}

type Props = {
    handleAddFilter : (option : Options) => void,
    title : string,
    filterType : FilterType,
    filterData : Array<Object>
}

export default function FilterItem({ handleAddFilter, title, filterType, filterData }: Props) {
    const selectedFilter = useSelector(state => state.selectedFilter)

    return (
        <AccordionItem value={filterType.type}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                <div className="mb-10">
                    <div className={`flex flex-wrap gap-5 cursor-pointer ${filterType.type === 'colors' && 'bg-white'}`} >
                        {filterData?.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    opacity: selectedFilter.includes(item?.attributes?.color) && '1',
                                    background: selectedFilter.includes(item?.attributes?.size) && '#001355',
                                    color: selectedFilter.includes(item?.attributes?.size) && '#fff' 
                                }}
                                onClick={() => handleAddFilter({
                                    id: item.id,
                                    type: filterType.type,  
                                    field: filterType.field, 
                                    value: filterType.type === 'colors' ? item?.attributes?.color :
                                        filterType.type === 'sizes' ? item?.attributes?.size :
                                            item?.attributes?.subCategory

                                })}
                                
                                className={filterType.type === 'colors' ? 'w-fit flex items-center gap-2 border p-2  opacity-50 hover:opacity-100':
                                filterType.type === 'sizes' ? 'w-[35px] h-[35px] flex items-center justify-center border hover:bg-primaryColor hover:text-white border-black/10' :
                                "flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-black/75 text-[14px] py-2 px-4"
                            }
                            >
                                {
                                    filterType.type === 'colors' ?
                                        <>
                                            <div
                                                style={{
                                                    background: colorCode[item?.attributes?.color],
                                                }}
                                                className={`w-[20px] h-[20px] flex items-center justify-center border 
                                            border-black/30 rounded-full`} >
                                            </div>
                                            <p> {item?.attributes?.color} </p>
                                        </> :
                                        filterType.type === 'sizes' ? 
                                        item?.attributes?.size : 
                                        item?.attributes?.subCategory
                                       
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
