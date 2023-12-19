import { useContext } from 'react';
import Navbar from '../../components/Navigation/Navbar'
import NavbarFixed from '../../components/Navigation/NavbarFixed'

import Banner from "./Banner";
import Category from "./Category";
import { UserContext } from '@/context/UserContext';
import { UserContextType } from '@/Layout';
import RecentlyViews from '@/components/RecentlyViews';
import MoreLikeProducts from './MoreLikeProducts';
import FeatureProduct from './FeatureProduct';

export default function Home() {
  const {user}: UserContextType = useContext(UserContext)
  return (
    <div>
      <NavbarFixed />
      <Navbar />
      <div className='"'>
        <Banner />
        <FeatureProduct/>
        <Category />
        <MoreLikeProducts />

        {/* <FeatureProducts type='tending' /> */}
        {user && <RecentlyViews/>}
      </div>
    </div>
  )
}
