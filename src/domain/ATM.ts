import User from "./User";

class ATM {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  login(pin: number): boolean {
    return this.user.validatePin(pin);
  }

  getOptions(): string[] {
    return ["saldo", "retirar", "deposito", "salir"];
  }

  deposit(amount: number): void {
    this.user.deposit(amount);
  }

  withdraw(amount: number): boolean {
    return this.user.withdraw(amount);
  }

  getBalance(): number {
    return this.user.getBalance();
  }

  hasExceededAttempts(): boolean {
    return this.user.hasExceededAttempts();
  }

  exit() {
    this.user.resetAttempts();
  }

}

export default ATM;
