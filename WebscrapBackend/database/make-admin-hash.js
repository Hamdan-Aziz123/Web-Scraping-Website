// One-time helper: turns a password you type into the bcrypt hash your app
// expects in the users.PasswordHash column. Run this locally on your own
// machine — nothing here is sent over the network, only printed to your
// own Terminal.
//
// Usage (from the WebscrapBackend folder):
//   node database/make-admin-hash.js

const bcrypt = require("bcryptjs");

// Fallback for non-interactive environments only (e.g. automated testing):
// read all piped input up front and answer questions from it in order, since
// creating a fresh readline reader per question loses buffered input.
let fallbackLines = null;
let fallbackIndex = 0;
function readAllStdinLines() {
  return new Promise((resolve) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data.split("\n")));
  });
}

function askHiddenPassword(promptText) {
  return new Promise(async (resolve) => {
    if (!process.stdin.isTTY) {
      // Fallback for non-interactive environments (input will be visible).
      if (!fallbackLines) fallbackLines = await readAllStdinLines();
      process.stdout.write(promptText);
      const line = fallbackLines[fallbackIndex] || "";
      fallbackIndex += 1;
      process.stdout.write(line + "\n");
      resolve(line);
      return;
    }

    process.stdout.write(promptText);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    let input = "";
    const onData = (char) => {
      char = char.toString();
      if (char === "\n" || char === "\r" || char === "\u0004") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeListener("data", onData);
        process.stdout.write("\n");
        resolve(input);
      } else if (char === "\u0003") {
        // Ctrl+C
        process.stdout.write("\n");
        process.exit(1);
      } else if (char === "\u007f" || char === "\b") {
        // Backspace
        if (input.length > 0) {
          input = input.slice(0, -1);
          process.stdout.write("\b \b");
        }
      } else {
        input += char;
        process.stdout.write("*");
      }
    };

    process.stdin.on("data", onData);
  });
}

(async () => {
  const password = await askHiddenPassword("Choose your new admin password (typing is hidden): ");
  const confirm = await askHiddenPassword("Type it again to confirm: ");

  if (password !== confirm) {
    console.log("\n❌ Passwords did not match. Run the script again.");
    process.exit(1);
  }
  if (password.length < 8) {
    console.log("\n❌ Please choose at least 8 characters. Run the script again.");
    process.exit(1);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  console.log("\n✅ Done. Here is your PasswordHash — copy the whole thing:\n");
  console.log(hash);
  console.log("\n(Your actual password was never printed, stored, or sent anywhere.)");
  process.exit(0);
})();
