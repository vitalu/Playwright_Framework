import { expect, request, test } from "@playwright/test";

let token: string;
let bookingId: number;

test.describe.serial("Booker CRUD operations", () => {
  test.beforeAll("Get token", async ({ request }) => {
    const response = await request.post(
      "https://restful-booker.herokuapp.com/auth",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: "admin",
          password: "password123",
        },
      },
    );
    await expect(response).toBeOK();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    token = responseBody.token;
    console.log("The token: ", token);
  });

  test("Create Booking", async ({ request }) => {
    const response = await request.post(
      "https://restful-booker.herokuapp.com/booking",
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          firstname: "Jhon",
          lastname: "Hunter",
          totalprice: 125,
          depositpaid: true,
          bookingdates: {
            checkin: "2026-06-23",
            checkout: "2016-06-25",
          },
          additionalneeds: "Lunch",
        },
      },
    );
    await expect(response).toBeOK();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    bookingId = responseBody.bookingid;
    console.log("The booking ID: ", bookingId);
  });

  test("Get Booking details", async ({ request }) => {
    const getResponse = await request.get(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
    );
    await expect(getResponse).toBeOK();
    const responseBody = await getResponse.json();
    console.log(responseBody);
  });

  test("Update Booking details", async ({ request }) => {
    const updateResponse = await request.put(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        data: {
          firstname: "Jhon",
          lastname: "Hunter",
          totalprice: 260,
          depositpaid: true,
          bookingdates: {
            checkin: "2026-06-23",
            checkout: "2016-06-25",
          },
          additionalneeds: "Dinner",
        },
      },
    );
    await expect(updateResponse).toBeOK();
    const responseBody = await updateResponse.json();
    console.log("Updated booking details: ", responseBody);
  });

  test("Delete Booking", async ({ request }) => {
    const deleteResponse = await request.delete(
      `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );
    await expect(deleteResponse).toBeOK();
  });
});
