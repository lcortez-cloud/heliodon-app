const express = require("express");
const SerialPort = require("serialport").SerialPort;
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORTA_SERIAL = 'COM14'; // <-- Altere para a porta do seu Arduino, se necessário
const BAUD_RATE = 9600;

const port = new SerialPort({
  path: PORTA_SERIAL,
  baudRate: BAUD_RATE,
});

port.on("open", () => {
  console.log("✅ Porta serial aberta:", PORTA_SERIAL);
});

port.on("error", (err) => {
  console.error("Erro na porta serial:", err.message);
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "app"))); // para servir HTML/CSS/JS

app.post("/enviar", (req, res) => {
  const { evento, horario } = req.body;

  if (
    (evento === "A" || evento === "C") &&
    Number.isInteger(horario) &&
    horario >= 1 &&
    horario <= 15
  ) {
    const dadosParaEnviar = `${evento},${horario}\n`;
    
    port.write(dadosParaEnviar, (err) => {
      if (err) {
        console.error("Erro ao escrever na porta serial:", err.message);
        return res.status(500).send("Erro ao enviar para o Arduino.");
      }
      console.log("Dados enviados:", dadosParaEnviar.trim());
      res.send("Dados enviados com sucesso.");
    });

  } else if(
    (evento === "B") &&
    Number.isInteger(horario) &&
    horario >= 2 &&
    horario <= 14
  ) {
    const dadosParaEnviar = `${evento},${horario - 1}\n`;
    
    port.write(dadosParaEnviar, (err) => {
      if (err) {
        console.error("Erro ao escrever na porta serial:", err.message);
        return res.status(500).send("Erro ao enviar para o Arduino.");
      }
      console.log("Dados enviados:", dadosParaEnviar.trim());
      res.send("Dados enviados com sucesso.");
    });

  } else {
    res.status(400).send("Dados inválidos.");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});