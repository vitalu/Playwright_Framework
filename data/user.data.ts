export function getUserData() {
    return {
        email: process.env.EMAIL!,
        password: process.env.PASSWORD!,
    }
}