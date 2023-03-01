import {
  Avatar,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/components/layout";
import {
  logout,
  auth,
  getSingleUserData,
  storage,
  uploadImageUpdate,
} from "@/firebase";
import { Input } from "@material-tailwind/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { TeamCard } from "@/components/cards";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export function Profile() {
  const [user] = useAuthState(auth);
  const [imgUrl, setImgUrl] = useState(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const logOut = (e) => {
    navigate("/");
    logout();
  };

  useEffect(() => {
    if (user) {
      getSingleUserData(user.uid).then((user) => setData(user));
    }
  }, [user, imgUrl]);

  const uploadFile = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];
    console.log("happening", file);
    if (!file) {
      alert("Upload a File");
      return;
    }
    const storageRef = ref(storage, `files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadImageUpdate(user.uid, downloadURL);
          setImgUrl(downloadURL);
        });
      }
    );
  };
  if (!user) {
    return (
      <>
        <section className="relative block h-[70vh]">
          <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
        </section>
        <section className="relative bg-blue-gray-50/50 py-16 px-4">
          <div className="container mx-auto">
            <div className="relative my-4 mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white p-6 text-center shadow-xl shadow-gray-500/5">
              <Typography variant="h2" color="blue-gray" className="mb-2">
                Please Login to view this Page
              </Typography>
            </div>
          </div>
        </section>
        <div className="bg-blue-gray-50/50">
          <Footer />
        </div>
      </>
    );
  }

  const object = getSingleUserData(user.uid);
  console.log(object);

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-8 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                  <div className="relative">
                    <div className="-mt-20 w-40">
                      <Avatar
                        src="/img/team-2.jpg"
                        alt="Profile picture"
                        variant="circular"
                        className="h-full w-full shadow-xl"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                  <form onSubmit={uploadFile}>
                    <Input
                      label="Input With Icon"
                      className=""
                      type="file"
                      icon={<i className="fas fa-heart" />}
                    />
                    <div className="mt-2">
                      <Button className="mx-4 bg-blue-400" type="submit">
                        Upload
                      </Button>

                      <Button className="bg-blue-400" onClick={logOut}>
                        Log Out
                      </Button>
                      {imgUrl ? <></> : <>
                      <div className="outerbar">
                        <div
                          className="innerbar"
                          style={{ width: `${progressPercent}%` }}
                        >

                          {progressPercent === 0 ? <></>: <>{progressPercent}%</>}
                        </div>
                      </div>
                    </>  }
                    </div>
                    
                  </form>
                </div>
                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        22
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Friends
                      </Typography>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        10
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Photos
                      </Typography>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <Typography
                        variant="lead"
                        color="blue-gray"
                        className="font-bold uppercase"
                      >
                        89
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        Comments
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4 text-center">
                <Typography variant="h2" color="blue-gray" className="mb-2">
                  {user.displayName}
                </Typography>
                <div className="mb-16 flex items-center justify-center gap-2">
                  <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    {user.emailVerified ? (
                      <>Verified Email</>
                    ) : (
                      <>Email not Verified</>
                    )}
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    Web Development & Photography
                  </Typography>
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                  <Typography className="font-medium text-blue-gray-700">
                    University of Computer Science
                  </Typography>
                </div>
              </div>
              <div className="border-t border-blue-gray-50 py-6 text-center">
                <div className="mt-2 flex flex-wrap justify-center">
                  <div className="flex w-full flex-col items-center px-4 lg:w-9/12">
                    <Typography className="mb-4 font-normal text-blue-gray-500">
                      An artist of considerable range, Jenna the name taken by
                      Melbourne-raised, Brooklyn-based Nick Murphy writes,
                      performs and records all of his own music, giving it a
                      warm, intimate feel with a solid groove structure. An
                      artist of considerable range. Dynamic Description
                    </Typography>
                    <Button variant="text">All Posts</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 pb-48">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 gap-x-8 md:grid-cols-2 xl:grid-cols-4">
            {data?.imageData?.map(({ id, url }) => (
              <TeamCard key={id} img={url} />
            ))}
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
