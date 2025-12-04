import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryStorageConfig = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: 'products', // <- This is valid now (inside async function)
      resource_type: 'image',
      format: 'jpg', // or file.originalname.split('.').pop()
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});
