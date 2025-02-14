import {Card} from "~/components/ui/card";
import {Link} from "react-router";

const Header = () => {
    return (
        <Card
            className="container bg-card py-3 px-4 border-0 flex items-center justify-between gap-6 rounded-2xl mt-5 mx-auto">
            <Link to="/" className="group">
                <img className="text-primary cursor-pointer size-10 group-hover:scale-110 duration-300" src="/icon.png"
                     alt="icon"/>
            </Link>
            <div className="flex mr-2 items-center gap-2">
                <Link to="/">Home</Link>
                <Link to="/shopping-lists">Shopping Lists</Link>
            </div>
        </Card>
    );
};

export default Header;