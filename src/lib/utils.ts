import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet(
	'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
	16
);

type Prefix = 'user';

export function createId(prefix: Prefix) {
	return `${prefix}_${nanoid()}`;
}
