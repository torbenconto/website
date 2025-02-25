<script lang="ts">
	import { onMount } from 'svelte';
  
	let repoContent: any[] = [];
	let currentPath: string = '';
	let visitedDirs: Set<string> = new Set();
  
	onMount(async () => {
	  // Load the contents of the root directory initially
	  await loadContent('');
	});
  
	// Function to load the content of a given path
	async function loadContent(path: string) {
	  const response = await fetch(`https://api.github.com/repos/torbenconto/notes/contents/${path}`);
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
	  cursor: pointer;
	}
  
	.index-link:hover {
	  text-decoration: underline;
	}
  
	.back-link {
	  font-family: monospace;
	  color: #0366d6;
	  text-decoration: none;
	  cursor: pointer;
	}
  </style>
  
  <div class="flex flex-col items-start justify-start min-h-screen p-4">
	<div class="w-full text-left">
	  <h1 class="text-2xl font-semibold mb-4">Files</h1>
  
	  <!-- Back button to go back to the previous directory -->
	  {#if currentPath}
		<a class="back-link" on:click|preventDefault={() => loadContent('')}>Back to root</a>
		<p>Current Path: {currentPath}</p>
	  {/if}
  
	  <!-- Display the current content -->
	  <ul class="index-list">
		{#each repoContent as item (item.path)}
		  <li class="index-item">
			{#if item.type === 'dir'}
			  <a class="index-link" on:click|preventDefault={() => navigateToDir(currentPath ? currentPath + '/' + item.name : item.name)}>
				{item.name}
			  </a>
			{:else}
			  <span>{item.name}</span> <!-- Display files without linking -->
			{/if}
		  </li>
		{/each}
	  </ul>
	</div>
  </div>
  