import {informations} from "../shared/config";

export default function Information(){
    return(
        <div className="information">
            <p className="title">Warning</p>
            <p className="text ">{informations}</p>
        </div>
    )
}