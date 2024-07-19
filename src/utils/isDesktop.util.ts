export function isDesktop() {
   // Verifica si el dispositivo tiene una resolución mínima para ser considerado de escritorio
   const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;

   // También puedes verificar si el dispositivo no es un dispositivo móvil
   const isNotMobile = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

   // Devuelve true si el dispositivo es de escritorio
   return isLargeScreen && isNotMobile;
}
