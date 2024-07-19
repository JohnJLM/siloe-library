import bcrypt from 'bcryptjs';

// Cifrar password
export async function hashPassword(password: string): Promise<string> {
   const saltRounds = 10; // Number of hashing rounds
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
}

// Función para comparar una contraseña con su versión cifrada
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
   return await bcrypt.compare(password, hashedPassword);
}
