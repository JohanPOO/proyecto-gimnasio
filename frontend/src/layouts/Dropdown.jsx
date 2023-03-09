import { useState } from "react"
import { Link } from "react-router-dom"

const Dropdown = () => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="inline-flex ">

            <div className="relative">
                <button
                    type="button"
                    className="inline-flex items-center justify-center h-full px-2 text-white  hover:text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="text-lg text-white mr-1">
                        Mi Cuenta
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>

                {isOpen &&
                    <div className="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
                        <div className="p-2">
                            <a
                                href={"/login-cliente"}
                                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                            >
                                Login Cliente
                            </a>
                            <a
                                href={"/login-gestion"}
                                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                            >
                                Login Gestión
                            </a>
                        </div>
                    </div>
                }


            </div>
        </div>
    )
}

export default Dropdown