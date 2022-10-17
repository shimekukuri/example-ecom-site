import Layout from "../components/Layout";
import data from "../utils/data"
import ProductItem from "../components/Productitem";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product, index) => <ProductItem product={product} key={product.slug}/>)}
      </div>
    </Layout>
  );
}
