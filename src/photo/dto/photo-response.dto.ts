export class PhotoResponseDto {
  id: number;
  name: string;
  description: string;
  filename: string;
  views: number;
  isPublished: boolean;
  // Exclude any sensitive/internal fields
}