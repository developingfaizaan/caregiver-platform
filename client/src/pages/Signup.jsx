import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FileBase from "react-file-base64";

import { Input, Button, Error, Select } from "../components";
import { formImg } from "../assets";
import { useAuth } from "../context/auth";

// TODO: Add Validation
const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", role: "family", password: "", cardId: "", profilePhoto: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <main className="flex">
      <section className="flex-1 w-full max-w-2xl m-auto px-5 md:px-12 sm:px-32 py-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-8 sm:mb-2">Create an account!</h1>
        {error && <Error message={error} />}

        <p className="text-center my-10">
          Already have an account?
          <Link to="/login" className="text-blue-400 font-medium">
            &nbsp;Log into your account
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <Input label="Name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Select label="Profile Type" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value.toLowerCase() })} items={["Caregiver", "Family", "Agency"]} />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Input label="ID from government-issued card" type="text" value={form.cardId} onChange={(e) => setForm({ ...form, cardId: e.target.value })} />
          <div className="my-7">
            <label className="block mb-2 text-white700 text-md">Image for Profile Photo</label>
            <div className="py-3 px-5 font-poppins text-gray900 bg-white border-2 border-white200 rounded-[4px] outline-none focus:outline-primary ease-out duration-200 w-full placeholder:normal placeholder:text-white400">
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setForm({ ...form, profilePhoto: base64 })} />
            </div>
          </div>
          <Button type="submit">Create an account</Button>
        </form>
      </section>

      <img src={formImg} className="hidden lg:block" alt="bg" />
    </main>
  );
};

export default Signup;
