import React, { useEffect, useState } from "react";
import { postAPI } from "../../utils/api/postRequest";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { notify } from "../../utils/helper/notification";
import { uploadImageToCloudinary } from "../../utils/helper/uploadImageToCloudinary";
import { MdCancel } from "react-icons/md";
import BingMap from "../../components/BingMap";

function SellerProductModal({
  dropBox,
  setDropBox,
  editBox,
  setEditBox,
  loading,
  setLoading,
  setIsDataUpdated,
}) {
  const sellerData = useSelector((state) => state.sellerReducer);

  const [image, setImage] = useState(null);

  const [imageToUpload, setImageToUpload] = useState(null);

  const handleImageUpload = async (e) => {
    const uploadedImage = e.target.files[0];
    setImageToUpload(() => uploadedImage);
    if (uploadedImage) {
      const imageUrl = URL.createObjectURL(uploadedImage);
      setImage(() => imageUrl);
    }
  };

  const [formData, setFormData] = useState({
    image: null,
    brand: sellerData.brandName,
    category: null,
    name: null,
    description: null,
    pricePerUnit: null,
    measuringUnit: null,
    minimumOrderQuantity: null,
    location: {
      latitude: null,
      longitude: null,
    },
    quantity: null,
    shelfLife: null,
    sellerId: localStorage.getItem("sellerId"),
  });

  const handleSubmit = async () => {
    console.log(formData);

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
      console.log(cloudResp);

      if (cloudResp !== "error") {
        setFormData((prevData) => ({
          ...prevData,
          image: cloudResp,
        }));
      }

      setLoading(false);
      setDropBox(false);
    } else {
      notify("Please wait", "info");
    }
  };

  useEffect(() => {
    const postData = async () => {
      if (formData.image) {
        try {
          await postAPI("product/addProduct", formData);
          setIsDataUpdated(true);
        } catch (error) {
          // Handle error if the API call fails
          console.error("Error posting data:", error);
        }
      }
    };

    postData();
  }, [formData]);

  return (
    <>
      <div
        className={`fixed inset-0 w-full h-full  ${
          dropBox ? "bg-black bg-opacity-50 z-40" : "-z-40"
        }`}
      ></div>

      <div
        className={`${
          dropBox ? "" : "hidden"
        } fixed top-0 left-0 z-[1055]  h-full w-full overflow-y-auto overflow-x-auto outline-none`}
        tabIndex="-1"
      >
        <div className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto  items-center  min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[700px]">
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {editBox ? "Edit Product" : "Add Product"}
              </h5>

              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none hover:text-red-800"
                onClick={(e) => {
                  e.preventDefault();
                  if (loading) {
                    notify("Please wait", "info");
                    return;
                  }
                  setDropBox(0);
                  setEditBox(0);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="relative p-4">
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <div class="flex items-center justify-center w-full">
                        <label class="flex flex-col relative items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-10">
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
                            <div class="flex flex-col items-center justify-center py-16">
                              <svg
                                class="w-8 h-8 mb-4 text-gray-500"
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
                              <p class="mb-2 text-sm text-gray-500">
                                <span class="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p class="text-xs text-gray-500">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
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
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* <div className="col-span-2 sm:col-span-3">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Una"
                        onChange={(e) => {
                          const updatedOriginAndSource = {
                            ...formData.originAndSource,
                            city: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            originAndSource: updatedOriginAndSource,
                          });
                        }}
                        required
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-3">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Himachal Pradesh"
                        onChange={(e) => {
                          const updatedOriginAndSource = {
                            ...formData.originAndSource,
                            state: e.target.value,
                          };
                          setFormData({
                            ...formData,
                            originAndSource: updatedOriginAndSource,
                          });
                        }}
                        required
                      />
                    </div> */}

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Category
                      </label>
                      <select
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
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
                      {/* <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="Fruits"
                        required
                      /> */}
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label className="text-sm font-medium text-gray-900 block mb-2">
                        Measuing Unit
                      </label>
                      <input
                        type="text"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        placeholder="kg"
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
                        rows="6"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                        placeholder="e.g. Our apples are hand-picked and carefully inspected to ensure that only the best make it to our customers. "
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
            <div className="px-10">
              <label
                htmlFor="product-details"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Choose Location
              </label>
              <BingMap isModalOpen={dropBox} setFormData={setFormData} />
            </div>
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="inline-block rounded bg-primary-100 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal focus:outline-none focus:ring-0 hover:text-red-800"
                onClick={(e) => {
                  e.preventDefault();
                  if (loading) {
                    notify("Please wait", "info");
                    return;
                  }
                  setDropBox(0);
                }}
              >
                Close
              </button>
              <button
                className="text-xs py-2 px-4 flex flex-row justify-center items-center text-white font-medium rounded cursor-pointer uppercase bg-sky-700"
                onClick={() => {
                  if (editBox === true) {
                    handleEdit(EditID);
                  } else {
                    handleSubmit();
                  }
                }}
              >
                {loading ? <Spinner width="w-5" color="#ffffff" /> : null}
                <span className="ml-1">{editBox ? "Edit" : "Add"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellerProductModal;
