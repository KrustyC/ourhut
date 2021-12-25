<script>
  import TextInput from "./TextInput.svelte";
  import Map from "$lib/components/shared/Map/Map.svelte";
  import L from "leaflet";

  export let address;

  let addressLine;
  let postcode;
  let city;

  let map;
  let coordinates;
  let markerLocations = [];

  const initialView = [51.509865, -0.118092];

  async function onPostcodeBlur() {
    const url = `https://api.postcodes.io/postcodes/${postcode}`;
    const res = await fetch(url, {
      method: "GET",
    });

    const { result } = await res.json();

    if (result) {
      coordinates = { lat: result.latitude, lng: result.longitude };
      markerLocations = [coordinates];
    }
  }
</script>

<div class="flex flex-col">
  <div class="flex">
    <div class="flex flex-col mr-8">
      <TextInput
        bind:value={addressLine}
        label="Line Address"
        name="lineAddress"
        placeholder="ex 10, Downing Street"
      />
    </div>

    <div class="flex flex-col mr-8">
      <TextInput
        bind:value={postcode}
        onBlur={onPostcodeBlur}
        label="Postcode"
        name="postcode"
        placeholder="SW4 6BL"
      />
    </div>

    <div class="flex flex-col mr-8">
      <TextInput
        bind:value={city}
        label="City"
        name="city"
        placeholder="London"
      />
    </div>
  </div>

  <div class="mt-8">
    <Map bind:map view={initialView} zoom={13} height="300px" {markerLocations} />
  </div>
</div>
