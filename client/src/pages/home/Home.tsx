import Navbar from '../../components/Navbar'
import NavbarFixed from '../../components/NavbarFixed'

import Banner from "./container/Banner";
import Category from "./container/Category";
import FeatureProducts from "./container/FeatureProducts";

export default function Home() {
  return (
    <div>
      <NavbarFixed />
      <Navbar />
      <div className='px-5'>
        <Banner />
        <FeatureProducts type='featured' />
        <Category />
        <FeatureProducts type='tending' />
      </div>
    </div>
  )
}
