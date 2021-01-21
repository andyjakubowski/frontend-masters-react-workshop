import { createMachine, assign } from 'xstate';

const INITIAL_DURATION = 60;
const INITIAL_ELAPSED = 0;

export const timerMachine = createMachine(
  {
    initial: 'idle',
    context: {
      duration: INITIAL_DURATION,
      elapsed: INITIAL_ELAPSED,
      interval: 0.1,
    },
    states: {
      idle: {
        entry: 'resetTimer',
        on: {
          TOGGLE: 'running',
        },
      },
      running: {
        on: {
          TOGGLE: 'paused',
          ADD_MINUTE: {
            actions: 'incrementDuration',
          },
        },
      },
      paused: {
        on: {
          TOGGLE: 'running',
          RESET: 'idle',
        },
      },
    },
  },
  {
    actions: {
      resetTimer: assign({
        duration: INITIAL_DURATION,
        elapsed: INITIAL_ELAPSED,
      }),
      incrementDuration: assign({
        duration: (context, event) => context.duration + 60,
      }),
    },
  }
);
