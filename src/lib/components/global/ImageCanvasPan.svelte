<script lang="ts">

  import { panzoom, type Options, type Point } from "$lib/panzoom"

  export let classes: string = ""
  export let imageUrl: string
  export let width: number = window.innerWidth
  export let height: number = window.innerHeight

  const canvasDrawer = new Promise<Options>(resolve => {
    const image = new Image()

    image.onload = () =>
      resolve({
        width: image.width,
        height: image.height,
        render,
      })
    image.src = imageUrl

    function render(ctx: CanvasRenderingContext2D, _t: number, _focus: Point) {
      ctx.shadowColor = "black";
      ctx.shadowBlur = 6;
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
