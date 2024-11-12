import CreateSegmentControl from "./create_segmented_control";
import Drawer from "./drawer";
import ProfileButton from "./profile_button";



export default function CreateLayoutHeader(){

    return(
        <nav className=" flex flex-row justify-between p-2 mb-5 " >
            <Drawer/>
            <CreateSegmentControl/>
            <ProfileButton />
        </nav>
    );
}