import { Title } from "@angular/platform-browser";
import { Skill } from "./skill";

export interface Job {
    title : string,
    company : string,
    description : string,
    location : string,
    salaryRange : string,
    skills :  Skill[]
}
