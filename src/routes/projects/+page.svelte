<script>
	let { data } = $props();
</script>

<style>
	.index-list {
		list-style-type: none;
		padding: 0;
	}

	.index-item {
		margin-bottom: 0.5em;
	}

	.index-link {
		font-family: monospace;
		color: #0366d6;
		text-decoration: none;
	}

	.index-link:hover {
		text-decoration: underline;
	}

	.index-description {
		font-family: monospace;
		color: #555;
		margin-left: 1em;
	}
</style>

<div class="flex flex-col items-start justify-start min-h-screen p-4">
	<div class="w-full text-left">
		<h1 class="text-2xl font-semibold mb-4">Projects</h1>
		<ul class="index-list">
			{#each data.projects as { slug, title, description }}
				<li class="index-item">
					<a class="index-link" href="/projects/{slug}">{title}/</a>
					<p class="index-description">{description}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
