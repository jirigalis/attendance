import { Deserializable } from "./deserializable";

export class Badge implements Deserializable {
    id: number;
    name: string;
    logo: string;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}