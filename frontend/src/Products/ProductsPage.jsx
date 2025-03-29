import React, { useEffect ,useState} from 'react';
import ProductsSlider from '../components/ProductsSlider/ProductsSlider';

const ProductsPage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await fetch('http://localhost:4000/api/products/getProducts');
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


  return (
    <div>
      <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70vh',
                width: '100%',
                backgroundImage: "-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.8)), to(rgba(0, 0, 0, 0.5))), url(productspageTop.jpg)",          
                backgroundSize: 'cover',
                color: 'white',
                fontFamily: 'Poppins,Arial',
                

            }} >
                <div style={{
                    paddingBottom: '130px',
                    textAlign: 'center',
                }}>
                <h1 style={{
                    fontSize: '50px',
                    fontWeight: '700',
                    
                }}>OUR PRODUCTS</h1>
                
                    </div>
            
            </div>
      <div>
        <h2 style={{
          textAlign: 'center',
          fontSize: '40px',
          fontWeight: '600',
          fontFamily: 'Poppins,Arial',
          padding: '20px',
          color: 'black'
        }}>Metals</h2>
         <ProductsSlider products={ProductsCategory('Metals')}/>
      </div>
      <div>
        <h2 style={{
          textAlign: 'center',
          fontSize: '40px',
          fontWeight: '600',
          fontFamily: 'Poppins,Arial',
          padding: '20px',
          color: 'black'
        }}>Plastics</h2>
          <ProductsSlider products={ProductsCategory('plastics')}/>
      </div>
    </div>
  );
};

export default ProductsPage;