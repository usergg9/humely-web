const btn = document.getElementById("btn");
const estado = document.getElementById("estado");

let recorder;
let chunks = [];

btn.addEventListener("mousedown", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    estado.textContent = "🎤 Grabando...";

    recorder = new MediaRecorder(stream);
    chunks = [];

    recorder.start();

    recorder.ondataavailable = e => chunks.push(e.data);

  } catch (err) {
    estado.textContent = "❌ Error micrófono";
    console.log(err);
  }
});

btn.addEventListener("mouseup", () => {
  if (recorder && recorder.state !== "inactive") {
    recorder.stop();

    recorder.onstop = () => {
      estado.textContent = "🔍 Procesando audio...";

      setTimeout(() => {
        estado.textContent = "🎵 Audio capturado (IA no conectada aún)";
      }, 1500);
    };
  }
});
