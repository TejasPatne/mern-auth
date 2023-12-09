import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleFileUpload = (image) => {
    const storage = getStorage(app); 
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => setFormData({...formData, profilePicture: downloadURL})
        )
      }
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  }

  const handleDelete = async (e) => {
    try{
      dispatch(deleteUserStart());
      const data = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      if(data.success === false){
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  useEffect(() => {
    if(image){
      handleFileUpload(image);
    }
  }, [image]);
  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()} src={formData.profilePicture || currentUser.profilePicture} alt="profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" />
        <p className="text-sm self-center">
          {
            imageError ? 
            <span className="text-red-700">Error Uploading Image (file size must be less that 2 MB)</span> :
            (imagePercent > 0 && imagePercent < 100) ? 
            <span className="text-slate-700">{`Uploading ${imagePercent}%`}</span> :
            (imagePercent === 100) ?
            <span className="text-green-700">Image uploaded successfully</span> :
            ''
          }
        </p>
        <input defaultValue={currentUser.username} type="text" placeholder="Username" id="username" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <input defaultValue={currentUser.email} type="email" placeholder="Email" id="email" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 rounded-lg p-3" onChange={handleChange}/>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading? 'Loading...': 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-green-700 mt-5">{updateSuccess && "Profile updated successfully!"}</p>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
    </div>
  )
}
