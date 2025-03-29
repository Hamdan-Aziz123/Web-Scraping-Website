import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UsedScrap = () => {
  const [productsData, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products/getUsedItems');
        const data = await response.json();
        console.log("hello data in products", data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const totalPages = Math.ceil(productsData.length / productsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
    <div style={{
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '100%',
        backgroundImage: "-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0.4))), url(https://thumbs.dreamstime.com/b/pile-old-televisions-e-waste-dump-barren-landscape-littered-broken-electronics-symbolizing-environmental-impact-336885743.jpg)",          
        backgroundSize: 'cover',
        // fontSize: '50px',
        color: 'white',
        fontFamily: 'Poppins,Arial',
        
        
    }} >
        <div style={{
            paddingBottom: '200px',
            textAlign: 'center',
        }}>
        <h1 style={{
            fontSize: '50px',
            fontWeight: '700',
            
        }}>Used Items</h1>
        
            </div>
    
    </div>
    <div className="container my-5">
      
      <div className="row">
        {currentProducts.map((product) => (
          <div className="col-md-6 col-lg-4 mb-4" key={product.ProductId}>
            <div className="card h-100 shadow" style={{ minHeight: "350px" }}>
              <img
                src={product.ImageUrl}
                className="card-img-top"
                alt={product.Name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: "black" }}>{product.Name}</h5>
                <p className="card-text" style={{ color: "grey" }}>AED {product.PricePerKg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {paginationButtons.map((number) => (
            <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
              <button
                className="page-link"
                onClick={() => paginate(number)}
                style={{ cursor: "pointer" }}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
          </>
  );
};

export default UsedScrap;
