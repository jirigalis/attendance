import { Deserializable } from "./deserializable";

export class ImagePath implements Deserializable {
    id: number;
    path: string;
    review: number;
    createdAt: Date;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}