import React,{useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import { createMovie, editMovie } from '../../../api-helpers/api';
import toast from 'react-hot-toast';
import { setInForm } from '../../../libs';

const CreateMovie = () => {
    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [actors, setActors] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [director, setDirector] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = (ev) => {
        ev.preventDefault();

        // console.log("The values in formState are: ",form);
        
        let data = new FormData();

        for (let k in form) {
          data.append(k, form[k])
        }

        data.append('image', image);
        
        let flag = 0;
        const img = data.get('image');
        
        data.forEach((value, key) => {
          console.log(`${key}:${value}`);
          flag++;
        });

        if(flag!=6){
          alert("Don't leave any field empty");
          return;
        }
        console.log("Image is:",img)

        if (!(img instanceof File)) {
          alert("Image is not set");
          return;
      }
  
      const releaseDate = data.get('releaseDate',);

      const [year, month, day] = form.releaseDate.split('-').map(Number);    
          // Month in JavaScript Date object starts from 0 (January) to 11 (December)
          const dateObject = new Date(year, month - 1, day);
          const newDate = dateObject.getTime();
  
          if(newDate < Date.now()){
              alert("Invalid Release Date");
              return;
          }

          const ext = image.name.split('.').pop().toLowerCase()
          const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

          if (image) {
              if (image.size > 10485760) {
                alert("Image size should be less than 10MB.");
                return;
              }
              if(!allowedExtensions.includes(ext)){
                alert('Invalid image format. Please select a JPG, JPEG, PNG, or GIF file.');
                return;
              }
            }
  
          createMovie(data)
              .then((res)=>{
                  navigate("/cms/dashboard");
              })
      }
      const handleClick = ()=>{
          navigate("/cms/dashboard");
      }    

  return (
    <div className='w-dvw h-dvh text-black p-16 mx-12'>
         <div className="w-full rounded-lg bg-slate-700 shadow px-12">
  <div className="space-y-6 p-6 sm:p-8">
    <h1 className="text-center text-xl font-bold leading-tight tracking-tighter text-white md:text-2xl">Create New Movie</h1>
  </div>
  <form className="" onSubmit="">
    <div className="relative mt-4 grid  gap-6">
      <div className="">
        <label className="text-sm font-medium text-white" htmlFor="class"> Movie Name </label>
        <input  required onChange={event => setInForm(event, form, setForm)} name="title" type="text" className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"/>
      </div>

      <div className="col-span-1 sm:col-span-1">
        <label className="block text-sm font-medium text-white" htmlFor="shift"> Actors </label>
        <input required onChange={event => setInForm(event, form, setForm)} name="actors" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="sdate"> Release Date </label>
        <input required  onChange={event => setInForm(event, form, setForm)} name="releaseDate" type="date" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="price"> Director </label>
        <input required onChange={event => setInForm(event, form, setForm)} name="director" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm" />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-white" htmlFor="description"> Description </label>
        <textarea required onChange={event => setInForm(event, form, setForm)} id="description" name="description" type="textarea" rows="6" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 px-4 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring sm:text-sm"></textarea>
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-white"> Image </label>
        <div className="flex justify-center rounded-md border-2 border-white px-6 pb-6 pt-4">
          <div className="space-y-1 text-center">
            <div className="flex items-center justify-center">
              <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="image" className="mx-2 cursor-pointer rounded-md bg-white px-1 font-medium text-[#140044] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                  Upload a file
                  <input required
                 onChange={(ev) => setImage(ev.target.files[0])}
                  id="image" name="image" type="file" className="sr-only" />
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
      <button onClick={handleClick} type="submit" className="mb-6 w-full rounded-lg bg-[#be123c] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none">Back</button>
      <button onClick={handleSubmit} type="submit" className="mb-6 w-full rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-[#140044]/90 focus:outline-none">Create</button>
    </div>
  </form>
</div>
    </div>
  )
}

export default CreateMovie