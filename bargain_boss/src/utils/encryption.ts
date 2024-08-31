import 'server-only';

export const encryptionsalt = (password : string, salt : string) : string => {
    password = encryption(password);
    salt = encryption(salt);
    password += salt;
    return encryption(password);
}

export const encryption = (password : string):string => {
    let encrypted: string = "";
    const list = [5,8,9,6];
    for(let i = 0; i < password.length; i++) {
        encrypted += String.fromCharCode(((password.charCodeAt(i) ^ list[i % 4]) + 65) % 123);
    }
    return encrypted;
}

export function generateRandomString(length : number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}