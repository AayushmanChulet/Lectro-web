import { Toaster } from "@/components/ui/toaster";
import Footer from "./footer";
import NavBar from "./navbar";
import { Outlet } from "react-router";
import { Provider } from "@/components/ui/provider";

export default function Layout(){
    return<div className="flex flex-col min-h-screen bg-gray-100">
        <NavBar/>
        <Outlet />
        <Footer/>
    </div>
}