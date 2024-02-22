<script lang="ts">

  import { panzoom, type Options, type Point } from "$lib/panzoom"

  export let classes: string = ""
  export let imageUrl: string
  export let width: number = window.innerWidth
  export let height: number = window.innerHeight
  export let imageScale: number = 2

  const canvasDrawer = new Promise<Options>(resolve => {
    const image = new Image()

    image.onload = () =>
      resolve({
        // w and h are the default scale of the image
        width: image.width * imageScale,
        height: image.height * imageScale,
        render,
      })
    image.src = imageUrl

    function render(ctx: CanvasRenderingContext2D, _t: number, _focus: Point) {
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = 10;
      ctx.drawImage(image, 0, 0)
    }
  })
</script>

<style>
  canvas {
		box-sizing: border-box;
		user-select: none;
		touch-action: none;
		overscroll-behavior: none;
		-webkit-user-select: none; /* disable selection/Copy of UIWebView */
		-webkit-touch-callout: none; /* disable the IOS popup when long-press on a link */
	}
</style>

{#await canvasDrawer then options}
  <canvas
    class="{classes}"
    width={width}
    height={height}
    use:panzoom={options} />
{/await}
