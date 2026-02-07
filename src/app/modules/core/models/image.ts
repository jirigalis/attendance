import { ImagePath } from "./image-path";

export interface Image {
    id: number;
    name: string;
    path: ImagePath[];
    category_id: number;
    createdAt: Date;
    updatedAt: Date;
}