import Navigation from "./Navigation/Navigation.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { VehicleCard } from "./AppComponents/VehicleCard.jsx";
import { NavLink } from "react-router-dom";
import Footer from "./Footer/Footer.jsx";

function HomePage() {
    const host = "http://localhost:3000"
    const [vehicles, setVehicles] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const [sortCriteria, setSortCriteria] = useState("");

    //get all vehicles effect
    useEffect(() => {
        axios.get(host + '/api/vehicles')
            .then((response) => {
                setVehicles(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vehicles:', error);
            });
    }, []);

    //sorting effect
    useEffect(() => { sortVehicles() }, [sortCriteria]);

    //searching effect
    useEffect(() => { handleSearchResults() }, [searchQuery]);

    let render

    // vehicle listing display
    if (vehicles !== undefined && vehicles.length > 0) {
        render =
            <div className="row row-cols-sm-1 row-cols-md-3 row-cols-lg-4">
                {vehicles.map(item => (
                    <NavLink key={item._id} className="col p-[10px] justify-center" to={'/vehicle/' + item._id}>
                        <VehicleCard vehicle={item}></VehicleCard>
                    </NavLink>
                ))}
            </div>
    } else if (Array.isArray(vehicles) && vehicles.length <= 0) {
        render =
            <div className="w-[80%] flex items-center justify-center mx-[auto] rounded h-[150px] bg-white shadow">
                <h1 className="h4 text-gray-500">No Vehicles found...</h1>
            </div>

    }

    // searching event receiver
    const searching = (val) => {
        setSearchQuery(val)
    }

    // sorting event receiver
    const handleSort = (event) => {
        setSortCriteria(event.target.value);
    }

    // search action
    const handleSearchResults = () => {
        if (searchQuery) {
            axios.get(`${host}/api/vehicles/search?search=${searchQuery}`)
                .then((resp) => {
                    setVehicles(resp.data);
                    setSortCriteria("")
                })
                .catch((err) => {
                    console.log("Error: " + err);
                });
        }
    }

    // sort action
    const sortVehicles = () => {
        const [field, order] = sortCriteria.split(" ");

        const sortedVehicles = [...vehicles];

        if (field) {
            sortedVehicles.sort((a, b) => {
                const valueA = a[field];
                const valueB = b[field];

                if (field === 'title') {
                    if (order === "Ascending") {
                        return valueA.localeCompare(valueB);
                    } else {
                        return valueB.localeCompare(valueA);
                    }
                } else if (field === 'price') {
                    if (order === "Ascending") {
                        return valueA - valueB;
                    } else {
                        return valueB - valueA;
                    }
                } else {
                    return 0
                }
            });

            setVehicles(sortedVehicles);
        }
    }


    return (

        <>
            <Navigation searchQuery={searchQuery} dipatchSearch={searching} />
            <div className="container p-[10px]">
                <div className="hero rounded flex items-center flex-col justify-center h-[fit-content] mx-[10px] p-[10px] bg-blue-100">
                    <h1 className="h2 text-center mb-[15px]">Welcome to Revv Up</h1>
                    <p className="m-[20px] px-[50px] text-center">
                        Discover your perfect ride on our Vehicle Listing Website! We offer a diverse range of vehicles, from sleek sedans to rugged trucks and eco-friendly hybrids. Find your ideal match with easy search options, detailed listings, and high-quality images. Whether you're buying or selling, our platform prioritizes transparency and user satisfaction for a hassle-free experience.
                    </p>
                    <div className="flex justify-around w-[100%]">
                        <button
                            className="btn btn-primary border-none bg-blue-400 px-[10px] py-[5px] mx-[20px] text-white rounded">Register
                            As Seller
                        </button>
                        <button
                            className="btn btn-primary border-none bg-blue-400 px-[10px] py-[5px] mx-[20px] text-white rounded">Resister
                            As Buyer
                        </button>
                    </div>
                </div>
            </div>
            <div className="container flex items-center p-[20px]">
                <select className="border p-[5px] rounded" name="sort" value={sortCriteria} onChange={handleSort} id="sort">
                    <option value="">Sort</option>
                    <option value="title Ascending">Title Ascending</option>
                    <option value="title Descending">Title Descending</option>
                    <option value="price Descending">Price Descending</option>
                    <option value="price Ascending">Price Ascending</option>
                </select>
            </div>
            <div className="container px-[20px] pt-[20px]">
                {render}
            </div>
            <Footer />

        </>
    )
}

export default HomePage