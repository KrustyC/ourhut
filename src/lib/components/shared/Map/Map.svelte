<script>
  import { createEventDispatcher, setContext } from "svelte";
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import Marker from "./Marker.svelte";

  export let height = "100%";
  export let width = "100%";
  export let markerLocations = [];

  // Must set either bounds, or view and zoom.
  export let bounds = undefined;
  export let view = undefined;
  export let zoom = undefined;

  let mapProp = undefined;
  export { mapProp as map };

  export const invalidateSize = () => map?.invalidateSize();

  const dispatch = createEventDispatcher();

  let map;
  $: mapProp = map;

  export const getMap = () => map;
  setContext("layerGroup", getMap);
  setContext("layer", getMap);
  setContext("map", getMap);

  function createLeaflet(node) {
    map = L.map(node).on("zoom", (e) => dispatch("zoom", e));
    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(view, zoom);
    }

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
            &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    return {
      destroy() {
        map.remove();
        map = undefined;
      },
    };
  }

  function resizeMap() {
    if (map) {
      map.invalidateSize();
    }
  }

  $: if (map) {
    if (bounds) {
      map.fitBounds(bounds);
    } else {
      map.setView(view, zoom);
    }
  }

  $: if (map && markerLocations.length > 0) {
    map.panTo(new L.LatLng(markerLocations[0].lat, markerLocations[0].lng));
  }
</script>

<svelte:window on:resize={resizeMap} />

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>

<div style="height:{height};width:{width}" use:createLeaflet>
  {#if map}
    <slot {map}>
      {#each markerLocations as latLng (latLng.lat + latLng.lng)}
        <Marker {latLng} width={50} height={50} />
      {/each}
    </slot>
  {/if}
</div>

<style>
  :global(.leaflet-control-container) {
    position: static;
  }

  :global(.leaflet-container) {
    z-index: 0;
  }
</style>
