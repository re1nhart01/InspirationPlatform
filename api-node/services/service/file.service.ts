import * as fs from "fs/promises";
import path from "path";


export class FileRepository {

    public static async createFolderForPosts(username: string, postName: string) {
        const basePath = path.join(__dirname, ".." ,"..", "storage", username);
        return await fs.mkdir(path.join(basePath, "posts", postName), { recursive: true });
    }

    public static async addFilesForPost(username: string, postName: string, files: Express.Multer.File[]) {
        try {
            await FileRepository.createFolderForPosts(username, postName);
            const basePath = path.join(__dirname, ".." ,"..", "storage", username);
            for (let i = 0; i < files.length; i++) {
                if (files[i].buffer) {
                    await fs.writeFile(path.join(path.join(basePath, "posts", postName), `${i}.png`), files[i]?.buffer)
                }
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    public static async removePostFolder(username: string, postHash: string) {
        try {
            const postPath = path.join(__dirname, ".." ,"..", "storage", username, "posts", postHash)
            await fs.rm(postPath, { recursive: true, force: true })
            return true;
        } catch (e) {
            return false;
        }
    }

    public static async removeAvatar(username: string) {
        try {
            const postPath = path.join(__dirname, ".." ,"..", "storage", username, "avatar")
            await fs.rm(path.join(postPath, "avatar.png"));
            return true;
        } catch (e) {
            console.log("uploadAvatar", e);
            throw false;
        }
    }

    public static async uploadAvatar(username: string, image: Express.Multer.File) {
        try {
            const postPath = path.join(__dirname, ".." ,"..", "storage", username, "avatar")
            await fs.writeFile(path.join(postPath, "avatar.png"), image.buffer);
        } catch (e) {
            console.log("uploadAvatar", e);
            throw false;
        }
    }
}
