import { Deserializable } from "./deserializable";

export class MeetingDate implements Deserializable {
    id: number;
    date: any;
    description: string;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}