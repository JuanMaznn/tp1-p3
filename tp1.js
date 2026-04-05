const fs = require('fs');
console.log('iniciando busqueda...');
const url = 'https://thronesapi.com/api/v2/Characters';

function persistir(personajes) {
  fs.writeFileSync(
    './listaPersonajes.json',
    JSON.stringify(personajes, null, 2),
  );
  console.log('archivo guardado');
}

// CONSIGNA 1

// a)

async function consigna_1_a() {
  async function buscarTodosPersonajes() {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        console.log(`Error: ${resp.status}`);
      }
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  const personajesGot = await buscarTodosPersonajes();
  console.log('Los personajes son:');
  console.log(personajesGot);
}

// b)
async function consigna_1_b() {
  async function buscarPersonaje(id) {
    try {
      const resp = await fetch(`${url}/${id}`);
      if (!resp.ok) {
        console.log(`Error: ${resp.status}`);
      }
      const data = await resp.json();
      console.log(`El personaje con id ${id} es:`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  await buscarPersonaje(1);
}

// c)
async function consigna_1_c() {
  async function agregarPersonaje(personaje) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaje),
      });

      if (!resp.ok) {
        throw new Error(
          `Error ${resp.status}: la API no permitió crear el personaje`,
        );
      }

      const data = await resp.json();
      console.log('Personaje agregado:', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const nuevoPersonaje = {
    firstName: '',
    lastName: '',
    fullName: '',
    title: '',
    family: '',
    image: '',
    imageUrl: '',
  };

  await agregarPersonaje(nuevoPersonaje);
}

// d)

async function consigna_1_d() {
  async function persistirConsulta() {
    try {
      async function buscarTodosPersonajes() {
        const resp = await fetch(url);
        if (!resp.ok) {
          console.log(`Error: ${resp.status}`);
        }
        const data = await resp.json();
        return data;
      }
      const personajesGOT = await buscarTodosPersonajes();
      persistir(personajesGOT);
    } catch (error) {
      console.error(error);
    }
  }
  await persistirConsulta();
}

//CONSIGNA 2

// a)

async function consigna_2_a() {
  const nuevoPersonaje2 = {
    firstName: 'Lucas',
    lastName: 'González',
    fullName: 'Lucas González',
    title: 'Guerrero del Sur',
    family: 'Casa del Plata',
    image: 'lucas.jpg',
    imageUrl: 'https://example.com/lucas.jpg',
  };
  function agregarPersonajeAlFinal() {
    try {
      const data = fs.readFileSync('./listaPersonajes.json', 'utf-8');
      const personajesGOT = JSON.parse(data);

      const ultimoPersonaje = personajesGOT[personajesGOT.length - 1];
      const ultimoId = ultimoPersonaje.id;

      nuevoPersonaje2.id = ultimoId + 1;

      personajesGOT.push(nuevoPersonaje2);

      console.log('Personaje agregado al final del archivo');
      persistir(personajesGOT);
    } catch (error) {
      console.error(error);
    }
  }

  agregarPersonajeAlFinal();
}

// b)

async function consigna_2_b() {
  function agregarDosAlPrincipio(pers1, pers2) {
    try {
      const data = fs.readFileSync('./listaPersonajes.json', 'utf-8');
      const personajesGOT = JSON.parse(data);

      const ultimoPersonaje = personajesGOT[personajesGOT.length - 1];
      const ultimoId = ultimoPersonaje.id;

      pers1.id = ultimoId + 1;
      pers2.id = ultimoId + 2;

      personajesGOT.unshift(nuevoPersonaje3, nuevoPersonaje4);

      console.log('Dos personajes agregados al principio del archivo');
      persistir(personajesGOT);
    } catch (error) {
      console.error(error);
    }
  }
  const nuevoPersonaje3 = {
    firstName: 'Juan',
    lastName: 'Perez',
    fullName: 'Juan Perez',
    title: 'Knight',
    family: 'House Stark',
    image: 'juan.jpg',
    imageUrl: 'https://miimagen.com/juan.jpg',
  };

  const nuevoPersonaje4 = {
    firstName: 'Lucia',
    lastName: 'Gomez',
    fullName: 'Lucia Gomez',
    title: 'Queen',
    family: 'House Targaryen',
    image: 'lucia.jpg',
    imageUrl: 'https://miimagen.com/lucia.jpg',
  };
  agregarDosAlPrincipio(nuevoPersonaje3, nuevoPersonaje4);
}

async function main() {
  await consigna_1_a();
  await consigna_1_b();
  await consigna_1_c();
  await consigna_1_d();
  await consigna_2_a();
  await consigna_2_b();
}

// c)

function eliminarPrimerPersonaje() {
  try {
    const data = fs.readFileSync('./listaPersonajes.json', 'utf-8');
    const personajes = JSON.parse(data);

    const eliminado = personajes.shift();

    console.log('Personaje eliminado:');
    console.log(eliminado);

    fs.writeFileSync(
      './listaPersonajes.json',
      JSON.stringify(personajes, null, 2)
    );

  } catch (error) {
    console.error('Error:', error);
  }
}
eliminarPrimerPersonaje();

// d)

function crearArchivoReducido() {
  try {
    const data = fs.readFileSync('./listaPersonajes.json', 'utf-8');
    const personajes = JSON.parse(data);

    //Crear nuevo array con solo id y nombre
    const reducido = personajes.map(p => ({
      id: p.id,
      nombre: p.fullName
    }));

    // Guardar en nuevo archivo
    fs.writeFileSync(
      './personajesReducidos.json',
      JSON.stringify(reducido, null, 2)
    );

    console.log('Archivo reducido');
    console.log(reducido);

  } catch (error) {
    console.error('Error:', error);
  }
}
crearArchivoReducido();

// e)

function ordenarPersonajesDecre() {
  try {
    const data = fs.readFileSync('./personajesReducidos.json', 'utf-8');
    const personajes = JSON.parse(data);

    personajes.sort((a, b) => {
      if (a.nombre < b.nombre) return 1;
      if (a.nombre > b.nombre) return -1;
      return 0;
    });

    console.log('Personajes ordenados de forma decreciente:');
    console.log(personajes);

  } catch (error) {
    console.error('Error:', error);
  }
}
ordenarPersonajesDecre();

main();
