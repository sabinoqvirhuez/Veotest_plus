export function hideHTML() {
  const htmlElement = document.getElementById("Login");
  if (htmlElement) { // Comprueba si el elemento existe
    if (htmlElement.style.display === "none") {
      htmlElement.style.display = "block";
    } else {
      htmlElement.style.display = "none";
    }
  }
}

export function hideLogout() {
  const htmlElement = document.getElementById("Login");
  if (htmlElement) { // Comprueba si el elemento existe
    if (htmlElement.style.display === "none") {
      htmlElement.style.display = "block";
    } else {
      htmlElement.style.display = "none";
    }
  }
}

