import React, { useEffect, useState } from "react";
import { postAPI } from "../../utils/api/postRequest";
import Spinner from "../../components/loading/Spinner";
import { useSelector } from "react-redux";
import { notify } from "../../utils/helper/notification";
import { uploadImageToCloudinary } from "../../utils/helper/uploadImageToCloudinary";
import { MdCancel } from "react-icons/md";
import LeafletMap from "../../components/map/LeafletMap";
import { useParams } from "react-router-dom";
import { putAPI } from "../../utils/api/putRequest";
import { useNavigate } from "react-router-dom";


function SellerProductOperation() {
  const { operation } = useParams();
  const navigate = useNavigate();

  const sellerData = useSelector((state) => state.sellerReducer);

  //   console.log(sellerData);
  const productEditData = useSelector(
    (state) => state.sellerEditProductReducer
  );

  // console.log(productEditData);

  const [renderMap, setRenderMap] = useState(false);

  const [image, setImage] = useState(
    operation === "edit" ? productEditData.image : null
  );

  const [imageToUpload, setImageToUpload] = useState(
    operation === "edit" ? productEditData.image : null
  );

  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    if (operation === "edit") {
      setLat(productEditData.location.latitude);
      setLong(productEditData.location.longitude);
      setRenderMap(true);
    }
  }, [productEditData]);

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const uploadedImage = e.target.files[0];
    setImageToUpload(() => uploadedImage);
    if (uploadedImage) {
      const imageUrl = URL.createObjectURL(uploadedImage);
      // console.log(imageUrl);
      setImage(() => imageUrl);
    }
  };

  //   console.log("Latitude", productEditData.location.latitude);

  //   console.log(sellerData.brandName);

  const [formData, setFormData] = useState({
    image: operation === "edit" ? productEditData.image : null,
    brand: sellerData.brandName,
    category: operation === "edit" ? productEditData.category : null,
    name: operation === "edit" ? productEditData.name : null,
    description: operation === "edit" ? productEditData.description : null,
    pricePerUnit: operation === "edit" ? productEditData.pricePerUnit : null,
    measuringUnit: operation === "edit" ? productEditData.measuringUnit : null,
    minimumOrderQuantity:
      operation === "edit" ? productEditData.minimumOrderQuantity : null,
    location: {
      latitude: operation === "edit" ? productEditData.location.latitude : null,
      longitude:
        operation === "edit" ? productEditData.location.longitude : null,
    },
    quantity: operation === "edit" ? productEditData.quantity : null,
    shelfLife: operation === "edit" ? productEditData.shelfLife : null,
    sellerId: localStorage.getItem("sellerId"),
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location: { latitude: lat, longitude: long },
    }));
  }, [lat, long]);

  const handleSubmit = async () => {
    // console.log(formData);

    if (
      !image ||
      !formData.category ||
      !formData.name ||
      !formData.description ||
      !formData.pricePerUnit ||
      !formData.measuringUnit ||
      !formData.minimumOrderQuantity ||
      !formData.location.latitude ||
      !formData.location.longitude ||
      !formData.quantity ||
      !formData.shelfLife
    ) {
      notify("Please fill all the details", "info");
      return;
    }

    if (!loading) {
      setLoading(true);
      let cloudResp = await uploadImageToCloudinary(imageToUpload);


      // console.log("cloud: ",cloudResp);

      if (cloudResp !== "error") {
        try {
          if (operation === "add") {
            await postAPI("product/addProduct", {
              ...formData,
              image: cloudResp,
            });
          } else {
            await putAPI(`product/update/${productEditData._id}`, {
              ...formData,
              image: cloudResp,
            });
          }
        } catch (error) {
          // Handle error if the API call fails
          console.error("Error posting data:", error);
          notify("Something went wrong", "error");
        } finally {
          setLoading(false);
          navigate("/sellerdashboard");
        }
      }
      else{
        setLoading(false);
      }
    } else {
      notify("Please wait", "info");
    }
  };

  return (
    <>
      <div className={`h-full w-full`}>
        <div className="pointer-events-none relative flex min-h-[calc(100%-1rem)] items-center  w-11/12 mx-auto my-12">
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current outline-none ">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 py-4 ">
              <h5 className="text-xl font-medium leading-normal text-neutral-800 ">
                {operation.charAt(0).toUpperCase() + operation.slice(1)} Product
              </h5>
              <button
                className="text-base py-2 px-6 flex flex-row justify-center items-center text-white font-medium rounded-full cursor-pointer uppercase bg-sky-700"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? (
                  <span className="mr-1">
                    <Spinner width="w-5" color="#ffffff" />
                  </span>
                ) : null}
                <span>{operation.toUpperCase()}</span>
              </button>
            </div>
            <div className="relative py-6">
              <div className="space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col relative items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-10">
                          {image ? (
                            <span>
                              <img
                                src={image}
                                className="w-full h-full bg-blue-300"
                              />
                              <MdCancel
                                className="text-4xl absolute top-0 right-0 translate-x-[50%] -translate-y-[50%]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setImage(null);
                                }}
                              />
                            </span>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-24">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                SVG, PNG, JPG or JPEG
                              </p>
                            </div>
                          )}

                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleImageUpload(e)}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="price"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Fresh Apples"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Category
                      </label>
                      <select
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        required
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="nuts">Nuts</option>
                        <option value="sugar">Sugar</option>
                        <option value="spices">Spices</option>
                        <option value="fruits">Fruits</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="pulses">Pulses</option>
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Measuring Unit
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="kg"
                        value={formData.measuringUnit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            measuringUnit: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Price per unit
                      </label>
                      <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Rs. 2000"
                        value={formData.pricePerUnit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pricePerUnit: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Minimum Order Quantity
                      </label>
                      <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="5 kg"
                        value={formData.minimumOrderQuantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            minimumOrderQuantity: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Stocks Left
                      </label>
                      <input
                        type="number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="20 kg"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Shelf Life
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="10 years"
                        value={formData.shelfLife}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shelfLife: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="product-details"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Description
                      </label>
                      <textarea
                        rows="10"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                        placeholder="e.g. Our apples are hand-picked and carefully inspected to ensure that only the best make it to our customers. "
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <label
                htmlFor="product-details"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Choose Location
              </label>
              {((renderMap && operation === "edit") || operation === "add") && (
                <LeafletMap
                  width="w-full"
                  height="h-[450px]"
                  showSearchBox={true}
                  latitude={lat}
                  longitude={long}
                  setLatitude={setLat}
                  setLongitude={setLong}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProductOperation;
