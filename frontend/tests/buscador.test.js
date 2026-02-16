/**
 * @jest-environment jsdom
 */

const { fireEvent, getByRole } = require("@testing-library/dom");
import userEvent from "@testing-library/user-event";
import fs from "fs";
import path from "path";

describe("Buscador accesible", () => {
  let documentBody;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../index.html"),
      "utf8"
    );
    documentBody = document.documentElement;
    documentBody.innerHTML = html;
    require("../app.js");
  });

  test("ENTER ejecuta búsqueda", async () => {
    const input = document.getElementById("search");
    input.focus();

    await userEvent.type(input, "web{enter}");

    const resultados = document.querySelector("#lista-resultados");
    expect(resultados.children.length).toBeGreaterThan(0);
  });

  test("Resultados son navegables con TAB", async () => {
    const input = document.getElementById("search");
    input.focus();

    await userEvent.type(input, "a{enter}");

    const item = document.querySelector("#lista-resultados li");
    item.focus();

    expect(document.activeElement).toBe(item);
  });

  test("Muestra mensaje accesible cuando no hay resultados", async () => {
    const input = document.getElementById("search");
    input.focus();

    await userEvent.type(input, "zzzzz{enter}");

    const alert = document.querySelector('[role="alert"]');
    expect(alert).not.toBeNull();
  });

  test("Estado loading usa aria-busy", async () => {
    const input = document.getElementById("search");
    const resultados = document.querySelector(".resultados");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(resultados.getAttribute("aria-busy")).toBe("true");
  });
});
