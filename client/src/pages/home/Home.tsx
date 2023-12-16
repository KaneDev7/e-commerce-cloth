import { useContext } from 'react';
import Navbar from '../../components/Navbar'
import NavbarFixed from '../../components/NavbarFixed'

import Banner from "./container/Banner";
import Category from "./container/Category";
import FeatureProducts from "./container/FeatureProducts";
import { UserContext } from '@/context/UserContext';
import { UserContextType } from '@/Layout';
import RecentlyViews from '@/components/RecentlyViews';

export default function Home() {
  const {user}: UserContextType = useContext(UserContext)
  return (
    <div>
      <NavbarFixed />
      <Navbar />
      <div className='"'>
        <Banner />
        <FeatureProducts type='featured' />
        <Category />
        <FeatureProducts type='tending' />
        {user && <RecentlyViews/>}
      </div>
    </div>
  )
}
