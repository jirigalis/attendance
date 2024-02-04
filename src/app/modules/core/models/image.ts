import { Deserializable } from "./deserializable";

export class ImagePath implements Deserializable {
    id: number;
    path: string;
    review: number;
    createdAt: Date;
    updatedAt: Date;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}

export class Image implements Deserializable {
    id: number;
    name: string;
    path: ImagePath[];
    category: number;
    createdAt: Date;
    updatedAt: Date;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}