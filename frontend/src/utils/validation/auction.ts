import { z } from "zod";

export const Zauction = z
  .object({
    title: z.string().min(3, "Minimum 3 characters required"),
    description: z.string().min(8, "Minimum 8 characters required"),
    productId: z.string().min(1, "Select a post"),
    baseAmount: z
      .number()
      .min(1, {message:"Base amount must be positive"})
      .max(50000, "Maximum amount is 50,000"),
    auctionType: z.enum(["Live", "Scheduled"]),
    startDateTime: z.date().optional(),
    endDateTime: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.auctionType === "Scheduled") {
        const now = new Date();

        // Ensure both startDateTime and endDateTime are provided for scheduled auctions
        if (!data.startDateTime || !data.endDateTime) {
          return false;
        }

        // Ensure startDateTime is not in the past
        if (data.startDateTime < now) {
          return false;
        }

        // Ensure endDateTime is after startDateTime
        if (data.endDateTime <= data.startDateTime) {
          return false;
        }
      }

      return true;
    },
    {
      message: "Invalid date or time selection",
      path: ["startDateTime", "endDateTime"],
    }
  );

export type TZauction = z.infer<typeof Zauction>;
