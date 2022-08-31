import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
    const [ web3, setWeb3 ] = useState(undefined) 

    const getWeb3 = () => {
        try {
            if(window.ethereum) {
                setWeb3(new Web3(window.ethereum))
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getWeb3()
    },[])

    return { web3 }
}

export default useWeb3;