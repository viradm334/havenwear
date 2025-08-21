'use client'

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function PasswordInput({name, value, showPassword = false, onChange, onClick}){
    return(<div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          className="w-full pr-10 outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:font-normal focus:outline-emerald-600"
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          onClick={onClick}
          className="absolute right-2 top-5 -translate-y-1/2 text-gray-300 hover:text-gray-500"
        >
          {showPassword ? (
            <EyeSlashIcon className="size-5" />
          ) : (
            <EyeIcon className="size-5" />
          )}
        </button>
      </div>)
    
}