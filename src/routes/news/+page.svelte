<script lang="ts">
	import { ProgressRadial } from "@skeletonlabs/skeleton";


  import { marked } from "marked"

  async function getParsedChangelogMD() {
    // Fetch the CHANGELOG.md by /CHANGELOG.md url
    const response = await fetch('/CHANGELOG.md');
    const text = await response.text();
    // Parse the markdown to html
    const html = marked(text);
    return html;
  }

</script>

<div class="flex flex-col items-center">

	<h1 class="h1 my-5">News</h1>
	<hr />
	<br />

  <article class="prose lg:prose-xl prose-code:bg-purple-500 dark:prose-invert">
    {#await getParsedChangelogMD()}
      <ProgressRadial value={undefined} />
    {:then html}
      {@html html}
    {/await}
  </article>

</div>
