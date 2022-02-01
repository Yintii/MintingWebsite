import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PoetryByRobots from '../../utils/PoetryByRobots.json'
import { ethers } from 'ethers';

export const AdminDash = ({ user, CONTRACT_ADDRESS }) => {

    const URI_INPUT = useRef(null)
    const [dataURI, setDataURI] = useState(null);

    const askContractToSetDataURI = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, PoetryByRobots.abi, signer);

                console.log("Poping wallet for gas...");

                let URITxn = await connectedContract.setBaseURI(dataURI);

                console.log("Setting URI...")
                await URITxn.wait();
                console.log(`Txn mined, see URL: https://rinkeby.etherscan.io/tx/${URITxn.hash}`)
            } else {
                console.log("Ethereum object does not exist");
            }
        } catch (error) {
            console.log(error);
        }
    }


    const askContractToWithdrawFunds = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, PoetryByRobots.abi, signer);

                console.log("Poping wallet for gas...");

                let withdrawTxn = await connectedContract.withdrawMoney();

                console.log("Withdrawing...")
                await withdrawTxn.wait();
                console.log(`Txn mined, see URL: https://rinkeby.etherscan.io/tx/${withdrawTxn.hash}`)
            } else {
                console.log("Ethereum object does not exist");
            }
        } catch (error) {
            console.log(error);
        }
    }


    if (user === "0xa0abf54e10e2088256819f1bff7af4f324ca3fda") {
        return (
            <div className='p-5 m-5 admin-dash'>
                <h1>Admin</h1>
                <Form>
                    <Form.Label>Data URI</Form.Label>
                    <Form.Control ref={URI_INPUT} onChange={() => setDataURI(URI_INPUT.current.value)} className='w-50' />
                    <Button
                        variant="warning"
                        className='mt-2 mb-5'
                        onClick={askContractToSetDataURI}
                    >
                        Set URI
                    </Button>
                    <Button
                        variant="success"
                        className='mt-2 mx-3 mb-5'
                        onClick={askContractToWithdrawFunds}
                    >
                        Withdraw Money
                    </Button>
                </Form>
            </div>
        )
    }
    else {
        return (
            <div className="p-5 m-5 admin-dash">
                <h1>Ooops!</h1>
                <p>Nothing to see here.</p>
                <Link to="/"> Back home</Link>
            </div>
        )
    }
}

export default AdminDash;
