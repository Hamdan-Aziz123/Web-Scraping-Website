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
        "http://localhost:4000/api/checkout/checkout",
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
    <Container
      className="mt-5 my-5"
      style={{ margin: "0 auto", maxWidth: "1200px" }}
    >
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

      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Body>
              <h3 className="mb-4">Billing Details</h3>
              <Form onSubmit={handleSubmit}>
                <Row>
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
                </Row>
                <Form.Group controlId="formAddress" className="mt-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formCity" className="mt-3">
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
                    <Form.Group controlId="formPhone" className="mt-3">
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
                </Row>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <h4 className="mt-4">Products</h4>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Product Name (e.g., Copper)"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Quantity in Tons"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button variant="primary" onClick={handleAddProduct}>
                    Add Product
                  </Button>
                </InputGroup>

                {products.length > 0 && (
                  <Table striped bordered hover className="mb-4">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity (Tons)</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>
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
                )}

                <h4 className="mt-4">Payment Methods</h4>
               
                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  name="paymentMethod"
                  id="cashOnDelivery"
                  value="cashOnDelivery"
                  checked={selectedPayment === "cashOnDelivery"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Bank Transfer"
                  name="paymentMethod"
                  id="bankTransfer"
                  value="bankTransfer"
                  checked={selectedPayment === "bankTransfer"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
                

                <div className="mt-3">
                  {selectedPayment && (
                    <Card className="p-3 mt-3">
                      <Card.Body>
                        {paymentInstructions[selectedPayment]}
                      </Card.Body>
                    </Card>
                  )}
                </div>
                <Form.Group
                  controlId="formSpecialInstructions"
                  className="mt-3"
                >
                  <Form.Label>Special Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter any special instructions for your order"
                    value={instruction}
                    onChange={(e) => setInstruction(e.target.value)}
                  />
                </Form.Group>
                <h4 className="mt-4">Important Note</h4>
                <Card className="p-3 mt-3">
                  <Card.Body>
                    Thank you for selecting your products and specifying the
                    quantities you need. Please provide your complete details
                    along with the product information.
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      Once received, our team will review the availability and
                      inform you about the total amount, along with any further
                      details.
                    </span>{" "}
                    After your confirmation, we will proceed with your order.
                  </Card.Body>
                </Card>

                <Button className="mt-4" variant="success" type="submit">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Container>
  );
};

export default CheckoutPage;
