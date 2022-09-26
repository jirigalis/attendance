import { Deserializable } from "./deserializable";

export class Reason implements Deserializable {
    id: number;
    name: string;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}