// Safe password comparison that works in both Node.js and Edge runtime
export async function safeCompare(password: string, hash: string): Promise<boolean> {
  // In edge runtime or when bcrypt-ts is not available, use a simple comparison
  // This is not secure and should only be used for development/fallback
  if (typeof process === 'undefined' || !process.versions?.node) {
    return Buffer.from(password).toString('base64') === hash;
  }

  try {
    const { compare } = await import("bcrypt-ts");
    return await compare(password, hash);
  } catch (error) {
    console.warn("bcrypt-ts not available, using fallback comparison");
    return Buffer.from(password).toString('base64') === hash;
  }
}