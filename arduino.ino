const int totalLEDs = 43;
const int ledPins[totalLEDs] = {
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14,
  16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
  39, 40, 41, 42, 43, 44, 45
};

void apagarTodosLEDs() {
  for (int i = 0; i < totalLEDs; i++) {
    digitalWrite(ledPins[i], HIGH);
  }
}

void setup() {
  Serial.begin(9600);
  Serial.println("pronto");

  for (int i = 0; i < totalLEDs; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], HIGH); // Desliga todos
  }
}

void loop() {
  
  if (Serial.available()) {
    String dados = Serial.readStringUntil('\n');
    dados.trim();

    int separador = dados.indexOf(',');
    if (separador != -1) {
      String evento = dados.substring(0, separador);
      int horario = dados.substring(separador + 1).toInt();

      Serial.print("Recebido: ");
      Serial.print(evento);
      Serial.print(", ");
      Serial.println(horario);

      int arcoIndex = -1;
      if (evento == "A") arcoIndex = 0;
      else if (evento == "B") arcoIndex = 1;
      else if (evento == "C") arcoIndex = 2;

      if (arcoIndex == 0 && horario >= 1 && horario <= 15) {
        int ledIndex = arcoIndex * 0 + horario - 1;
        apagarTodosLEDs();
        digitalWrite(ledPins[ledIndex], LOW);
        Serial.print("Acendendo LED índice: ");
        Serial.println(ledIndex);

      } else if (arcoIndex == 1 && horario >= 1 && horario <= 13) {
        int ledIndex = 15 + horario - 1;
        apagarTodosLEDs();
        digitalWrite(ledPins[ledIndex], LOW);
        Serial.print("Acendendo LED índice: ");
        Serial.println(ledIndex);

      } else if (arcoIndex == 2 && horario >= 1 && horario <= 15) {
        int ledIndex = 28 + horario - 1;
        apagarTodosLEDs();
        digitalWrite(ledPins[ledIndex], LOW);
        Serial.print("Acendendo LED índice: ");
        Serial.println(ledIndex);      
      
      } else {
        Serial.println("Evento ou horário inválido.");
      }
    }
  }
}