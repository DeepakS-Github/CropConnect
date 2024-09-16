const app = require('../index');
const request = require('supertest');

jest.mock('../services/mailServices');

const sendMail = require('../services/mailServices');
const capitalizeFirstLetter = require('../helper/capitalizeFirstLetter');
const UserModal = require('../models/userSchema');
const SellerModal = require('../models/sellerSchema');


const sellerDetails = {
    name: "sellerTest",
    contact: 9876543210,
    email: "seller@test.com",
    password: "test123",
    brandName: "sellerBrand"
}


const userDetails = {
    name: "userTest",
    contact: 1123456789,
    email: "user@test.com",
    password: "test123",
}



let user;
let seller;


// sendMail.mockImplementation((receiverEmailAddress, content, subject) => {
//     return Promise.resolve();
// });


// Signup tests

const runSignupTests = (type) => {

    type = type.toLowerCase();
    const signupDetails = type === 'seller' ? sellerDetails : userDetails;

    describe(`${capitalizeFirstLetter(type)} Signup`, () => {

        if (type !== 'seller' && type !== 'user') {
            describe('given invalid type', () => {
                it('should return 400 for invalid type', async () => {
                    const res = await request(app).post(`/auth/${type}/signup`).send(userDetails);
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toHaveProperty('message', 'Invalid type');
                })
            })
        }

        if (type === 'seller' || type === 'user') {
            describe(`given the correct and unique ${type} details`, () => {
                it('should return 200 OK and success message', async () => {
                    const res = await request(app).post(`/auth/${type}/signup`).send(signupDetails);

                    expect(sendMail).toHaveBeenCalledWith(signupDetails.email, expect.any(String), expect.any(String));

                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('message');

                    if (type == "seller") {
                        seller = await SellerModal.findOne({ email: sellerDetails.email });
                    }
                    else {
                        user = await UserModal.findOne({ email: userDetails.email });
                    }
                })
            })


            describe(`given the repeated ${type} email`, () => {
                it('should return 400 and error message', async () => {
                    const modifiedSignupDetails = { ...signupDetails, contact: 9839284392 };

                    if (type === 'seller') {
                        modifiedSignupDetails.brandName = "testBrand2";
                    }

                    const res = await request(app).post(`/auth/${type}/signup`).send(modifiedSignupDetails);
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toHaveProperty('message', `${capitalizeFirstLetter(type)} with this email already exists`);
                })
            })


            describe(`given the repeated ${type} contact`, () => {
                it('should return 400 and error message', async () => {
                    const modifiedSignupDetails = { ...signupDetails, email: "test@test.com" };

                    if (type === 'seller') {
                        modifiedSignupDetails.brandName = "testBrand3";
                    }

                    const res = await request(app).post(`/auth/${type}/signup`).send(modifiedSignupDetails);
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toHaveProperty('message', `${capitalizeFirstLetter(type)} with this phone number already exists`);
                })
            })


            if (type === "seller") {
                describe('given the repeated seller brand name', () => {
                    it('should return 409 and error message', async () => {
                        const res = await request(app).post('/auth/seller/signup').send({ ...sellerDetails, email: "nvccafpbxsnudwfaae@ytnhy.com", contact: 1234567899 });
                        expect(res.statusCode).toEqual(409);
                        expect(res.body).toHaveProperty('message', 'This brand name already exists');
                    })
                })
            }
        }

    })

}


// Verify tests

