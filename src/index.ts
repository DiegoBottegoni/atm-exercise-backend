import express from "express";
import ATM from "./domain/ATM";
import User from "./domain/User";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Crear usuario y ATM
const user = new User("Diego", 1234, 0);
const atm = new ATM(user);

app.get("/", (_req, res) => {
  res.send("Bienvenido al cajero automático");
});

// Login
app.post("/login", (req, res) => {
  const { pin } = req.body;

  if (atm.hasExceededAttempts()) {
    return res.status(403).json({
      message: "Se superaron los 3 intentos. Por favor, hacé POST a /exit para reiniciar los intentos antes de volver a ingresar tu PIN."
    });
  }

  if (atm.login(pin)) {
    return res.json({ message: `Bienvenido ${user.name}!`, options: atm.getOptions() });
  } else {
    const remainingAttempts = 3 - user["failedAttempts"];
    return res.status(401).json({
      message: `PIN incorrecto. Te quedan ${remainingAttempts} intento(s).`
    });
  }
});


// Consultar saldo
app.get("/balance", (_req, res) => {
  res.json({ balance: atm.getBalance() });
});

// Depositar
app.post("/deposit", (req, res) => {
  const { amount } = req.body;
  try {
    atm.deposit(amount);
    res.json({ message: `Depositado: ${amount}`, balance: atm.getBalance() });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Retirar
app.post("/withdraw", (req, res) => {
  const { amount } = req.body;
  const success = atm.withdraw(amount);
  if (success) {
    res.json({ message: `Retirado: ${amount}`, balance: atm.getBalance() });
  } else {
    res.status(400).json({ message: "Fondos insuficientes o cantidad inválida" });
  }
});

// Salir
app.post("/exit", (_req, res) => {
    atm.exit();
  res.json({ message: `Gracias por usar el cajero, ${user.name}!` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
