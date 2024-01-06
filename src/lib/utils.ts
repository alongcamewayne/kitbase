import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet(
	'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
);

type Prefix = 'user' | 'session';

export function createId(prefix: Prefix, length = 19) {
	return `${prefix}_${nanoid(length)}`;
}
