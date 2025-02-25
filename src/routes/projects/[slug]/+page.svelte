<script>
	let { data } = $props();
</script>

<style>
    @import './markdown.css';
</style>

<div class="flex flex-col items-center justify-center min-h-screen">
    <div class="flex flex-col justify-center items-center space-y-4 max-w-prose text-left">
        <a class="text-blue-500 hover:underline" href={`https://github.com/${data.project.url}`} target="_blank" rel="noopener noreferrer">
            View on GitHub
        </a>
        <div class="markdown-body p-4"> {@html data.html}</div>
    </div>
</div>
