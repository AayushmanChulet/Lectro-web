export default function NavBar() {
    return <nav className="w-full flex justify-between items-center px-8 py-4 text-xl ">
        <span className="">
            Lectro
        </span>
        <span className="flex gap-7 items-center justify-around">
            <span>Chat</span>
            <span>Notes</span>
            <span>Summary</span>
            <span>Quiz</span>
            <span>FlashCard</span>
        </span>
    </nav>
}