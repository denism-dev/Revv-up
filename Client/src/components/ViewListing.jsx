import Navigation from "./Navigation/Navigation.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function ViewListing() {
    const host = 'http://localhost:3000'
    const {id} = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0)

    //get the current vehicle effect
    useEffect(() => {
        axios.get(host + `/api/vehicles/${id}`)
            .then((response) => {
                setVehicle(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vehicle:', error);
            });
    }, [id]);

    //placeholder while data is being fetched
    if (!vehicle) {
        return <p>Loading...</p>;
    }

    //handle image changes
    const handleDisplayChange = (index) =>{
        setSelectedImage(index)
    }

    //format the price to US local
    const price = (vehicle.price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <>
            <Navigation listingID={vehicle._id}/>
            <div className="container flex flex-col p-[50px] items-center justify-center">
                <div className="flex mb-[20px] w-[1000px] gap-4">
                    <div className="w-[60%] bg-white p-[10px] h-[430px] rounded">
                        <div className="w-[100%] mb-[10px] h-[310px] ">
                            <img
                                className="img-fluid w-[100%] [object-fit:cover]  h-[100%]"
                                 alt=""
                                src={ vehicle.images.length > 0
                                    ? host+'/'+vehicle.images[selectedImage]
                                    :host+'/'+'uploads/default.webp'}
                            />
                        </div>
                        <div className="h-[calc(100%_-_310px)]  flex p-[1px]">
                            <ul className="flex gap-2 cursor-pointer">
                                {vehicle.images.map((item, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={`h-[80px] w-[80px] 
                                            ${ index === selectedImage ? 'active-image' : '' }` }
                                            onClick={() => handleDisplayChange(index)}
                                        >
                                            <img
                                                className="img-fluid w-[100%] [object-fit:cover]  h-[100%]"
                                                src={host + '/' + item} alt=""/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="w-[40%] bg-white p-[10px] h-[430px] rounded">
                        <div className="flex justify-between items-center">
                            <h4 className="h4">{price}</h4>
                            <div>
                                <i className="bi bi-heart [font-size:24px]"></i>
                            </div>
                        </div>
                        <h3 className="h4 font-normal text-gray-600  ">{vehicle.title}</h3>
                        <hr className="text-gray-600"/>
                        <ul className="py-[10px]">
                            <li className="flex py-[6px] items-center justify-between">
                                <h6 className="h6 text-sm text-gray-500 m-0 p-0">Model</h6>
                                <p>{vehicle.model}</p>
                            </li>
                            <li className="flex py-[6px] items-center justify-between">
                                <h6 className="h6 text-sm text-gray-500 m-0 p-0">Year</h6>
                                <p>{vehicle.year}</p>
                            </li>
                            <li className="flex py-[6px] items-center justify-between">
                                <h6 className="h6 text-sm text-gray-500 m-0 p-0">Transmission</h6>
                                <p>{vehicle.transmissionType}</p>
                            </li>
                            <li className="flex py-[6px] items-center justify-between">
                                <h6 className="h6 text-sm text-gray-500 m-0 p-0">Engine Capacity</h6>
                                <p>{vehicle.engineCapacity}cc</p>
                            </li>
                        </ul>
                        <hr className="text-gray-600"/>
                        <ul className="py-[10px]">
                            <li className="flex py-[6px] items-center justify-between">
                                <h6 className="h6 text-sm text-gray-500 m-0 p-0">Seller</h6>
                                <p>{vehicle.sellerName}</p>
                            </li>
                            <li className="flex py-[6px] mb-[20px] items-center justify-between">
                                <h6 className="h6 text-sm text-gray-500 m-0 p-0">Tel</h6>
                                <p>{vehicle.sellerContact}</p>
                            </li>
                            <li className="flex py-[6px] items-center justify-between">
                                <a href="tell:000-000-000"
                                   className="btn btn-primary border-none bg-blue-400 w-[100%] py-[5px] text-white rounded">Contact
                                    Seller</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-[30px] rounded bg-white p-[10px] w-[1000px]">
                    <h5 className="h6 mb-[20px]">Description</h5>
                    <p className="text-sm">{
                        vehicle.description
                    }</p>
                </div>
            </div>
        </>
    )
}

export default ViewListing