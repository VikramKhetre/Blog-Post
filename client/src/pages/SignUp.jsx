import { Link } from "react-router-dom";
import { Label, Navbar, TextInput, Button } from "flowbite-react";

export default function SignUP() {
  return (
    <div className="min-h-s m-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500">
              Blog
            </span>
            Post
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            natus aut impedit quos autem, tempora debitis eaque, at ducimus
            nulla quasi facere.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="username" id="username" />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput type="text" placeholder="password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink">SignUP</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/signin" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
