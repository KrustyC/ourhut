<script>
  import { getContext, setContext } from "svelte";
  import L from "leaflet";
  import MarkerIcon from "$lib/components/icons/MarkerIcon.svelte";

  let classNames = undefined;
  export { classNames as class };

  export let marker = undefined;

  export let width = 30;
  export let height = 30;
  export let latLng;

  const layerGroup = getContext("layerGroup")();
  setContext("layer", () => marker);

  function createMarker(markerElement) {
    let icon = L.divIcon({
      html: markerElement,
      className: "map-marker",
      iconSize: L.point(width, height),
    });
    marker = L.marker(latLng, { icon }).addTo(layerGroup);

    return {
      destroy() {
        if (marker) {
          marker.remove();
          marker = undefined;
        }
      },
    };
  }
</script>

<div class="hidden">
  <div use:createMarker class={classNames}>
    {#if marker}
      <MarkerIcon />
    {/if}
  </div>
</div>
