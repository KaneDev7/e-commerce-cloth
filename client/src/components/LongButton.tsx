import { BiCartAdd } from 'react-icons/bi'

type TyoeProps = {
    isHaveIcon? : boolean,
    text : string
}
export default function LongButton({ isHaveIcon, text }: TyoeProps) {
    return (
        <button className=' w-fit flex justify-center items-center gap-4 py-2 px-10 bg-primaryColor hover:bg-primaryColorActif '>
            {isHaveIcon &&
                <BiCartAdd color='white' size={25} />
            }
            <span className='text-white ml-2 text-sm'> {text } </span>

        </button>
    )
}
