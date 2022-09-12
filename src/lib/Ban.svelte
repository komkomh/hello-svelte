<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { MasuValue } from 'src/types/type';
	import Masu from '../lib/Masu.svelte';

	export let ban: MasuValue[];
	const dispatch = createEventDispatcher<{ click: number }>();
	const onClick = (event: CustomEvent<number>) => dispatch('click', event.detail);
</script>

<div class="ban">
	{#each ban as masu, index}
		<Masu value={masu} {index} on:click={onClick} />
	{/each}
</div>

<style>
	.ban {
		display: flex;
		width: 300px;
		flex-wrap: wrap;
	}
</style>
