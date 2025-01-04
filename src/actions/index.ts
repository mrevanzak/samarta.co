import { ActionError, defineAction } from 'astro:actions';
import { DISCORD_WEBHOOK } from 'astro:env/server';
import { Duration, Effect } from 'effect';

class FetchError extends Error {
  readonly _tag = 'FetchError';
}

export const server = {
  contact: defineAction({
    handler: async (input) =>
      Effect.gen(function* () {
        yield* Effect.tryPromise({
          try: (signal) =>
            fetch(`${DISCORD_WEBHOOK}?wait=true`, {
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
              signal,
              body: JSON.stringify({
                content: `**Name** \`\`\`${input.name}\`\`\`\n**Company** \`\`\`${input.company}\`\`\`\n**Email** \`\`\`${input.email}\`\`\`\n**Phone** \`\`\`${input.phone}\`\`\`\n**Message** \`\`\`${input.message}\`\`\``,
              }),
            }).then(async (res) => {
              if (!res.ok) {
                throw new FetchError(await res.json());
              }
              return res;
            }),
          catch: (e: Error) => new FetchError(e?.message),
        }).pipe(Effect.withSpan('discord-webhook'));
      }).pipe(
        // Retry 3 times with 1 second delay between each retry
        Effect.retry({ times: 3, delay: Duration.seconds(1) }),
        // Timeout after 3 seconds
        Effect.timeout(Duration.seconds(3)),
        // Catch specific errors and throw a server error
        Effect.catchTags({
          TimeoutException: () => {
            console.error('Timeout while sending message to discord webhook');

            throw new ActionError({
              code: 'TIMEOUT',
              message: "Server didn't respond in time, please try again later",
            });
          },
          FetchError: (e) => {
            console.error('Error while sending message to discord webhook', e);

            throw new ActionError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Something went wrong, please try again later',
            });
          },
        }),
        Effect.runPromise
      ),
  }),
};
