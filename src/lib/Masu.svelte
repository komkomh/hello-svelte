<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { MasuValue } from 'src/types/type';

	export let index: number;
	export let value: MasuValue;
	const dispatch = createEventDispatcher<{ click: number }>();
	const onClick = () => dispatch('click', index);
</script>

<button class="masu" on:click={onClick}>{value}</button>

<style>
	.masu {
		width: 100px;
		height: 100px;
		background-color: white;
		border: solid gray 1px;
		font-size: 80px;
		align-content: center;
		margin: 0 0;
	}
</style>
