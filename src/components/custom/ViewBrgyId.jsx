import { useParams } from "react-router-dom";

const ViewBrgyId = () => {
  const { image_src } = useParams();
  const decodedUrl = decodeURIComponent(image_src);
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <img src={decodedUrl} className="w-full h-full object-contain" />
    </div>
  );
};

export default ViewBrgyId;