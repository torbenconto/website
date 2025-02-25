<script>
	let { data } = $props();
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-4">
	<div class="max-w-md w-full text-left">
		<h1 class="text-2xl font-semibold mb-4">Projects</h1>
		<ul class="space-y-3">
			{#each data.projects as { slug, title, description }}
				<li class="border-l-4 border-blue-500 pl-3">
					<a class="text-lg font-medium text-blue-600 hover:underline" href="/projects/{slug}">{title}</a>
					<p class="text-gray-600 text-sm">{description}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
