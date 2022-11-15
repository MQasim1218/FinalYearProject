

function NavBar() {

    return (
        <nav className="relative">
            <div className="flex px-10 sm:px-20 text-xl whitespace-nowrap space-x-10 
            sm:space-x-20 overflow-x-scroll scrollbar-hide">
                <h1>Hello</h1>
            </div>
            <divc className="absolute top-0 right-0 bg-gradient-to-l from-[#06202A] h-10 w-1/12" />
        </nav>
    );
}

export default NavBar;