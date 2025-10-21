// Conditional import for bcrypt-ts to avoid edge runtime issues
let genSaltSync: any, hashSync: any;

if (typeof window === 'undefined' && typeof process !== 'undefined') {
  try {
    const bcrypt = require("bcrypt-ts");
    genSaltSync = bcrypt.genSaltSync;
    hashSync = bcrypt.hashSync;
  } catch (error) {
    console.warn("bcrypt-ts not available, using fallback");
  }
}

export function generateHashedPassword(password: string) {
  if (!genSaltSync || !hashSync) {
    // Fallback for edge runtime - simple hash (not secure, for development only)
    return Buffer.from(password).toString('base64');
  }
  
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return hash;
}

export function generateDummyPassword() {
  // Use a static password instead of generateId to avoid circular dependencies
  const password = "dummy-password-" + Date.now().toString(36);
  const hashedPassword = generateHashedPassword(password);
  return hashedPassword;
}
