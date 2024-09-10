import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import PopularProductList from "./_components/PopularProductList";
import Image from "next/image";
import Footer from "./_components/Footer";

export default async function Home() {

  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();

  console.log('this is page page')

  return (
    <div className="pt-5 pb-2 px-2 sm:px-5 md:px-16">
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <PopularProductList productList={productList} />
      <div className="relative w-full flex justify-evenly items-center py-4 my-4 rounded-md bg-green-700">
        <Image src='/images/delivery.png' width={350} height={150} alt='banner' className="w-auto h-auto px-2 md:pl-4"/>
        <p className=' absolute md:relative bottom-0 md:bottom-auto p-2 text-2xl sm:text-5xl text-center font-bold text-slate-200'>Delivery in 24 Hours</p>
      </div>
      <Footer/>
    </div>
  );
}