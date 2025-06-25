const uploadToCloudinary = (fileBuffer, folder, resource_type = "auto") => {
  const cloudinary = require("../config/cloudinary");

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
