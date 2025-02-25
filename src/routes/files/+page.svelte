<script lang="ts">
	import { onMount } from 'svelte';
  
	let repoContent: any[] = [];
	let currentPath: string = '';
  
	onMount(async () => {
	  // Load the contents of the root directory initially
	  await loadContent('');
	});
  
	// Function to load the content of a given path
	async function loadContent(path: string) {
	  const response = await fetch(`https://api.github.com/repos/torbenconto/files/contents/${path}`);
	  if (!response.ok) {
		throw new Error(`Failed to fetch repository contents: ${response.status}`);
	  }
	  const content = await response.json();
	  currentPath = path;  // Update the current path
	  repoContent = content;  // Store the content to display
	}
  
	// Navigate to a directory
	function navigateToDir(path: string) {
	  loadContent(path);
	}

	function downloadFile(name: string) {
  const url = "https://raw.githubusercontent.com/torbenconto/files/master/" + name;

  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const a = document.createElement('a');
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(error => console.error('Error downloading the file:', error));
}

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
		cursor: pointer; /* Ensure the cursor is a pointer */
	}

	.index-link:hover {
		text-decoration: underline;
	}

	.icon {
		margin-right: 8px;
	}
</style>

<div class="flex flex-col items-start justify-start min-h-screen p-4">
	<div class="w-full text-left">
		<h1 class="text-2xl font-semibold mb-4">
			{#if currentPath}
				Index of {currentPath}
			{:else}
				Files
			{/if}
		</h1>

		{#if currentPath}
			<a class="index-link mb-4" on:click|preventDefault={() => loadContent('')}>Back to Root</a>
		{/if}

		<ul class="index-list">
			{#each repoContent as item (item.path)}
				<li class="index-item">
					{#if item.type === 'dir'}
						<a class="index-link" on:click|preventDefault={() => navigateToDir(currentPath ? currentPath + '/' + item.name : item.name)}>
							<i class="fas fa-folder icon"></i>
							{item.name}/
						</a>
					{:else}
						<a class="index-link" on:click|preventDefault={() => downloadFile(currentPath ? currentPath + '/' + item.name : item.name)}>
							<i class="fas fa-file icon"></i>
							{item.name}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
