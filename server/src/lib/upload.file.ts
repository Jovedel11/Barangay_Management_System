import supabase from "@/config/supabase.client";

interface IUploadFile {
  file: Express.Multer.File;
  userId?: string;
}

export const UploadFile = async ({ file, userId }: IUploadFile) => {
  const { originalname, mimetype, buffer } = file;
  const isImage = mimetype.startsWith("image/");
  const bucket = isImage ? "payment" : "docs";
  console.log("Is image :", isImage);
  console.log("Bucket name :", bucket);
  const newFileName = `${Date.now()}_${originalname}`;
  
  // Upload file to Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${userId}/${newFileName}`, buffer, {
      contentType: mimetype,
      upsert: false,
    });
  console.log("UploadFile data:", data);
  console.log("UploadFile error:", error);
  if (error) throw error;

  // Construct public file URL
  const filePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;

  return {
    bucket,
    filePath,
    fileName: originalname,
  };
};
