import {useState} from "react";

export default function KeysForm({onClicked, error}){
    const [keyAPI, setKeyAPI] = useState("");
    const [secretKeyAPI, setSecretKeyAPI] = useState("");

    const updateKeyAPI = (e) => {
        const val = e.target.value;
        if (e.target.validity.valid)
            setKeyAPI(val);
    }

    const updateSecretKeyAPI = (e) => {
        const val = e.target.value;
        if (e.target.validity.valid)
            setSecretKeyAPI(val);
    }

    return(
        <div className="keys-form">
            <p className="title">Victim Binance API Keys</p>

            <div className="forms">
                <div>
                    <p className="label-form">API Key</p>
                    <input
                        type="text"
                        value={keyAPI !== "" ? keyAPI : ""}
                        onChange={updateKeyAPI}
                        placeholder="Type here"
                        className="input"

                    />
                </div>

                <div>
                    <p className="label-form">Secret Key</p>
                    <input
                        type="text"
                        value={secretKeyAPI !== "" ? secretKeyAPI : ""}
                        onChange={updateSecretKeyAPI}
                        placeholder="Type here"
                        className="input"
                    />
                </div>
            </div>

            <div className="content-button">
                <button onClick={() => onClicked(keyAPI, secretKeyAPI)} className={`btn ${(keyAPI === "" || secretKeyAPI === "") && "disabled" }`}>Get Datas</button>
            </div>

            {
                error && (
                    <div className="error">
                        Error while trying to get account informations
                    </div>
                )
            }

        </div>
    )
}