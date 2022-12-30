<script>
  import Cropper from "svelte-easy-crop";
	import { getCroppedImg } from "./imageditor/canvasUtils"
	
	let image, fileinput, pixelCrop, croppedImage;
	
    image = "https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg";
	
    const defaultSrc = "https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg";
	
	function onFileSelected(e) {
        console.log("---file---");
        console.log(e.target.files[0])
  	let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = e => {
			image = e.target.result
		};
		reader.readAsDataURL(imageFile);
	}

	let profilePicture, style;
		
	function previewCrop(e){
		pixelCrop = e.detail.pixels;
		const { x, y, width } = e.detail.pixels;
		const scale = 200 / width;	
		profilePicture.style=`margin: ${-y*scale}px 0 0 ${-x*scale}px; width: ${profilePicture.naturalWidth * scale}px;`
	}
	
	async function cropImage(){
		croppedImage = await getCroppedImg(image, pixelCrop);
	}
	
	function reset() {
		croppedImage = null;
		image = null;
	}
</script>

{#if !image}
	<h2>
		Upload a picture for cropping?
	</h2>
	<input type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
	<h2>
		Or... use this cute dog 🐕
	</h2>
	<button type="button" on:click={() => {image = defaultSrc}}>Click me!</button>
{:else}
	<h2>svelte-easy-crop</h2>
	<div style="position: relative; width: 100%; height: 100%;">
		<Cropper
			{image}
			zoom=1
			crop={{x:0, y:0}}
		/>
	</div>
	<h2>Preview</h2>
	<div class="prof-pic-wrapper">
		<img
			bind:this={profilePicture}
			class="prof-pic"
			src={image}
			alt="Profile example"
			{style}
		/>
	</div>
	{#if croppedImage}
		<h2>Cropped Output</h2>
		<img
			src={croppedImage}
			alt="Cropped profile"
		/><br>
	{:else}
	<br><button type="button" on:click={async () => {croppedImage = await getCroppedImg(image, pixelCrop)}}>Crop!</button>
	{/if}
	<button type="button" on:click={reset}>Start over?</button>
{/if}

<style>
    .prof-pic-wrapper{
        height: 200px;
        width: 200px;
        position: relative;
        border: solid;
        overflow: hidden;
    }
    
    .prof-pic{
        position: absolute;
    }
</style>