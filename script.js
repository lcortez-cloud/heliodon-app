document.addEventListener("DOMContentLoaded", () => {
  const btnEnviar = document.getElementById("btnEnviar");

  btnEnviar.addEventListener("click", () => {
    const evento = document.getElementById("arcoSelect").value;
    const horario = document.getElementById("timeSelect").value;

    if (!evento || horario === "") {
      alert("Selecione um evento e um horário.");
      return;
    }

    const dados = {
      evento: evento,
      horario: parseInt(horario),
    };

    fetch("/enviar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
      .then((res) => res.text())
      .then((msg) => alert(msg))
      .catch((err) => {
        console.error("Erro ao enviar dados:", err);
        alert("Erro ao enviar dados.");
      });
  });
});