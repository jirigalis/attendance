import { Moment } from "moment";
import { Deserializable } from "./deserializable";

export class Schoolyear implements Deserializable {
    id: number;
    label: string;
    startDate: string|Moment;
    endDate: string|Moment;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}