import jwt from "jsonwebtoken";

export async function generateJwt() {
    return await jwt.sign({user: 'any'}, "secret");
}

export async function velidateJwt(token: string) {
    return await jwt.verify(token, "secret");
}