const runVerifyTests = (type) => {

    type = type.toLowerCase();

    describe(`${capitalizeFirstLetter(type)} Verify`, () => {
        if (type !== 'seller' && type !== 'user') {
            describe('given invalid type', () => {
                it('should return 400 for invalid type', async () => {
                    const res = await request(app).post(`/auth/${type}/signup`).send(userDetails);
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toHaveProperty('message', 'Invalid type');
                })
            })
        }

        if (type === 'seller' || type === 'user') {



            describe(`given the correct ${type} verification token`, () => {
                it('should return 200 OK and success payload', async () => {

                    const verificationToken = encodeURIComponent(type === 'seller' ? seller.verificationToken : user.verificationToken);

                    const res = await request(app).patch(`/auth/${type}/verify/${verificationToken}`);

                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('message', `Account verified successfully`);
                    expect(res.body).toHaveProperty(`cookies.${type}_access_token`);
                    if (type === 'seller') {
                        expect(res.body).toHaveProperty('cookies.brandName');
                    }
                })
            })


            describe('given already verified account', () => {
                it('should return 409 and error message', async () => {
                    const verificationToken = encodeURIComponent(type === 'seller' ? seller.verificationToken : user.verificationToken);
                    const res = await request(app).patch(`/auth/${type}/verify/${verificationToken}`);
                    expect(res.statusCode).toEqual(409);
                    expect(res.body).toHaveProperty('message', 'Account already verified');
                })
            })


            describe('given invalid token', () => {
                it('should return 404 and error message', async () => {
                    const res = await request(app).patch(`/auth/${type}/verify/invalidToken`);
                    expect(res.statusCode).toEqual(404);
                    expect(res.body).toHaveProperty('message', 'Invalid token');
                })
            })


            describe('given expired token', () => {
                it('should return 403 and error message', async () => {
                    const verificationToken = encodeURIComponent(type === 'seller' ? seller.verificationToken : user.verificationToken);

                    if (type === 'seller') {
                        await SellerModal.findByIdAndUpdate(seller._id, { verificationTokenExpiry: Date.now() - 1000, isVerified: false });
                    }
                    else {
                        await UserModal.findByIdAndUpdate(user._id, { verificationTokenExpiry: Date.now() - 1000, isVerified: false });
                    }

                    const res = await request(app).patch(`/auth/${type}/verify/${verificationToken}`);
                    expect(res.statusCode).toEqual(403);
                    expect(res.body).toHaveProperty('message', 'Token expired');
                })
            })
        }

    })

}


// Login tests

const runLoginTests = (type) => {

    type = type.toLowerCase();
    const loginDetails = type === 'seller' ? { email: sellerDetails.email, password: sellerDetails.password } : { email: userDetails.email, password: userDetails.password };

    describe(`${capitalizeFirstLetter(type)} Login`, () => {

        if (type !== 'seller' && type !== 'user') {
            describe('given invalid type', () => {
                it('should return 400 for invalid type', async () => {
                    const res = await request(app).post(`/auth/${type}/login`).send(userDetails);
                    expect(res.statusCode).toEqual(400);
                    expect(res.body).toHaveProperty('message', 'Invalid type');
                })
            })
        }

        if (type === 'seller' || type === 'user') {

            describe(`given the correct ${type} details`, () => {
                it('should return 200 OK and success payload', async () => {


                    if (type === 'seller') {
                        await SellerModal.findByIdAndUpdate(seller._id, { isVerified: true });
                    }
                    else {
                        await UserModal.findByIdAndUpdate(user._id, { isVerified: true });
                    }


                    const res = await request(app).post(`/auth/${type}/login`).send(loginDetails);

                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('message', `${capitalizeFirstLetter(type)} login successful`);
                    expect(res.body).toHaveProperty(`cookies.${type}_access_token`);
                    if (type === 'seller') {
                        expect(res.body).toHaveProperty('cookies.brandName');
                    }
                })
            })


            describe(`given the ${type} does not exists`, () => {
                it('should return 404 and error message', async () => {
                    const res = await request(app).post(`/auth/${type}/login`).send({ ...loginDetails, email: "notfound@test.com" });

                    expect(res.statusCode).toEqual(404);
                    expect(res.body).toHaveProperty('message', `${capitalizeFirstLetter(type)} not found`);

                })
            })


            describe(`given the incorrect ${type} password`, () => {
                it('should return 401 and error message', async () => {
                    const res = await request(app).post(`/auth/${type}/login`).send({ ...loginDetails, password: "incorrectPassword" });
                    expect(res.statusCode).toEqual(401);
                    expect(res.body).toHaveProperty('message', 'Incorrect password');
                })
            })


            describe(`given the unverified ${type} account`, () => {
                it('should return 200 and error message', async () => {
                    if (type === 'seller') {
                        await SellerModal.findByIdAndUpdate(seller._id, { isVerified: false });
                    }
                    else {
                        await UserModal.findByIdAndUpdate(user._id, { isVerified: false });
                    }


                    const res = await request(app).post(`/auth/${type}/login`).send(loginDetails);
                    expect(res.statusCode).toEqual(200);
                    expect(res.body).toHaveProperty('message');
                })
            })

        }

    })

}


// Running seller integration tests
runSignupTests('seller');
runVerifyTests('seller');
runLoginTests('seller');


// Running user integration tests
runSignupTests('user');
runVerifyTests('user');
runLoginTests('user');


// Running invalid type tests
runSignupTests('invalid');
runVerifyTests('invalid');
runLoginTests('invalid');