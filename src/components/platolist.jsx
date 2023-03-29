import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './navbar'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      `https://tarea-1.2023-1.tallerdeintegracion.cl/search/courses?name=${searchQuery}`
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

function PlatoList() {
  const [menus, setMenus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalItems, setTotalItems] = useState(0);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await axios.get(
        `https://tarea-1.2023-1.tallerdeintegracion.cl/courses?sort=${sort}&order=${order ? "asc" : "desc"}&page=${currentPage}&size=${pageSize}`
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
        <h1 style={{color: 'white', fontSize: '4rem'}}>BoneMui</h1>
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
        {menus &&
          menus.map((menu) => (
            <Col xs={12} sm={6} md={4} lg={3} key={menu.id}>
              <div className="card mb-4">
                <div className="card-img-top restaurant-image" style={{ width: "250px", height: "250px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={menu.img_url} alt={menu.name} style={{ width: "auto", height: "100%" }} />
                </div>
                <div className="card-body">
                  <h3 className="card-title text-center">{menu.name}</h3>
                  <p className="card-text">{menu.description}</p>
                  <div className="menu-item-price text-center">${menu.price}</div>
                  <Link to={`/platos/${menu.id}`} className="btn btn-primary btn-block mt-3">Ver detalle</Link>
                </div>
              </div>
            </Col>
          ))}
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

export default PlatoList;
