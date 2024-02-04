import { Deserializable } from "./deserializable";

export class Category implements Deserializable {
    id: number;
    name: string;
    parent: number;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}