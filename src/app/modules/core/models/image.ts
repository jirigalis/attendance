import { Deserializable } from "./deserializable";
import { ImagePath } from "./image-path";

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