import React, { useState } from "react";

const RegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#1e2a38] p-8 rounded-lg w-[350px] shadow-xl">
      <div className="bg-cyan-400 text-center py-2 rounded-t-md text-white font-bold -mt-10 mb-4">
        SIGN UP
      </div>
      <div className="flex justify-center mb-6">
        <div className="bg-gray-600 rounded-full p-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9.958 9.958 0 0112 15c2.137 0 4.107.66 5.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-cyan-400 text-white font-bold rounded mt-4"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
