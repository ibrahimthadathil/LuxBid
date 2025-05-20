import { z } from "zod";
import moment from 'moment-timezone';

export const Zauction = z
  .object({
    title: z.string().min(3, "Minimum 3 characters required"),
    description: z.string().min(8, "Minimum 8 characters required"),
    post: z.string().min(1, "Select a post"),
    baseAmount: z
      .number()
      .min(1, { message: "Base amount must be positive" })
      .max(50000, "Maximum amount is 50,000"),
    auctionType: z.enum(["Live", "Scheduled"]),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
  })
  .refine(
    (data) => {
      if (data.auctionType === "Scheduled") {
        // Get current time in IST
        const now = moment().tz('Asia/Kolkata');

        // Ensure both startDateTime and endDateTime are provided
        if (!data.startTime || !data.endTime) {
          return false;
        }

        // Convert startDateTime and endDateTime to IST
        const startDateTime = moment.utc(data.startTime).tz('Asia/Kolkata');
        const endDateTime = moment.utc(data.endTime).tz('Asia/Kolkata');
        // Validation checks
        if (startDateTime.isBefore(now)) {
          return false; // Start time is in the past
        }
        if (endDateTime.isSameOrBefore(startDateTime)) {
          return false; // End time must be after start time
        }
      }

      return true;
    },
    {
      message: "Invalid date or time selection",
      path: ["startTime", "endTime"],
    }
  );

// bid validation schema
export const bidSchema = z.object({
  bidAmount: z.number().min(1, "Bid amount must be greater than 0"),
  currentBid: z.number(),
}).refine(
  ({ bidAmount, currentBid }) => bidAmount > currentBid,
  { message: "Bid amount must be higher than the current bid" }
);



export type TZauction = z.infer<typeof Zauction>;
