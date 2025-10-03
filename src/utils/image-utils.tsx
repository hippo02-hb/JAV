/**
 * Utility functions for handling course images
 */

// Default course images based on level
const DEFAULT_COURSE_IMAGES = {
  N5: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJlZ2lubmVyJTIwYm9va3N8ZW58MXx8fHwxNzU5Mjg3NjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  N4: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc1OTI4NzYxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  N3: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGFkdmFuY2VkfGVufDF8fHx8MTc1OTI4NzYxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  Business: "https://images.unsplash.com/photo-1560472355-536de3962603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc1OTI4NzYxOHww&ixlib=rb-4.1.0&q=80&w=1080",
  Professional: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkyODc2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  default: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc1OTI4NzYxOHww&ixlib=rb-4.1.0&q=80&w=1080"
};

/**
 * Get the appropriate image URL for a course
 * @param image - The course image (can be URL, base64, or empty)
 * @param level - The course level for fallback image
 * @returns The image URL to display
 */
export function getCourseImage(image?: string, level?: string): string {
  // If image is provided and not empty, use it
  if (image && image.trim()) {
    return image;
  }

  // Otherwise, use default based on level
  const levelKey = level?.toUpperCase() as keyof typeof DEFAULT_COURSE_IMAGES;
  return DEFAULT_COURSE_IMAGES[levelKey] || DEFAULT_COURSE_IMAGES.default;
}

/**
 * Check if an image is a base64 string
 * @param image - The image string to check
 * @returns Whether the image is base64
 */
export function isBase64Image(image: string): boolean {
  return image.startsWith('data:image/');
}

/**
 * Get a placeholder image URL
 */
export function getPlaceholderImage(): string {
  return DEFAULT_COURSE_IMAGES.default;
}

/**
 * Convert file to base64
 * @param file - The file to convert
 * @returns Promise with base64 string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Validate if a file is a valid image
 * @param file - The file to validate
 * @returns Object with validation result and error message
 */
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'File phải là hình ảnh' };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, error: 'Kích thước file không được vượt quá 5MB' };
  }

  // Check file name
  if (file.name.length > 255) {
    return { isValid: false, error: 'Tên file quá dài' };
  }

  return { isValid: true };
}