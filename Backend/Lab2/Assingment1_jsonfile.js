import fs from "node:fs/promises";

const filePath = "userdata.json";

async function createFile(data) {
    const jsonData = JSON.stringify(data, null, 2)
    await fs.writeFile(filePath, jsonData, "utf-8");
    console.log("JSON file created successfully");
}
async function readFile() {
    const content = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(content);
    console.log("File data:", data);
}
async function deleteFile() {
    await fs.unlink(filePath);
    console.log("JSON file deleted successfully");
}
async function main() {
    const userData = {
        name: "Abhinav",
        age: 20,
        course: "BTech"
    };
    await createFile(userData);

    await readFile();

    await deleteFile();
}

main();