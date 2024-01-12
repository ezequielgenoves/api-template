export default class Service {
  protected elements: any[] = [];

  findAll() {
    return this.elements;
  }

  findByProperty(property: string, value) {
    const element = this.elements.find((user) => user[property] === value);
    return element;
  }

  findById(id: number) {
    return this.findByProperty("id", id);
  }

  create(data) {
    const id = Math.max(0, ...this.elements.map(({ id }) => id)) + 1;
    const element = { id, ...data };
    this.elements.push(element);
    return element;
  }

  update(id: number, data) {
    const userIndex = this.elements.findIndex((user) => user.id === id);
    this.elements[userIndex] = { id, ...data };
  }

  patch(id: number, data) {
    const userIndex = this.elements.findIndex((user) => user.id === id);
    this.elements[userIndex] = {
      id,
      ...this.elements[userIndex],
      ...data,
    };
  }

  delete(id: number) {
    this.elements = this.elements.filter((user) => user.id === Number(id));
    return this.elements;
  }
}
