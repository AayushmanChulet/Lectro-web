import { Button } from "../ui/button";

export default function FlashCard( ) {
    return <div className="w-full h-full flex justify-center items-center gap-3">
        <div className="w-108 h-136 p-3 flex flex-col gap-3">
            <div className="h-[85%] w-full bg-blue-500">
                Question
            </div>
            <div className="flex w-full justify-evenly items-center">
                <Button variant={"outline"} className="w-32">Previous</Button>
                <Button variant={"outline"} className="w-32">Next</Button>
            </div>
        </div>
    </div>
}