import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './navbar'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Form, Card } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";


import "../menu.css"; // Importar el archivo de estilos CSS

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://tarea-1.2023-1.tallerdeintegracion.cl/search/ingredients?name=${searchQuery}`
    );
    console.log(searchQuery)
    onSearch(response.data);
  };

  return (
    <Form onSubmit={handleFormSubmit} className="d-flex">
      <Form.Control
        type="text"
        placeholder="Buscar por nombre..."
        className="me-2"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <Button type="submit">Buscar</Button>
    </Form>
  );
}

function MenuSort({ sort, order, onSortChange }) {
  const handleSortClick = (sortValue, orderValue) => {
    onSortChange(sortValue, orderValue);
  };

  const handleOrderClick = (orderValue) => {
    onSortChange(sort, orderValue);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <span className="me-2">Ordenar por:</span>
      <DropdownButton title={sort === "name" ? "Nombre" : "Precio"}>
        <Dropdown.Item
          active={sort === "name"}
          onClick={() => handleSortClick("name", order)}
        >
          Nombre
        </Dropdown.Item>
        <Dropdown.Item
          active={sort === "price"}
          onClick={() => handleSortClick("price", order)}
        >
          Precio
        </Dropdown.Item>
      </DropdownButton>
      <span style={{ marginLeft: '10px' }}></span>
      <DropdownButton title={order ? "Ascendente" : "Descendente"}>
        <Dropdown.Item
          active={order === true}
          onClick={() => handleOrderClick(true)}
        >
          Ascendente
        </Dropdown.Item>
        <Dropdown.Item
          active={order === false}
          onClick={() => handleOrderClick(false)}
        >
          Descendente
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}


function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function IngredienteList() {
  const [menus, setMenus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await axios.get(
        `https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients?sort=${sort}&order=${order ? "asc" : "desc"}&page=${currentPage}&size=${pageSize}`
      );
      setMenus(response.data.items);
      setTotalItems(response.data.total);
      console.log(response.data.items)

    };
    fetchMenus();
    
  }, [currentPage, pageSize, sort, order]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortValue, orderValue) => {
    setSort(sortValue);
    setOrder(orderValue);
    setCurrentPage(1);
  };

  const handleSearch = (data) => {
    setMenus(data);
    setTotalItems(data.total);
  };


  return (
    <div>
      <Navbar />
      <div style={{backgroundImage: 'url("https://images.pexels.com/photos/1310777/pexels-photo-1310777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")', backgroundSize: 'cover', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{color: 'white', fontSize: '4rem'}}>BoneMui - INGREDIENTES</h1>
      </div>
      <br />
      <Container>
        <Row>
          <Col>
            <SearchBar onSearch={handleSearch} />
          </Col>
          <Col>
            <MenuSort sort={sort} order={order} onSortChange={handleSortChange} />
          </Col>
        </Row>
      </Container>
      <br />
      <Container>
      <Row className="d-flex justify-content-center">
        <div className="menu">
          {menus &&
            menus.map((menu) => (
              <div key={menu.id} className="menu-item">
                <img src={menu.img_url} />

                <div className="menu-item-details">
                  <h3>{menu.name}</h3>
                  <p>{menu.description}</p>
                  <div className="menu-item-price">$ {menu.price}</div>
                  <Link to={`/ingredientes/${menu.id}`} className="btn btn-primary">Ver detalle</Link>
                </div>
              </div>
            ))}
        </div>
      </Row>
    </Container>

      <Pagination
        itemsPerPage={pageSize}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default IngredienteList;
