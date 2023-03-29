import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from './navbar'
import "../menu.css"; // Importar el archivo de estilos CSS

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

function MenuList() {
  const [menus, setMenus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchMenus = async () => {
      const response = await axios.get(
        `https://tarea-1.2023-1.tallerdeintegracion.cl/trays?sort=name&order=asc&page=${currentPage}&size=${pageSize}`
      );
      setMenus(response.data.items);
      setTotalItems(response.data.totalItems);
    };
    fetchMenus();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Navbar />
      <div className="menu">
        {menus &&
          menus.map((menu) => (
            <div key={menu.id} className="menu-item">
              <img src={menu.image} alt={menu.name} />
              <div className="menu-item-details">
                <h3>{menu.name}</h3>
                <p>{menu.description}</p>
                <div className="menu-item-price">{menu.price}</div>
              </div>
            </div>
          ))}
      </div>
      <Pagination
        itemsPerPage={pageSize}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default MenuList;
