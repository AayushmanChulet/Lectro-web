import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
export default function Quiz() {

    const [quiz, setQuiz] = useState([]);

    useEffect(()=>{
        fetchQuiz();
    }, [])

    const fetchQuiz = async ( ) => {
        const quizResponse : any  = await axios.get(`http://localhost:3000/api/v1/app/flashcards/${"i4b_ETwPoTE"}`);

        if(!quizResponse.status){
            console.log("something went wrong");
        }
        setQuiz(quizResponse.data.data);
    }

    return <div className="w-full h-full flex justify-center items-center ">
        <div className="bg-white w-[95%] h-[80%] rounded-2xl flex flex-col items-center justify-center p-4 gap-6">
            <div className="text-2xl text-center">What is the significance of being able to dynamically change images based on URL parameters?</div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex gap-3 p-2 bg-blue-200 rounded-xl items-center justify-start"> <input type="radio" name="options"/><span>It allows for more complex image editing.</span></div>
                <div className="flex gap-3 p-2 bg-blue-200 rounded-xl items-center justify-start"> <input type="radio" name="options"/><span>It simplifies the process of managing different image variations.</span></div>
                <div className="flex gap-3 p-2 bg-blue-200 rounded-xl items-center justify-start"> <input type="radio" name="options"/><span>It increases the number of images on a website.</span></div>
                <div className="flex gap-3 p-2 bg-blue-200 rounded-xl items-center justify-start"> <input type="radio" name="options"/><span>It is not relevant to the business. </span></div>
            </div>
            <Button variant={"outline"}>Submit</Button>
        </div>
    </div>
}