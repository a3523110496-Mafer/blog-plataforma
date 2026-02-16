const input = document.getElementById("search");
const lista = document.getElementById("lista-resultados");
const resultados = document.querySelector(".resultados");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    buscarCursos(input.value);
  }
});

function buscarCursos(query) {
  lista.innerHTML = "";
  resultados.setAttribute("aria-busy", "true");

  setTimeout(() => {
    const cursos = [
      "Matemáticas",
      "Programación",
      "Física",
      "Accesibilidad Web"
    ].filter(curso =>
      curso.toLowerCase().includes(query.toLowerCase())
    );

    if (cursos.length === 0) {
      lista.innerHTML = `<li role="alert">No se encontraron resultados</li>`;
    } else {
      cursos.forEach(curso => {
        const li = document.createElement("li");
        li.tabIndex = 0;
        li.textContent = curso;
        lista.appendChild(li);
      });
    }

    resultados.setAttribute("aria-busy", "false");
  }, 500);
}
