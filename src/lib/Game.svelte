<script lang="ts">
	import Ban from '$lib/Ban.svelte';
	import { useBan, usePlayer } from './sanmoku_store';

	const player = usePlayer();
	const ban = useBan();
	let isGamePlaing: boolean = true;

	// 初期化する
	const init = () => {
		ban.reset();
		player.reset();
		isGamePlaing = true;
	};

	// 盤がクリックされた
	const onBanClick = (event: CustomEvent) => {
		if (!isGamePlaing) {
			return;
		}
		const index: number = event.detail;
		if (ban.put(index, $player)) {
			if (ban.isWon($player) || ban.isDraw()) {
				isGamePlaing = false;
				return;
			}
			player.change();
		}
	};
</script>

{#if isGamePlaing}
	<div>Next player: {$player}</div>
{:else if ban.isWon($player)}
	<div>Player {$player} won.</div>
{:else}
	<div>Game draw</div>
{/if}
<Ban ban={$ban} on:click={onBanClick} />

<button on:click={init}>clear</button>
