import { memoryStorage } from 'multer';

export const multerConfig = {
  storage: memoryStorage(),
};

export const multerOptions = {
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};
