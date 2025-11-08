import supabase from "@/config/supabase.client";

interface IUploadFile {
  file: Express.Multer.File;
  userId?: string;
}

export const UploadFile = async ({ file, userId }: IUploadFile) => {
  const { originalname, mimetype, buffer } = file;
  const newFileName = `${Date.now()}_${originalname}`;
  const { data, error } = await supabase.storage
    .from("docs")
    .upload(`${userId}/${newFileName}`, buffer, {
      contentType: mimetype,
      upsert: false,
    });
  if (error) throw error;
  const filePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/docs/${data?.path}`;

  return {
    filePath,
    fileName: originalname,
  };
};
