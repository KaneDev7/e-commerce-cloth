import Banner from "./container/Banner";
import Category from "./container/Category";
import FeatureProducts from "./container/FeatureProducts";

export default function Home() {
  return (
    <div>
      <Banner/>
      <FeatureProducts type='featured' />
      <Category/>
      <FeatureProducts type='tending' />
    </div>
  )
}
