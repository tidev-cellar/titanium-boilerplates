export default class EnthusiasticGreeter {
  enthusiasm: number;

  constructor(initialEnthusiasm: number = 5) {
    this.enthusiasm = initialEnthusiasm;
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join('!');
  }

  increment() {
    this.enthusiasm++;
  }

  decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm--;
    }
  }

  sayHello(name: string) {
    return `Hello ${name}${this.exclamationMarks}`;
  }
}