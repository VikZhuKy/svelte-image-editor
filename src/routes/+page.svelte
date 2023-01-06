<script>
	import Counter from './Counter.svelte';
	import ImageUploader from './Image-upload.svelte';
	import ImageEditor from './Image.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import PEditor from './Editor.svelte';

  
  	import { content } from '$lib/dummy';
  	let height;

	import Viewer from 'tui-editor-svelte/Viewer.svelte';
	import Editor from 'tui-editor-svelte/Editor.svelte';


	let imgOrigin = null;
	let baseImage;
	$: {
		baseImage = {
			content_type: 'image',
			url: imgOrigin
			};
		}
	console.log("--image changed--", baseImage);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>

		to your new<br />SvelteKit Image Editor
	</h1>

	<ImageUploader bind:imageResult={imgOrigin}/>
	<ImageEditor output={baseImage}/>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	#editor_container {
		height: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
