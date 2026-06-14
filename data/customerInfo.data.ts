import { CustomerInfo } from "./createUser.type";
import { faker } from "@faker-js/faker";

export function createFakeCustomerData(): CustomerInfo{
    return{
            title: 'Mr.',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    emailAddress: faker.internet.email(),
    password: 'Qwerty@1',
    date: faker.date.birthdate().getDate().toString(),
    month: (faker.date.birthdate().getMonth() + 1).toString(),
    year: faker.date.birthdate().getFullYear().toString(),
    }
}