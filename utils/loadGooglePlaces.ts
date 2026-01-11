export function loadGooglePlaces(apiKey: string): Promise<void> {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).google?.maps?.places) {
      resolve();
      return;
    }

    // Check if script is already in the DOM
    if (document.getElementById("google-maps-script")) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=beta`;
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}
