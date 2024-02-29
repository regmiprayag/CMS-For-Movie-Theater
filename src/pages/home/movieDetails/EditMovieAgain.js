import React, { useEffect, useState } from "react";
import { editMovie, getMovieById } from "../../../api-helpers/api";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setInForm } from "../../../libs";

const EditMovie = () => {
  const location = useLocation();
  const [dataFound, setDataFound] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const [form, setForm] = useState({});

  const [image, setImage] = useState(null);
  const [popup, setPopup] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [actors, setActors] = useState(null);
  const [releaseDate, setReleaseDate] = useState(null);
  const [director, setDirector] = useState(null);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    // console.log("the movie id is: ",location.state.id);
    getMovieById(id)
      .then((res) => {
        const data = res.movies;
        // console.log("Bharkharai k aairako xata: ",res);
        // return;
        const releaseDate = data.releaseDate.split("T");
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

  // console.log("Yo ho movie detail: ",form);

 const handleOpen = ()=>{
  setPopup(true);
  console.log("this is popup of open: ",popup);
 }

  const handleSubmit = async (id) => {
    // console.log("KK data raixa herdim na: ", form);
    const data = {
      title: form.title,
      image: image,
      actors: form.actors,
      director: form.director,
      description: form.description,
      releaseDate: form.releaseDate,
    };
    console.log("The form datas are: ", data);
    editMovie(id, data);
  };

  // console.log("Hello Nepal",image);
  const handleClose = ()=>{
    console.log("hello prayag");
    setPopup(false);
  }

  return (
    <div className="bg-gray-200 p-4 mx-auto my-12">
      
      {/* { popup && 
        <div className="bg-blue-400 p-4">
            <button type="" onClick={()=>{handleClose()}} className="bg-red-400">Close Now</button>
            <button type="" onClick={()=>{handleSubmit(id)}} className="bg-red-400 m-4">Confirm</button>
              <button
                onClick={handleClose}
                className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
              >
                Close
              </button>
        </div>
      } */}
      {/* { popup && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-[#85C3CB] p-8 rounded-lg">
          <p class=" text-sm font-bold text-[#140044]">
            Are you sure you want to delete this class?
          </p>
          <div class="mt-4 flex justify-center gap-2">
            <button
              // onClick={confirmDelete}
              class="mb-4 w-full rounded-lg bg-[#140044] px-6 py-2.5 text-center text-sm font-medium text-[#85C3CB] hover:bg-[#140044]/90 focus:outline-none"
            >
              Yes
            </button>
            <button
              // onClick={cancelDelete}
              class="mb-4 w-full rounded-lg bg-[#140044] px-6 py-2.5 text-center text-sm font-medium text-[#85C3CB] hover:bg-[#140044]/90 focus:outline-none"
            >
              No
            </button>
          </div>
        </div>
      </div>
      )
      } */}

      {dataFound && (
      <div className="">
          <form className="" onSubmit="">
            <div className="relative mt-4 grid  gap-6">
              <div className="">
                <label
                  className="text-sm font-medium text-black"
                  htmlFor="class"
                >
                  Movie Name
                </label>
                <input
                  required
                  onChange={(event) => setInForm(event, form, setForm)}
                  name="title"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  defaultValue={form.title}
                />
              </div>

              <div className="col-span-1 sm:col-span-1">
                <label
                  className="block text-sm font-medium text-black"
                  htmlFor="shift"
                >
              
                  Actors
                </label>
                <input
                  required
                  onChange={(event) => setInForm(event, form, setForm)}
                  name="actors"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  defaultValue={form.actors}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-black"
                  htmlFor="sdate"
                >
                  Release Date
                </label>
                <input
                  required
                  onChange={(event) => setInForm(event, form, setForm)}
                  name="releaseDate"
                  type="date"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  defaultValue={form.releaseDate}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-black"
                  htmlFor="price"
                >
                  Director
                </label>
                <input
                  required
                  onChange={(event) => setInForm(event, form, setForm)}
                  name="director"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  defaultValue={form.director}
                />
              </div>

              <div className="col-span-2">
                <label
                  className="block text-sm font-medium text-black"
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"
                  defaultValue={form.description}
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-black">
                  
                  Image
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
                            defaultValue={image}
                            // {image}
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
                //    onClick={handleClick}
                type="submit"
                className="mb-6 w-full rounded-lg bg-[#be123c] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
              >
                Back
              </button>
              <button
                onClick={() => handleOpen()}
                type="submit"
                className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none"
              >
                Update
              </button>
            </div>
          </form>
      </div>
        )}
    </div>
  );
};

export default EditMovie;
