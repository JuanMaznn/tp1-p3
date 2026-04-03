const fs = require("fs");
console.log("iniciando busqueda...");
const url = "https://thronesapi.com/api/v2/Characters";

async function buscarTodosPersonajes() {
  const resp = await fetch(url);
  if (!resp.ok) {
    console.log(`Error: ${resp.status}`);
  }
  const data = await resp.json();
  fs.appendFileSync("./listaPersonajes.json", JSON.stringify(data, null, 2));
  console.log("Los personajes son:");
  console.log(fs.readFileSync("./listaPersonajes.json", "utf-8"));
}

//buscarTodosPersonajes();

async function buscarPersonaje(id) {
  const resp = await fetch(`${url}/${id}`);
  if (!resp.ok) {
    console.log(`Error: ${resp.status}`);
  }
  const data = await resp.json();
  console.log(`El personaje con id ${id} es:`);
  console.log(data);
}

//buscarPersonaje(1);

const nuevoPersonaje = {
  firstName: "",
  lastName: "",
  fullName: "",
  title: "",
  family: "",
  image: "",
  imageUrl: "",
};

async function agregarPersonaje() {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoPersonaje),
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log("Personaje agregado:", data);
  } else {
    console.log(`Error: ${resp.status}, el servidor no permite POST.`);
  }
}

agregarPersonaje();
