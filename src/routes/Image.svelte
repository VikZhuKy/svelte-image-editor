<script lang="ts">
    import { base } from '$app/paths';
    import { Highlight, HighlightSvelte } from 'svelte-highlight';
    import { atomOneDark } from 'svelte-highlight/styles';
    import typescript from 'svelte-highlight/languages/typescript';

    import {
        CropWindow,
        defaultValue,
        defaultOptions,
        type Point,
        type CropValue,
        type Media,
        type Options,
        type OverlayOptions
    } from '../lib';
    const VIDEO: Media = {
        content_type: 'video',
        url: `${base}/Mountain%20-%208837.mp4`
    };
    const IMAGE: Media = {
        content_type: 'image',
        url: `${base}/hintersee-3601004.jpg`
    };
    let video: boolean = false;
    let media = IMAGE;
    export let output = media;
    let options: Options<OverlayOptions> = {
        ...defaultOptions,
        shape: 'rect',
        crop_window_margin: 30,
        overlay_options: {
            overlay_color: '#167676AA',
            line_color: '#f3f5e866',
            show_third_lines: true
        }
    };
    let value: CropValue = { ...defaultValue };
    let value2: CropValue = { ...defaultValue };
    let position: Point = { x: 0, y: 0 };
    let crop_window_el: CropWindow<OverlayOptions>;
   
    let placeholder;
    let showImage = true;
   
   $: {
        position = value.position;
        video = video;
        media = output;
    }



</script>

<svelte:head>
    {@html atomOneDark}
</svelte:head>

<div class="container">
	{#if showImage}
   

    <div class="box">
        <h2 id="with-controls"><a href="#with-controls">Example with controls</a></h2>

        <div style="height:10em; ">
            <CropWindow bind:this={crop_window_el} bind:value {media} {options} />
        </div>


        <h3>Result</h3>
        <div
            style="position:relative;height:100px;width:{value.aspect *
                100}px; overflow:hidden; border-radius: {options.shape == 'round' ? '50%' : '0'}"
        >
            {#if video}
                <video
                    style={`transform: translateX(-50%) translateY(-50%) rotate(${
                        value.rotation || 0
                    }deg);` +
                        `height: ${(value.scale || 0.0) * 100}px;` +
                        `margin-left: ${
                            (100 * value.aspect) / 2 + (value.position.x || 0) * 100
                        }px;` +
                        `margin-top: ${100 / 2 + (value.position.y || 0) * 100}px;
                max-width:none;`}
                    src={media.url}
                    autoPlay
                    loop
                    muted={true}
                />
            {:else}
                <img
                    style={`transform: translateX(-50%) translateY(-50%) rotate(${
                        value.rotation || 0
                    }deg);` +
                        `height: ${(value.scale || 0.0) * 100}px;` +
                        `margin-left: ${
                            (100 * value.aspect) / 2 + (value.position.x || 0) * 100
                        }px;` +
                        `margin-top: ${100 / 2 + (value.position.y || 0) * 100}px;
                max-width:none;`}
                    src={media.url}
                    alt="result"
                />
            {/if}
        </div>

        <h3>Aspect ratio</h3>
        <div>
            <button
                on:click={() => {
                    value.aspect = 8;
                }}>8:1</button
            >
            <button
                on:click={() => {
                    value.aspect = 16 / 9;
                }}>16:9</button
            >
            <button
                on:click={() => {
                    value.aspect = 4 / 3;
                }}>4:3</button
            >
            <button
                on:click={() => {
                    value.aspect = 1;
                }}>1:1</button
            >
            <button
                on:click={() => {
                    value.aspect = 3 / 4;
                }}>3:4</button
            >
        </div>

        <h3>Scale / Rotation / Position</h3>

        <div style="display:grid; grid-template-columns: auto 1fr;column-gap:2rem">
            <div>scale</div>
            <div>
                <input
                    type="range"
                    min={0.001}
                    max="6"
                    step={0.01}
                    on:input={(e) => crop_window_el.set_zoom(parseFloat(e.currentTarget.value))}
                    on:change={(e) => {
                        crop_window_el.commit();
                        e.currentTarget.value = value.scale.toString();
                    }}
                    value={value.scale}
                />
                <!-- Note: For scale, it is necessary to update the value after the component scales
            the image to fit. Otherwise, the value of the input element can get out of sync. -->
                {Math.round(value.scale * 100) / 100}
            </div>
            <div>rotation</div>
            <div>
                <input
                    type="range"
                    min={-180}
                    max="180"
                    step={1}
                    on:input={(e) => crop_window_el.set_rotation(parseFloat(e.currentTarget.value))}
                    on:change={crop_window_el.commit}
                    value={value.rotation}
                />
                {Math.round(value.rotation * 100) / 100}
            </div>
            <div>x</div>
            <input
                type="number"
                step={0.01}
                on:input={() => crop_window_el.set_pan(position)}
                on:change={() => {
                    crop_window_el.commit();
                    position.x = value.position.x;
                }}
                bind:value={position.x}
            />

            <div>y</div>
            <input
                type="number"
                step={0.01}
                on:input={() => crop_window_el.set_pan(position)}
                on:change={() => {
                    crop_window_el.commit();
                    position.y = value.position.y;
                }}
                bind:value={position.y}
            />
        </div>

        <h3>Colors</h3>
        <div
            style="display:grid; grid-template-columns: auto 1fr; column-gap:2rem; align-items:center;"
        >
            <div>overlay color</div>
            <input type="color" bind:value={options.overlay_options.overlay_color} />
            <div>line color</div>
            <input type="color" bind:value={options.overlay_options.line_color} />
        </div>
        <h3>Shape</h3>
        <div>
            <select bind:value={options.shape}>
                <option value="rect">rectangle</option>
                <option value="round">round</option>
            </select>
            <select bind:value={options.overlay_options.show_third_lines}>
                <option value={true}>show third lines</option>
                <option value={false}>don't show third lines</option>
            </select>
        </div>
    </div>
	{:else}
		<span bind:this={placeholder}>Image Preview</span>
	{/if}

</div>

<style>
    .container {
        max-width: 50em;
        margin: 0 auto;
        padding: 4rem 1rem;
    }
    .box {
        padding: 1.5rem 0;
    }
    :global(pre),
    p {
        padding: 0.5rem 0;
    }
    ol {
        padding-left: 1.5rem;
    }
    li {
        margin: 1rem 0;
    }
    h1 {
        padding: 2rem 0;
    }
    h2 {
        margin-top: 1rem;
        font-size: 1.4rem;
        padding: 1rem 0;
    }
    h3 {
        padding: 1rem 0;
    }
    h1 a:hover,
    h2 a:hover,
    h3 a:hover {
        text-decoration: none;
    }
    *:target * {
        background: #37b5b5;
        color: black;
    }
</style>