import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, fn) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return fn(null, fileName);
        },
    }),
};
