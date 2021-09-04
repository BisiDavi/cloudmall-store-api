const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

exports.uploadStoreImage = () => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "CLOUDMALL_STORES_IMAGE",
      public_id: (req, file) => {
        console.log("image req", req);
        console.log("image file", file);
        `storeImage-${file}`;
      },
    },
  });

  const upload = multer({ storage: storage });
  return upload;
};
