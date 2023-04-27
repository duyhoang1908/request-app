import React, { useEffect, useState } from "react";
import MainLayout from "../../Layout/MainLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserById, updateAvatar } from "../../apis/request.api";
import { useAuthContext } from "../../context/AuthContext";
import avatar from "../../assets/image/avatar.webp";

const Profile = () => {
  const { id } = useParams();
  const [fileImage, setFileImage] = useState(null);
  const [imgPreview, setImgPreview] = useState<any>(null);

  const { user } = useAuthContext();

  useEffect(() => {
    return () => {
      fileImage && URL.revokeObjectURL(fileImage);
    };
  }, [fileImage]);

  const handleSetImg = (e: any) => {
    const file = e.target.files[0];
    setFileImage(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const { data } = useQuery({
    queryKey: [`profile/${id}`],
    queryFn: () => getUserById(id as string),
    enabled: id !== undefined,
  });

  const handleUpdate = useMutation({
    mutationFn: () => {
      return updateAvatar(fileImage, user?._id as string);
    },
  });

  return (
    <MainLayout>
      <div className="flex items-center gap-5">
        <img
          className="w-32 h-32 rounded-full object-cover"
          src={imgPreview || user?.avatar || avatar}
          alt="avatar"
        />
        <h3 className="text-xl font-bold uppercase">{user?.username}</h3>
      </div>
      <div className="mt-4">
        <input
          type="file"
          id="avatarFile"
          className="hidden"
          onChange={handleSetImg}
        />

        {imgPreview && (
          <button
            onClick={() => {
              console.log(fileImage);
              handleUpdate.mutate();
            }}
            className="flex w-32 text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
          >
            <p className="m-auto">Xác nhận</p>
          </button>
        )}

        {!imgPreview && (
          <label
            htmlFor="avatarFile"
            className="flex w-32 text-white bg-blue-700 hover:bg-blue-800 hover:cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none"
          >
            <p className="m-auto">Đổi avatar</p>
          </label>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
