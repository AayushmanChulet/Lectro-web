import Footer from "./footer";
// import NavBar from "./navbar";
import { Outlet } from "react-router";

export default function Layout(){
    return<div className="flex flex-col min-h-screen bg-background">
        {/* <NavBar/> */}
        <Outlet />
        <Footer/>
    </div>
}