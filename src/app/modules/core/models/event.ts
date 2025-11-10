import { Moment } from "moment";
import { Deserializable } from "./deserializable";

export class Event implements Deserializable {
    id: number;
    name: string;
    startDate: Moment;
    endDate: Moment;
    description: string;
    members?: any;
    openRegistration: 0 | 1;

    deserialize(input: any) {
        return Object.assign(this, input);
    }
}