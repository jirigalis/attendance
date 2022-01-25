import { Deserializable } from "./deserializable";

export class Points implements Deserializable {
    id: number;
    points: string;
    member_id: number;
    reason_id: number;
    created_at: string;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}