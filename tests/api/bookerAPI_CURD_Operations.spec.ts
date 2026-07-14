import { expect, request, test } from "@playwright/test";

const baseUrl = "https://restful-booker.herokuapp.com";
let token: string;
let bookingId: number;

test.describe.serial("Booker CRUD operations", () => {
  // Test setup: obtain an authentication token used for protected endpoints
  test.beforeAll("Get token", async ({ request }) => {
    const response = await request.post(
      `${baseUrl}/auth`,
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

  // Create Booking: POST a new booking and store the returned bookingId
  test("Create Booking", async ({ request }) => {
    const response = await request.post(
      `${baseUrl}/booking`,
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

  // Get Booking details: GET the booking by id and verify the response
  test("Get Booking details", async ({ request }) => {
    const getResponse = await request.get(
      `${baseUrl}/booking/${bookingId}`,
    );
    await expect(getResponse).toBeOK();
    const responseBody = await getResponse.json();
    console.log(responseBody);
  });

  // Update Booking details: PUT updated booking data using authentication
  test("Update Booking details", async ({ request }) => {
    const updateResponse = await request.put(
      `${baseUrl}/booking/${bookingId}`,
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

  // Delete Booking: DELETE the booking using the token to clean up
  test("Delete Booking", async ({ request }) => {
    const deleteResponse = await request.delete(
      `${baseUrl}/booking/${bookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      },
    );
    await expect(deleteResponse).toBeOK();
  });
});
