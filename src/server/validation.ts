import { z } from "zod";

export const roundSubmissionSchema = z.object({
  mode: z.enum(["daily", "review", "practice"]),
  seed: z.string().min(1).max(80).regex(/^[A-Za-z0-9:_.-]+$/),
  answers: z
    .array(
      z.object({
        cardId: z.string().min(1).max(80).regex(/^[a-z0-9-]+$/),
        selectedVerdict: z.enum(["supported", "mixed", "preliminary", "unsupported"]),
        confidence: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      }),
    )
    .min(1)
    .max(10)
    .refine((answers) => new Set(answers.map((answer) => answer.cardId)).size === answers.length, {
      message: "A round cannot answer the same card twice.",
    }),
});

export type RoundSubmission = z.infer<typeof roundSubmissionSchema>;
