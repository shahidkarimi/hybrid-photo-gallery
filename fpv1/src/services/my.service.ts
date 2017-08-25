import {Injectable} from "angular2/core";

@Injectable()
export class MyService {
    private myValue;

    constructor() {}

    setValue(val) {
        this.myValue = val;
    }

    getValue(val) {
    }
}