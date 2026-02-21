import bcrypt from "bcryptjs";

const newPassword = "NewPassword123"; // change password here

async function generate() {
  const hash = await bcrypt.hash(newPassword, 10);
  console.log("\nGenerated Hash:\n");
  console.log(hash);
}

generate();
