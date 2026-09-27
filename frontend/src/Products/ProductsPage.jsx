import React, { useEffect ,useState} from 'react';
import { Link } from 'react-router-dom';
import ProductsSlider from '../components/ProductsSlider/ProductsSlider';
import { API_BASE_URL } from '../config/api';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await fetch(`${API_BASE_URL}/api/products/getProducts`);
        const data = await response.json();
        setProducts(data);

      }
      catch(error){
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const ProductsCategory = (category) => { 
    return products.filter((product) => product.Category.toLowerCase() === category.toLowerCase());
  }


  const metals = ProductsCategory('Metals');
  const plastics = ProductsCategory('plastics');

  return (
    <div className="products-page">
      <section className="page-hero page-hero--products page-hero--compact">
        <div className="container">
          <div className="page-hero__content">
            <span className="page-hero__eyebrow">Scrap Items</span>
            <h1 className="page-hero__title">OUR PRODUCTS</h1>
            <p className="page-hero__subtitle">
              Metal and plastic scrap, priced per kilogram.
            </p>
          </div>
        </div>
      </section>

      <section className="section product-category">
        <div className="container">
          <div className="product-category__header">
            <h2 className="product-category__title">Metals</h2>
            <span className="chip chip--neutral">{metals.length} items</span>
          </div>
          <ProductsSlider products={metals}/>
          <div className="product-category__footer">
            <Link to="/products/metals" className="cta-btn cta-btn--outline">
              View All Metals
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--surface product-category">
        <div className="container">
          <div className="product-category__header">
            <h2 className="product-category__title">Plastics</h2>
            <span className="chip chip--neutral">{plastics.length} items</span>
          </div>
          <ProductsSlider products={plastics}/>
          <div className="product-category__footer">
            <Link to="/products/plastics" className="cta-btn cta-btn--outline">
              View All Plastics
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;