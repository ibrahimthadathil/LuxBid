
import { z } from "zod";


export const ZPost = z.object({
    title: z.string().min(3,'Minimum 3 character Required').max(20,'Title cannot exceed 12 character'),
    price :z.number().min(1,'Price must be positive value').max(100000,'Price is too high'),
    category : z.string().min(1),
    description: z.string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(300, { message: "Description cannot exceed 500 characters" }),
    file: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "At least one image is required.",
    })
    .refine(
        (fileList) => fileList.length <= 5, // Limit to 5 files
        { message: "Maximum 5 images allowed." }
    )
    .refine(
        (fileList) => {
            const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
            return Array.from(fileList).every((file) =>
                allowedTypes.includes(file.type)
            );
        },
        { message: "Only PNG, JPEG, WebP, and GIF images are allowed." }
    )
    .refine(
        (fileList) =>
            Array.from(fileList).every((file) => file.size <= 2 * 1024 * 1024),
        { message: "Each image must be less than 2MB." }
    ),
})

export type TZpost= z.infer<typeof ZPost>

