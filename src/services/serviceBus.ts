import mitt from 'mitt';

import type { MittEvents } from '@/types/MittEvents.ts';

const emitter = mitt<MittEvents>();

export default emitter;
