const FilePath = "FilePath.txt";
import fs from "node:fs/promises";
async function CreateFile(content) {
    try {
   await fs.writeFile("FilePath.txt", content, 'utf8');
   console.log("File created successfully");
} catch (error) {
    console.error("Error creating file:", error);
}
}
async function ReadFile(FilePath) {
    try {
   const data = await fs.readFile("FilePath.txt", 'utf8');
      console.log("File read successfully");
    } catch (error) {
        console.error("Error reading file:", error);
    }
}
async function AppendFile(FilePath, content) {
    try {
    await fs.appendFile("FilePath.txt", content, 'utf8');
    console.log("Content appended successfully");
    } catch (error) {
        console.error("Error appending to file:", error);
    }
}
async function DeleteFile(FilePath) {
    try {
        await fs.unlink("FilePath.txt");
        console.log("File deleted successfully");
    } catch (error) {
        console.error("Error deleting file:", error);
    }
}
async function run(){
await CreateFile("Hello World.");
await ReadFile("FilePath.txt");
await AppendFile("FilePath.txt", "Additional content.");
setTimeout(async () => {
await DeleteFile("FilePath.txt");
}, 10000);
}
run();