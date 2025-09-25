import fs from "node:fs/promises";

const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  // Método para inserir
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }
    this.#persist();
  }

  // Método para selecionar e listar
  select(table, filters) {
    let data = this.#database[table] ?? [];
    if (filters) {
      data = data.filter((row) => {
        return Object.entries(filters).some(([Key, value]) => {
          return row[Key].toLowerCase().includes(value.toLowerCase());
        });
      });
    }
    return data;
  }

  // Método para atualizar e listar
  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
      };
      this.#persist();
    }
  }
}
