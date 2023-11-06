import {NavLink} from "react-router-dom";
export default function (props) {
    const {listingID, dipatchSearch, searchQuery} = props

    // dispatches search event to parent
    const triggerSearch = (event) => {
        dipatchSearch(event.target.value)
    }

    // conditional search field rendering
    let searchItem = ''

    if (window.location.pathname === '/') {
        searchItem = <input
            className="w-[250px] form-control h-[40px] px-[10px] rounded border"
            value={searchQuery ?? ''}
            onChange={triggerSearch}
            id="Search_Application"
            placeholder="Search Vehicle..."
            type="search"/>
    }


    //conditional update button rendering
    let update = null;

    if (listingID !== undefined) {
        update = <NavLink
            className="nav-btn"
            to={`/UpdateListing/${listingID}`}
            activeclassname="active">Update Listing</NavLink>
    }

    return (
        <nav
            className="container bg-white shadow-sm mb-[10px] mt-[10px] flex justify-between p-[10px]">
            <ul className="flex space-x-3 items-start">
                <NavLink
                    className="nav-btn"
                    to="/"
                    activeclassname="active">Home</NavLink>
                <NavLink
                    className="nav-btn"
                    to="/CreateListing"
                    activeclassname="active">Create
                    Listing</NavLink>
                {update}
            </ul>
            <div
                className="flex items-center">
                {searchItem}
            </div>
        </nav>
    )
}