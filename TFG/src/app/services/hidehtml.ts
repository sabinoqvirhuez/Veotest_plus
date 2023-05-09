export function hideHTML() {
  const htmlElement = document.getElementById("LoginForm");
  if (htmlElement) { // Comprueba si el elemento existe
    if (htmlElement.style.display === "none") {
      htmlElement.style.display = "block";
    } else {
      htmlElement.style.display = "none";
    }
  }
}

