import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
    const url = "http://localhost:1111";

    const [dish, setDish] = useState([])
    const [isUserLogin, setIsUserLogin] = useState(false)

    useEffect(() => {
        const getAllDishes = async () => {
            try {
                const res = await axios.get(
                    `${url}/dish/all`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

                setDish(res.data.dishes)
                return res.data;

            } catch (error) {
                console.log(
                    "login Error:",
                    error.response?.data || error.message
                );

                throw error;
            }
        }

        getAllDishes()

    }, [])


    const registerUser = async (name, email, password, phoneNo) => {
        try {
            const res = await axios.post(
                `${url}/user/register`,
                {
                    name,
                    email,
                    password,
                    phoneNo,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log("Registration Response:", res.data);

            return res.data;
        } catch (error) {
            console.log(
                "Registration Error:",
                error.response?.data || error.message
            );

            throw error;
        }
    };
    const loginUser = async (email, password) => {
        try {
            const res = await axios.post(
                `${url}/user/login`,
                {
                    email,
                    password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            console.log(res.data)
            setIsUserLogin(true)
            return res.data;
        } catch (error) {
            console.log(
                "login Error:",
                error.response?.data || error.message
            );
            setIsUserLogin(false)
            throw error;
        }
    };


    return (
        <AppContext.Provider
            value={{
                registerUser, loginUser, setDish, dish, isUserLogin, setIsUserLogin
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppState;