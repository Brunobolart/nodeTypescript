import { hash, genSalt, compare } from 'bcryptjs';


const salt_randoms = 8;

const hashPassword = async (password: string) => {
    const saltGenerated = await genSalt(salt_randoms);
    return await hash(password, saltGenerated);
}

const verityPassword = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
}

export const PasswordCrypto = {
    hashPassword,
    verityPassword
};