import * as moment from "moment";
import { Deserializable } from "./deserializable";

export class Member implements Deserializable {
    id: number;
    name: string;
    surname: string;
    contact: string;
    rc: string;
    attendance?: object;
    application: boolean;
    paid: moment.Moment;
    role: string;

    deserialize(input: any) {
        return Object.assign(this, input);
    }

    getFullName() {
        return this.name + ' ' + this.surname;
    }

    getBirthday(): string {
        let year = Number(this.rc.substring(0, 2));
        let yearStr: string;
        let month = parseInt(this.rc.substring(2,4));
        let dayStr = parseInt(this.rc.substring(4, 6));

        // correct values
        if (year > 50) {
            yearStr = "19" + year;
        } else {
            let tmp = "";
            if (year < 10) {
                tmp = "0";
            }
            yearStr = "20" + tmp + year;
        }

        if (month > 50) {
            month = month - 50;
        }
        
        return "" + dayStr + ". " + month + ". " + yearStr;
    }

    hadBirthdayThisYear(): boolean {
        const birthday = moment(this.getBirthday(), "DD. MM.");
        return moment().isAfter(birthday);
    }

    getAge(): Number {
        const birthday = moment(this.getBirthday(), "DD. MM. YYYY");
        return moment().diff(birthday, "years");
    }

    isWoman(): boolean {
        const month = parseInt(this.rc.substring(2,4));
        return month > 50;
    }
}
