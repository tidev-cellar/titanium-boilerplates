export default class EnthusiasticGreeter {
  private enthusiasm: number;

  constructor(initialEnthusiasm: number = 5) {
    this.enthusiasm = initialEnthusiasm;
  }

  get exclamationMarks(): string {
    return Array(this.enthusiasm + 1).join('!');
  }

  public increment() {
    this.enthusiasm++;
  }

  public decrement() {
    if (this.enthusiasm > 1) {
      this.enthusiasm--;
    }
  }

  public sayHello(name: string) {
    return `Hello ${name}${this.exclamationMarks}`;
  }
}
