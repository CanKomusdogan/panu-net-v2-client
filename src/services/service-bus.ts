import mitt from 'mitt';

import type { MittEvents } from '@/types/mitt-events.ts';

const emitter = mitt<MittEvents>();

export default emitter;
