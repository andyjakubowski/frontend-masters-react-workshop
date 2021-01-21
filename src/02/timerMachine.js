import { createMachine, assign } from 'xstate';

const INITIAL_DURATION = 60;
const INITIAL_ELAPSED = 0;

export const timerMachine = createMachine(
  {
    initial: 'idle',
    // Add initial context
    context: {
      duration: INITIAL_DURATION,
      elapsed: INITIAL_ELAPSED,
      interval: 0.1,
    },
    states: {
      idle: {
        // Reset duration and elapsed on entry
        entry: 'resetTimer',

        on: {
          TOGGLE: 'running',
        },
      },
      running: {
        on: {
          TOGGLE: 'paused',

          // On ADD_MINUTE, increment context.duration by 60 seconds
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
