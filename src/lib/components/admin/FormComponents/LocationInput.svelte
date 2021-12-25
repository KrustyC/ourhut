<script>
  import TextInput from "./TextInput.svelte";
  import Map from "$lib/components/shared/Map/Map.svelte";
  import L from "leaflet";

  export let location = {
    address: {
      addressLine: undefined,
      postcode: undefined,
      city: undefined,
    },
    coordinates: {
      lat: undefined,
      lng: undefined,
    },
  };

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

  function onConfirmAddress() {
    location = {
      address: {
        addressLine,
        postcode,
        city,
      },
      coordinates,
    };
  }

  $: buttonDisabled = !addressLine || !postcode || !city;
  $: console.log(buttonDisabled);
</script>

<div class="flex">
  <div class="w-1/2 flex flex-col mr-4">
    <div class="flex flex-col">
      <TextInput
        bind:value={addressLine}
        label="Line Address"
        name="lineAddress"
        placeholder="ex 10, Downing Street"
      />
    </div>

    <div class="flex mt-4">
      <div class="mr-4">
        <TextInput
          bind:value={postcode}
          onBlur={onPostcodeBlur}
          label="Postcode"
          name="postcode"
          placeholder="SW4 6BL"
        />
      </div>

      <div>
        <TextInput
          bind:value={city}
          label="City"
          name="city"
          placeholder="London"
        />
      </div>
    </div>

    <div class="flex flex-col items-start mt-auto mt-4">
      <p class="text-xs mb-4">
        <b class="uppercase">Please note:</b> the location coordinates are based
        purely on the postcode, and may not be spot on with the exact location.
        Please make sure the address line is correct so that users can find the
        actual place more easily.
        <br />
        <br />
        Once you are happy with the marker location in the map, please confirm with
        button below to make sure the location is added to the event.
      </p>

      <button
        disabled={buttonDisabled}
        class="btn-admin btn-primary btn-sm"
        on:click={onConfirmAddress}
      >
        Confirm Location
      </button>
    </div>
  </div>

  <div class="w-1/2">
    <Map
      bind:map
      view={initialView}
      zoom={13}
      height="400px"
      {markerLocations}
    />
  </div>
</div>
