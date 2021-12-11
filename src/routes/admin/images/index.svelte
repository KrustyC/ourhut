<script>
  import BinIcon from "$lib/components/icons/Bin.svelte";
  import PieChartIcon from "$lib/components/icons/PieChart.svelte";
  import DeleteImageModal from "./DeleteImageModal.svelte";
  import ViewImageModal from "./ViewImageModal.svelte";

  let selectedImageIndex = undefined;
  let imageToDeleteIndex = undefined;

  let images = [
    "https://pbs.twimg.com/profile_images/1342768807891378178/8le-DzgC_400x400.jpg",
    "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    "https://media.istockphoto.com/photos/random-multicolored-spheres-computer-generated-abstract-form-of-large-picture-id1295274245?b=1&k=20&m=1295274245&s=170667a&w=0&h=4t-XT7aI_o42rGO207GPGAt9fayT6D-2kw9INeMYOgo=",
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/RandomBitmap.png",
    "https://static.scientificamerican.com/sciam/cache/file/4F73FD83-3377-42FC-915AD56BD66159FE_source.jpg",
    "https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092__480.png",
    "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Among-Us-Random-Name-Generator.jpg",
    "https://www.york.ac.uk/media/news-and-events/pressreleases/2020/Random%20feat.jpg",
    "https://rss.org.uk/RSS/media/Training-and-events/Events/2021/matrix900.jpg?ext=.jpg",
    "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://cdn.theatlantic.com/thumbor/fhRGDiyY6RCXCry-dx_RWRk8SP8=/74x0:1841x994/1600x900/media/img/mt/2020/07/Atlantic_randonaut_v1/original.png",
    "https://www.pngitem.com/pimgs/m/372-3721347_roastedchicken-rolled-a-random-image-posted-in-comment.png",
    "https://miro.medium.com/max/1200/1*1BUIofZgqVuR6nj8LbrRtQ.jpeg",
    "https://pbs.twimg.com/profile_images/1342768807891378178/8le-DzgC_400x400.jpg",
    "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
    "https://media.istockphoto.com/photos/random-multicolored-spheres-computer-generated-abstract-form-of-large-picture-id1295274245?b=1&k=20&m=1295274245&s=170667a&w=0&h=4t-XT7aI_o42rGO207GPGAt9fayT6D-2kw9INeMYOgo=",
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/RandomBitmap.png",
    "https://static.scientificamerican.com/sciam/cache/file/4F73FD83-3377-42FC-915AD56BD66159FE_source.jpg",
    "https://cdn.pixabay.com/photo/2015/03/17/02/01/cubes-677092__480.png",
    "https://static1.srcdn.com/wordpress/wp-content/uploads/2021/03/Among-Us-Random-Name-Generator.jpg",
    "https://www.york.ac.uk/media/news-and-events/pressreleases/2020/Random%20feat.jpg",
    "https://rss.org.uk/RSS/media/Training-and-events/Events/2021/matrix900.jpg?ext=.jpg",
    "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwZm9vZCUyMHN0b3JlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    "https://cdn.theatlantic.com/thumbor/fhRGDiyY6RCXCry-dx_RWRk8SP8=/74x0:1841x994/1600x900/media/img/mt/2020/07/Atlantic_randonaut_v1/original.png",
    "https://www.pngitem.com/pimgs/m/372-3721347_roastedchicken-rolled-a-random-image-posted-in-comment.png",
    "https://miro.medium.com/max/1200/1*1BUIofZgqVuR6nj8LbrRtQ.jpeg",
  ];

  function onSelectImage(index) {
    console.log("SLECTED IMAGE", index);
    selectedImageIndex = index;
  }

  function onCancelView() {
    selectedImageIndex = undefined;
  }

  function onWantToDeleteImage(index) {
    selectedImageIndex = undefined;
    imageToDeleteIndex = index;
  }

  function onDeleteSuccess() {
    images = [
      ...images.slice(0, imageToDeleteIndex),
      ...images.slice(imageToDeleteIndex + 1),
    ];

    imageToDeleteIndex = undefined;
  }

  function onCancelDelete() {
    imageToDeleteIndex = undefined;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center">
    <h2 class="text-gray-600 font-bold">Images</h2>
    <button class="bg-black hover:bg-blue-800 text-white font-bold p-2 rounded "
      >Upload Images</button
    >
  </div>
  <p class="text-gray-600">In this section you can manage your Images.</p>

  <div class="grid grid-cols-6 gap-4 mt-4">
    {#each images as image, index}
      <div class="relative">
        <img class="w-full cursor-pointer" src={image} on:click={() => onSelectImage(index)} />
        <button
          class="absolute top-2 right-2 h-6"
          on:click={() => onWantToDeleteImage(index)}
        >
          <BinIcon
            class="fill-current text-admin-danger hover:text-admin-danger-dark top-2 right-2 h-6 cursor-pointer"
          />
        </button>
      </div>
    {/each}
  </div>

  {#if selectedImageIndex !== undefined}
    <ViewImageModal
      image={images[selectedImageIndex]}
      onClose={onCancelView}
      onWantToDeleteImage={() => onWantToDeleteImage(selectedImageIndex)}
    />
  {/if}

  {#if imageToDeleteIndex !== undefined}
    <DeleteImageModal
      imageToDelete={images[imageToDeleteIndex]}
      onCancel={onCancelDelete}
      onSuccess={onDeleteSuccess}
    />
  {/if}
</div>
