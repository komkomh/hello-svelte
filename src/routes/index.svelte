<script lang="ts">
  const message = "hello svelte!";
  let count = 0;
  const countUp = () => count += 1;
</script>

<svelte:head>
  <title>たいとる</title>
</svelte:head>

<div>message: {message}</div>
<div>count: {count}</div>
<button on:click={countUp}>クリック</button>

