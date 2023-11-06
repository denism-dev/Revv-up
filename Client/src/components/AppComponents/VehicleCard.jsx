import { useState} from "react";

export function VehicleCard(props) {
    const host = "http://localhost:3000"
    const [vehicle, setVehicle] = useState(props.vehicle)

    // price formatter for US local
    const price = (vehicle.price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
            <div
                className="
                border
                vehicle-card-display
                w-[280px] h-[380px] mb-[10px] shadow rounded vehicle-card-display
                hover:[transform:scale(1.05)] bg-white hover:[z-index:100] hover:[shadow-l]"
            >
                {}
                <img
                    className="img-fluid w-[100%] [object-fit:cover] h-[50%]"
                    src={ vehicle.images.length > 0
                        ? host+'/'+vehicle.images[vehicle.active_image]
                        :host+'/'+'uploads/default.webp'
                } alt=""
                />
                <h3 className="h5 text-gray-500 px-[20px] pt-[10px] mb-[0px] text-left">{price}</h3>
                <div className="px-[10px] py-[10px]" >
                    <h6 className="text-sm h6" >{vehicle.title}</h6>
                    <p className="text-sm text-left  text-container text-gray-600 ">{vehicle.description}</p>
                </div>
                <div className="grid place-content-center pt-[10px]">
                    <button type="button" className="btn btn-primary bg-blue-400 text-white border-none py-[1px] px-[20px]">View</button>
                </div>
            </div>

    )
}