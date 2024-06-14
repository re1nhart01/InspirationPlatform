import bcrypt from "bcrypt"

export const hashPassword = async (plainPassword: string, saltRounds = 10) => {
    return await bcrypt.hash(plainPassword, saltRounds)
}

export const comparePassword = async (plainPassword: string, hashedPassword: string) => {
    return bcrypt.compare(plainPassword, hashedPassword)
}
