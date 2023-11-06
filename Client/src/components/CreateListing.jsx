import Navigation from "./Navigation/Navigation.jsx";
import {Label} from "./AppComponents/Form/Label.jsx";
import {useEffect, useState} from "react";
import axios from 'axios';
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function CreateListing() {
    const host = "http://localhost:3000"
    const {id} = useParams();
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    //default form state (is used by the clear action)
    let defaultFormData = {
        title: '',
        price: '',
        model: '',
        year: '',
        transmissionType: 'Automatic',
        engineCapacity: '',
        description: '',
        sellerName: '',
        sellerContact: '',
        images: [],
        active_image: 0
    }

    //set up the form and inputs
    const [formData, setFormData] = useState(defaultFormData)


    //determine if form should render for updating or for a new entry
    const isUpdate = id !== undefined

    //passing model values from database to the form is for updating
    useEffect(() => {
        if (isUpdate) {
            axios.get(host + `/api/vehicles/${id}`)
                .then(response => {
                    const updatedFormData = response.data;
                    setFormData(updatedFormData);
                })
                .catch(error => {
                    console.error('Failed to fetch vehicle data for update:', error);
                });
        }
    }, [id, isUpdate, host]);

    //reset form
    const resetForm = () => {
        setFormData(defaultFormData);
    };

    //handle field changes
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //upload file to server
    const handleFileInput = (event) => {
        let file = event.target.files[0]

        if (file) {
            const imageFormData = new FormData();
            imageFormData.append('file', file);


            try {
                axios.post(host + `/api/vehicles/temp/upload`, imageFormData)
                    .then(response => {
                        const updatedImages = [...formData.images, response.data.imagePath]

                        if (updatedImages.length > 3) {
                            updatedImages.shift()
                        }

                        setFormData({
                            ...formData,
                            images: updatedImages,
                        });
                    })
                    .catch(error => {
                        console.error('Failed to fetch vehicle data for update:', error);
                    });
            } catch (error) {
                console.error('Failed to create/update vehicle:', error);
            }
        }
    }
    const handleDelete = async () => {
        const shouldDelete = window.confirm("Are you sure you want to delete this vehicle?");
        console.log(id)
        if (!shouldDelete) {
          return; // User canceled the deletion
        }
      
        try {
          const response = await axios.delete(host + `/api/vehicles/${id}`);
          console.log('Vehicle deleted');
      
          // You can use the navigate function to go back to the homepage or any other page you desire.
          navigate('/'); // Replace '/' with the URL of your actual homepage.
        } catch (error) {
          console.error('Error deleting vehicle:', error);
          // Handle the error as needed (e.g., show an error message to the user).
        }
      };
      
      

    //persist data to the database (handles both new entries and updates)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdate) {
                const response = await axios.patch(host + `/api/vehicles/${id}`, formData);
                console.log('Vehicle updated');

                navigate(`/vehicle/${response.data._id}`);

            } else {
                const response = await axios.post(host + '/api/vehicles', formData);
                console.log('Vehicle created:', response.data);

                navigate(`/vehicle/${response.data._id}`);

            }
        } catch (error) {
            setErrors(error.response.data.error.errors)
        }
    };

    return (
        <>
            <Navigation/>
            <div className="container">
                <h3 className="h3 text-gray-600 underline text-center mb-[50px] ">Create Listing</h3>
            </div>
            <div className="container mb-[20px] flex justify-end gap-4 max-w-[500px] mx-[auto]">
            <button type="button" className="btn btn-outline-secondary" onClick={handleDelete}>Delete</button>
                <button type="button" className="btn btn-outline-secondary" onClick={resetForm}>Clear</button>
                <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>Save</button>
               
            </div>
            <div className="container form-holder">
                {/*Details Entry*/}
                <div>
                    <h5 className="h5">Entry Details</h5>
                    <form onSubmit={event => event.preventDefault()}>
                        <div className="form-group">
                            <Label for="title" text="Title"/>
                            <div className="w-[70%]">
                                <input type="text" id="title" name="title" value={formData.title}
                                       onChange={handleInputChange} aria-describedby="titleHelp"
                                       className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.title ? errors.title.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="price" text="Price"/>
                            <div className="w-[70%]">
                                <input type="number" id="price" name="price" value={formData.price}
                                       onChange={handleInputChange} aria-describedby="priceHelp"
                                       className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.price ? errors.price.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="Seller" text="Seller"/>
                            <div className="w-[70%]">
                                <input type="text" id="Seller" name="sellerName" value={formData.sellerName}
                                       onChange={handleInputChange} aria-describedby="priceHelp"
                                       className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.sellerName ? errors.sellerName.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="sellerContact" text="Contact"/>
                            <div className="w-[70%]">
                                <input type="text" id="sellerContact" name="sellerContact"
                                       value={formData.sellerContact} onChange={handleInputChange}
                                       aria-describedby="priceHelp" className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.sellerContact ? errors.sellerContact.message : ''}</small>
                            </div>
                        </div>
                    </form>
                </div>

                {/*Vehicle Details*/}
                <div>
                    <h5 className="h5">Vehicle Details</h5>
                    <form onSubmit={event => event.preventDefault()}>
                        <div className="form-group">
                            <Label for="model" text="Model"/>
                            <div className="w-[70%]">
                                <input type="text" id="model" name="model" value={formData.model}
                                       onChange={handleInputChange} aria-describedby="titleHelp"
                                       className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.model ? errors.model.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="year" text="Year"/>
                            <div className="w-[70%]">
                                <input type="number" id="year" min="2000" max="2099" step="1" name="year"
                                       value={formData.year} onChange={handleInputChange} aria-describedby="priceHelp"
                                       className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.year ? errors.year.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="transmission" text="Transmission"/>
                            <div className="w-[70%]">
                                <select className="form-control" name="transmissionType"
                                        value={formData.transmissionType} onChange={handleInputChange}
                                        id="transmission">
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                    <option value="Semi-Automatic">Semi-Automatic</option>
                                </select>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.transmissionType ? errors.transmissionType.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="engein_capacity" text="Engein Capacity"/>
                            <div className="w-[70%]">
                                <input type="number" id="engein_capacity" name="engineCapacity"
                                       aria-describedby="priceHelp" value={formData.engineCapacity}
                                       onChange={handleInputChange} className="form-control"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.engineCapacity ? errors.engineCapacity.message : ''}</small>
                            </div>
                        </div>
                        <div className="form-group">
                            <Label for="description" text="Description"/>
                            <div className="w-[70%]">
                                <textarea className="form-control" value={formData.description} name="description"
                                          onChange={handleInputChange} id="description" rows="3"/>
                                <small id="titleHelp"
                                       className="form-text text-red-400">{errors.description ? errors.description.message : ''}</small>
                            </div>
                        </div>
                    </form>
                </div>
                {/*Vehicle Images*/}
                <div id="img_upload" className="mb-[50px]">
                    <h5 className="h5">Vehicle Image</h5>
                    <form onSubmit={event => event.preventDefault()}>
                        <div className="form-group flex flex-col">
                            <label htmlFor="upload"
                                   className="flex items-center gap-4 cursor-pointer w-[100%] px-[10px] rounded hover:bg-gray-300">
                                <i className="bi bi-cloud-arrow-up-fill [font-size:40px]"></i>
                                <p>Upload Up to 3 images</p>
                            </label>
                            <div className="w-[70%] hidden">
                                <input type="file" accept="image/*" id="upload" name="fileUpload"
                                       onChange={handleFileInput} aria-describedby="titleHelp"
                                       className="form-control"/>
                            </div>
                            <small id="titleHelp"
                                   className="form-text text-red-400">{errors.images ? errors.images.message : ''}</small>
                        </div>
                        <section className="flex justify-between">
                            {Object.entries(formData.images).map(([key, item], idx) =>
                                <div key={idx} className="w-[30%] h-[150px]">
                                    <img src={host + "/" + item}
                                         className="image-fluid w-[100px] h-[100px] block mx-[auto]" alt=""/>
                                    <div className="grid place-content-center pt-[10px]">
                                        <input name="active_image" value={key} id="active_image"
                                               onChange={handleInputChange} type="radio"/>
                                        <p>Active</p>
                                    </div>
                                </div>
                            )}
                        </section>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateListing