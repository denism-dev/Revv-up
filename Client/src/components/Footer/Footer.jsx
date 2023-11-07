import { NavLink } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-blue-200 text-black py-12">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">Revv Up</h3>
                    <p className="mt-2">Your Destination for Quality Vehicles</p>
                </div>

                <div className="flex space-x-6 mt-4 md:mt-0">
                
                </div>
            </div>
            <div className="mt-8 text-center md:text-left">
                <p className="text-sm">&copy; {new Date().getFullYear()} Revv Up. All rights reserved.</p>
                {/* <p className="text-sm">Contact us at <a href="mailto:info@revvup.com" className="underline">info@revvup.com</a></p> */}
            </div>
        </footer>
    );
}
