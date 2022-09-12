import type { MasuValue, Player } from 'src/types/type';
import { get, writable } from 'svelte/store';

export const usePlayer = () => {
	const initial: Player = 'O';
	const { subscribe, set, update } = writable<Player>(initial);
	const reset = () => set(initial);
	const change = () => update((p) => (p == 'O' ? 'X' : 'O'));
	return { subscribe, reset, change };
};

export const useBan = () => {
	const initialValues = (): MasuValue[] => ['', '', '', '', '', '', '', '', ''];
	const { subscribe, set } = writable<MasuValue[]>(initialValues());
	const reset = () => set(initialValues());

	// 盤がクリックされた
	const put = (index: number, player: Player): boolean => {
		const ban = get({ subscribe });
		if (ban[index] !== '') {
			return false;
		}
		ban[index] = player;
		set(ban);
		return true;
	};

	// 勝ちを判定する
	const isWon = (player: Player): boolean => {
		const positions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		const ban: MasuValue[] = get({ subscribe });
		return (
			positions.find((p) => {
				return p.map((px) => ban[px]).every((masu) => masu === player);
			}) !== undefined
		);
	};
	// 引き分けを判定する
	const isDraw = (): boolean => {
		return get({subscribe}).every((masu) => masu !== '');
	};

	return { subscribe, reset, put, isWon, isDraw };
};
