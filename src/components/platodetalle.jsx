import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './navbar'
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function CreaReview(props) {
  const [reviews, setReviews] = useState(props.reviews);
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `https://tarea-1.2023-1.tallerdeintegracion.cl/reviews`,
      {
        entity_id: id,
        email: email,
        password: password,
        content: content,
        rating: rating,
      }
    );
    console.log(response.data);
    // setReviews(response.data);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Row>
        <Col>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email..."
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password..."
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              value={rating}
              onChange={handleRatingChange}
              placeholder="Rating..."
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              type="text"
              value={content}
              onChange={handleContentChange}
              placeholder="Content..."
            />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Button type="submit">Crear Review</Button>
      <hr />
    </Form>
  );
}

function Review(props) {
  const [reviews, setReviews] = useState(props.reviews);
  const { id } = useParams();

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await axios.get(
        `https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${id}`
      );
      // Setear review como un arreglo de objetos de datos
      setReviews(response.data);
      console.log(response.data);
    };
    fetchMenu();
  }, [id]);

  return (
    <Container>
      {/* Agregar un chequeo de nulidad */}
      <Row className="menu">
        {reviews &&
          reviews.map((rev) => (
            <Col xs={12} md={6} lg={4} key={rev.id} className="menu-item">
              <div className="menu-item-details">
                <h3>{rev.username}</h3>
                <p>{rev.date}</p>
                <div className="menu-item-price"> ⭐ {rev.rating}</div>
                <h4>Descripción: {rev.content}</h4>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
}



function Ingredientes({ ingredients }) {
  return (
    <div className="row justify-content-center">
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="col-md-10">
          <div className="menu-item">
            <div className="menu-item-details">
              <h5>{ingredient.name}</h5>
              <img src={ingredient.img_url} />
              <p>⭐ {ingredient.quantity}</p>
              <Link
                to={`/ingredientes/${ingredient.id}`}
                className="btn btn-primary"
              >
                Ver detalle
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}



function PlatoDetalle(props) {
  const [menu, setMenu] = useState(null);
  const { id } = useParams()
  console.log(id)
  

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await axios.get(
        `https://tarea-1.2023-1.tallerdeintegracion.cl/courses/${id}`
      );
      setMenu(response.data);
      console.log(response.data);
    };
    fetchMenu();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div style={{backgroundImage: 'url("https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundSize: 'cover', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{color: 'white', fontSize: '4rem'}}>PLATO</h1>
      </div>
      <br />
      {menu && (
      <div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="menu-item">
          <img src={menu.img_url} />
          <div className="menu-item-details">
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
            <div className="menu-item-price">$ {menu.price}</div>
          </div>
        </div>
        </div>
        <Col className="text-center">
        <h1 className="text-warning">Ingredientes</h1>
        </Col>
        <Ingredientes ingredients={menu.ingredients} />
        <Container>
        <Row>
          <Col className="text-center">
            <h1 className="text-danger">Crear un Review</h1>
            <CreaReview />
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <h1 className="text-warning">Review</h1>
            <Review />
          </Col>
        </Row>
      </Container>
        </div>
        
        
      )}
    </div>
  );
}

export default PlatoDetalle;
