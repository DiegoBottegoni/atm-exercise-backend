class User {
  name: string;
  private pin: number;
  balance: number = 0;
  private failedAttempts: number = 0;

  constructor(name: string, pin: number, balance: number = 0) {
    this.name = name;
    this.pin = pin;
    this.balance = balance;
  }

  validatePin(inputPin: number): boolean {
    if (this.failedAttempts >= 3) return false;

    if (this.pin === inputPin) {
      this.failedAttempts = 0; // reset after success
      return true;
    } else {
      this.failedAttempts++;
      return false;
    }
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("La suma a depositar debe ser mayor a 0");
    this.balance += amount;
  }

 withdraw(amount: number): boolean {
  if (amount <= 0 || this.balance <= 0 || amount > this.balance) return false;
  this.balance -= amount;
  return true;
}



  getBalance(): number {
    return this.balance;
  }
    
  getRemainingAttempts(): number {
    return Math.max(0, 3 - this.failedAttempts);
}


  hasExceededAttempts(): boolean {
    return this.failedAttempts >= 3;
  }

  resetAttempts(): void {
    this.failedAttempts = 0;
  }

}

export default User;
