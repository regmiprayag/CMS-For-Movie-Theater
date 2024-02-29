import React, { useEffect, useState } from "react";
import { editMovie, getMovieById } from "../../../api-helpers/api";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { setInForm } from "../../../libs";

const EditMovie = () => {
  const location = useLocation();
  const [dataFound, setDataFound] = useState(false);
  const [form, setForm] = useState({});

  const [image, setImage] = useState('');
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    getMovieById(id)
      .then((res) => {
        const data = res.movies;
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

    const handleSubmit = (ev)=>{
      console.log("The form datas are: ",id);
    }

    const handleCancel = ()=>{
      navigate("/cms/movies");
    }

    const handleOpen = (ev)=>{
      ev.preventDefault()
      setPopup(true);
    }
    const handleClose = ()=>{
      setPopup(false);
    }

    const confirmEdit = (ev)=>{
      ev.preventDefault()
      const data = {
        title: form.title,
        image: image,
        actors: form.actors,
        director: form.director,
        description: form.description,
        releaseDate: form.releaseDate,
      };
      console.log("The form datas are: ", data);
      editMovie(id, data)
        .then((res)=>{
          navigate("/cms/movies");
        })   
    }
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
                  type="submit" className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none">
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
