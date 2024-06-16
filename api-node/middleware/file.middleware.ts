import multer from "multer"
import { Request } from "express";

const storage = multer.memoryStorage();


const imageFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept images only
    if (!file.mimetype.match(/^image\//)) {
        return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
};


export const uploadFileMiddleware = multer({
    storage: storage,
    fileFilter: imageFileFilter
});
