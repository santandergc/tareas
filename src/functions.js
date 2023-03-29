import axios from 'axios'

// const allMenus = async (state) => {
//     const peticion = await axios.get("https://tarea-1.2023-1.tallerdeintegracion.cl/trays")
//     state(peticion.data.items)
// }

// export {allMenus}

const allMenus = async (page, size, state) => {
    const url = `https://tarea-1.2023-1.tallerdeintegracion.cl/trays?sort=name&order=asc&page=${page}&size=${size}`;
    const response = await axios.get(url);
    state(response.data);
  }

  export {allMenus}