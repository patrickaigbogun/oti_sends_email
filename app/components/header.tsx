import Drawer from "./drawer";
import ProfileButton from "./profile_button";



export default function Header(){

    return(
        <nav className=" flex flex-row justify-between p-2 mb-5 " >
            <Drawer/>
            <ProfileButton />
        </nav>
    );
}