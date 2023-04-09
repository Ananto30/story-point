import { writable } from 'svelte/store';

export const roomConfig = writable({
	maxTimerSeconds: 10,
	pointingSystem: 'Fibonacci series',
	allowedPointingSystem: ['Fibonacci series', 'T-shirt sizing'],
	tShirtPointing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
	fibonacciPointing: [0, 1, 2, 3, 5, 8, 13, 20]
});
