import { useEffect, useState } from "react";

const useAccount = () => {
    const [ account, setAccount ] = useState('');

    const getAccount = async () => {
        try {
            if(!window.ethereum) throw new Error('no metamask here')

            const accounts = await window.ethereum.request({
                method:"eth_requestAccounts"
            });
            
            if(accounts && Array.isArray(accounts)) {
                setAccount(accounts[0]);
            }
        }
        catch(e) {
            console.error(e)
        }
    };

    useEffect(() => {
        getAccount();
    }, []);
    return {account};
};

export default useAccount;