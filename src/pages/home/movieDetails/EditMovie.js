import React, { useEffect, useState } from "react";
import { editMovie, getMovieById } from "../../../api-helpers/api";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setInForm } from "../../../libs";
import { Toast, toast } from "react-hot-toast";

const EditMovie = () => {
  const location = useLocation();
  const [dataFound, setDataFound] = useState(false);
  const [form, setForm] = useState({});

  const [image, setImage] = useState("");
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    getMovieById(id)
      .then((res) => {
        const data = res.movies;
        const releaseDate = data.releaseDate.split("T");
        
        // console.log("All the movies are: ",res.movies);
        // console.log(res);

        setForm({
          title: data.title,
          actors: data.actors,
          description: data.description,
          releaseDate: releaseDate[0],
          director: data.director,
        });

        if (data.posterUrl) {
          setImage(data.posterUrl);
        }
        setDataFound(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (ev) => {
    console.log("The form datas are: ", id);
  };
  
  const handleCancel = () => {
    navigate("/cms/movies");
  };

  const handleOpen = (ev) => {
    ev.preventDefault();
    setPopup(true);
  };
  const handleClose = () => {
    setPopup(false);
  };

  const confirmEdit = (ev) => {
    ev.preventDefault();
    let data = new FormData();

    for (let k in form) {
      data.append(k, form[k])
    }
    
    if(data.get('title')=="" || data.get('actors')=="" || data.get('description')=="" || data.get('director')==""){
      alert("Fields are empty");
      navigate(`/cms/movie/editMovie/${id}`);
      return;
    }
    
    data.append('image',image);
     data.forEach((value, key) => {
      console.log(`${key}:${value}`);
    });

    const img = data.get("image");

    console.log("The image is: ",img);

    const releaseDate = data.get('releaseDate',);
    const [year, month, day] = form.releaseDate.split('-').map(Number);    
    // Month in JavaScript Date object starts from 0 (January) to 11 (December)
    const dateObject = new Date(year, month - 1, day);
    const newDate = dateObject.getTime();

    if(newDate < Date.now()){
        alert("Invalid Release Date");
        return;
    }

      
          

          // // console.log("Image of image value ",img)
          // const ext = image.split('.').pop().toLowerCase()
          // const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

          // if (image) {
          //     if (image.size > 10485760) {
          //       alert("Image size should be less than 10MB.");
          //       return;
          //     }
          //     if(!allowedExtensions.includes(ext)){
          //       alert('Invalid image format. Please select a JPG, JPEG, PNG, or GIF file.');
          //       return;
          //     }
          //   }
    // data.append('image',image.name);
    //  data.forEach((value, key) => {
    //   console.log(`${key}:${value}`);
    // });
    // return;

    editMovie(id, data).then((res) => {
      console.log("The resData in frontend is: ", res);
      navigate("/cms/movies");
    });
  };
  return (
    <div className="w-dvw h-dvh text-black p-16 mx-12">
      <div className="w-full rounded-lg bg-slate-700 shadow px-12">
        <div className="space-y-6 p-6 sm:p-8">
          <h1 className="text-center text-xl font-bold leading-tight tracking-tighter text-white md:text-2xl">
            Edit Movie
          </h1>
        </div>
        {dataFound && (
          <div>
            <form className="">
              <div className="relative mt-4 grid  gap-6">
                <div className="">
                  <label
                    className="text-sm font-medium text-white"
                    htmlFor="class"
                  >
                    Movie Name
                  </label>
                  <input
                    required
                    onChange={(event) => setInForm(event, form, setForm)}
                    name="title"
                    type="text"
                    defaultValue={form.title}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  />
                </div>
                <div className="col-span-1 sm:col-span-1">
                  <label
                    className="block text-sm font-medium text-white"
                    htmlFor="shift"
                  >
                    Actors
                  </label>
                  <input
                    required
                    onChange={(event) => setInForm(event, form, setForm)}
                    name="actors"
                    type="text"
                    defaultValue={form.actors}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-white"
                    htmlFor="sdate"
                  >
                    Release Date
                  </label>
                  <input
                    required
                    onChange={(event) => setInForm(event, form, setForm)}
                    name="releaseDate"
                    type="date"
                    defaultValue={form.releaseDate}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-white"
                    htmlFor="price"
                  >
                    Director
                  </label>
                  <input
                    required
                    onChange={(event) => setInForm(event, form, setForm)}
                    name="director"
                    type="text"
                    defaultValue={form.director}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium text-white"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    required
                    onChange={(event) => setInForm(event, form, setForm)}
                    id="description"
                    name="description"
                    type="textarea"
                    rows="6"
                    defaultValue={form.description}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  ></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-white">
                    {" "}
                    Image{" "}
                  </label>
                  <div className="flex justify-center rounded-md border-2 border-white px-6 pb-6 pt-4">
                    <div className="space-y-1 text-center">
                      <div className="flex items-center justify-center">
                        <svg
                          className="mx-auto h-12 w-12 text-white"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="image"
                            className="mx-2 cursor-pointer rounded-md bg-white px-1 font-medium text-[#140044] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                          >
                            Upload a file
                            <input
                              required
                              onChange={(event) => {
                                const files = event.target.files;
                                if (files && files.length > 0) {
                                  setImage(files[0]);
                                }
                              }}
                              id="image"
                              name="image"
                              type="file"
                              className="sr-only"
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <p className="pl-1 text-black">or drag and drop</p>
                        <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-6 p-6 px-6 sm:grid-cols-2">
                <button
                  onClick={handleCancel}
                  type="submit"
                  className="mb-6 w-full rounded-lg bg-[#be123c] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  //  onClick={handleSubmit}
                  onClick={handleOpen}
                  type="submit"
                  className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}

        {popup && (
          <div class="fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50">
            <div class="bg-slate-400 p-8 rounded-lg">
              <p class=" text-sm font-bold text-black">
                Are you sure you want to edit this movie?
              </p>
              <div class="mt-4 flex justify-center gap-2">
                <button
                  onClick={confirmEdit}
                  class="mb-4 w-full rounded-lg bg-blue-800 px-6 py-2.5 text-center text-sm font-medium text-[#85C3CB] hover:bg-[#140044]/90 focus:outline-none"
                >
                  Yes
                </button>
                <button
                  onClick={handleClose}
                  class="mb-4 w-full rounded-lg bg-red-800 px-6 py-2.5 text-center text-sm font-medium text-[#85C3CB] hover:bg-[#140044]/90 focus:outline-none"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMovie;
