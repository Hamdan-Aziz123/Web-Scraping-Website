import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
  Table,
  InputGroup,
} from "react-bootstrap";
import useAxiosWithRefresh from "../hooks/useAxiosRefresh";
import { API_BASE_URL } from "../config/api";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [instruction, setInstruction] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const axiosInstance = useAxiosWithRefresh();

  const paymentInstructions = {
    cashOnDelivery: "Pay with cash upon delivery.",
    bankTransfer:
      "Make your payment directly into our bank account. (Allied Bank - Hafiz Muhammad Hamdan Aziz)",
    
  };

  const handleAddProduct = () => {
    if (productName && quantity) {
      setProducts([...products, { name: productName, quantity }]);
      setProductName("");
      setQuantity("");
    } else {
      setErrorMsg("Please enter both product name and quantity.");
    }
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };


  const handleCheckout = async () => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/api/checkout/checkout`,
        {
          firstName: firstName,
          lastName: lastName,
          address: address,
          email: email,
          city: city,
          phone: phone,
          instruction: instruction,
          paymentMethod: selectedPayment,
          products: products,
        }
      );
      if (response.status === 200) {
        setSuccessMsg("Order placed successfully");
      } else {
        setErrorMsg("Order placement failed");
      }
    } catch (err) {
      if(err.response.data==="Authorization header is required")
      {
        setErrorMsg("Please login first to place an order");
      }else
        {
      setErrorMsg("Order placement failed, Please try again later");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (products.length === 0) {
      setErrorMsg("Please add at least one product to your order.");
      return;
    }
    await handleCheckout();
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setPhone("");
    setEmail("");
    setInstruction("");
    setSelectedPayment("");
    // navigate('/orderconfirmation');
  };

  return (
    <div className="checkout-page">
      <Container className="checkout-container">
        <div className="page-header">
          <span className="eyebrow">Order request</span>
          <h1 className="page-header__title">Place your order</h1>
          <p className="page-header__subtitle">
            Tell us what you need — our team confirms availability and the total
            amount before anything is processed.
          </p>
        </div>

        {errorMsg && (
          <Alert variant="danger" dismissible onClose={() => setErrorMsg("")}>
            <strong>Error!</strong> {errorMsg}
          </Alert>
        )}
        {successMsg && (
          <Alert variant="success" dismissible onClose={() => setSuccessMsg("")}>
            <strong>Success!</strong> {successMsg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            <Col lg={7}>
              <Card className="checkout-card">
                <Card.Body>
                  <h3 className="checkout-card__title">
                    <span className="checkout-card__step">1</span>
                    Billing Details
                  </h3>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="checkout-card">
                <Card.Body>
                  <h4 className="checkout-card__title">
                    <span className="checkout-card__step">2</span>
                    Products
                  </h4>
                  <InputGroup className="checkout-add-product">
                    <Form.Control
                      placeholder="Product Name (e.g., Copper)"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      aria-label="Product name"
                    />
                    <Form.Control
                      type="number"
                      placeholder="Quantity in Tons"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      aria-label="Quantity in tons"
                      className="checkout-add-product__qty"
                    />
                    <Button variant="primary" onClick={handleAddProduct}>
                      Add Product
                    </Button>
                  </InputGroup>
                  <p className="checkout-hint">
                    Add each product and its quantity, then press “Add Product”.
                  </p>
                  {/* Phones/tablets: show what was added right here (desktop shows it in "Your order") */}
                  {products.length > 0 && (
                    <ul className="checkout-added d-lg-none">
                      {products.map((product, index) => (
                        <li key={index} className="checkout-added__item">
                          <span className="checkout-added__name">{product.name}</span>
                          <span className="checkout-added__qty">{product.quantity} tons</span>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemoveProduct(index)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card.Body>
              </Card>

              <Card className="checkout-card">
                <Card.Body>
                  <h4 className="checkout-card__title">
                    <span className="checkout-card__step">3</span>
                    Payment Methods
                  </h4>
                  <div className="payment-options">
                    <Form.Check
                      type="radio"
                      label="Cash on Delivery"
                      name="paymentMethod"
                      id="cashOnDelivery"
                      value="cashOnDelivery"
                      checked={selectedPayment === "cashOnDelivery"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className={`payment-option${selectedPayment === "cashOnDelivery" ? " is-selected" : ""}`}
                    />
                    <Form.Check
                      type="radio"
                      label="Bank Transfer"
                      name="paymentMethod"
                      id="bankTransfer"
                      value="bankTransfer"
                      checked={selectedPayment === "bankTransfer"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className={`payment-option${selectedPayment === "bankTransfer" ? " is-selected" : ""}`}
                    />
                  </div>

                  {selectedPayment && (
                    <div className="payment-instructions">
                      {paymentInstructions[selectedPayment]}
                    </div>
                  )}

                  <Form.Group controlId="formSpecialInstructions" className="mt-4">
                    <Form.Label>Special Instructions</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter any special instructions for your order"
                      value={instruction}
                      onChange={(e) => setInstruction(e.target.value)}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <div className="checkout-summary">
                <Card className="checkout-card checkout-card--summary">
                  <Card.Body>
                    <div className="checkout-summary__head">
                      <h4 className="checkout-card__title mb-0">Your order</h4>
                      <span className="chip chip--neutral">
                        {products.length} {products.length === 1 ? "product" : "products"}
                      </span>
                    </div>

                    {products.length > 0 ? (
                      <div className="checkout-summary__table d-none d-lg-block">
                        <Table hover className="mb-0">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Quantity (Tons)</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((product, index) => (
                              <tr key={index}>
                                <td className="fw-semibold">{product.name}</td>
                                <td>{product.quantity}</td>
                                <td className="text-end">
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemoveProduct(index)}
                                  >
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : (
                      <div className="checkout-summary__empty">
                        No products added yet.
                      </div>
                    )}

                    <div className="checkout-note">
                      <h4 className="checkout-note__title">Important Note</h4>
                      <p className="mb-0">
                        Thank you for selecting your products and specifying the
                        quantities you need. Please provide your complete details
                        along with the product information.{" "}
                        <span className="checkout-note__highlight">
                          Once received, our team will review the availability and
                          inform you about the total amount, along with any further
                          details.
                        </span>{" "}
                        After your confirmation, we will proceed with your order.
                      </p>
                    </div>

                    <Button className="w-100 checkout-submit" variant="success" type="submit">
                      Place Order
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CheckoutPage;
