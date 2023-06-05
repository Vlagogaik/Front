import React, {useEffect, useState} from "react";
import {iModel} from "../../../models/Model";
import {fetchModels, updateModel} from "../../../api/ModelApi";
import ConfirmItem from "../../admin/confirm/confirmItem/ConfirmItem";


const CancelCarts = () => {

    const [models, setModels] = useState<Array<iModel>>([]);

    async function updateM(model:iModel, st:string) {
        await updateModel({
            id: model.id,
            status: st,
            status_des: model.status_des
        })
        fetchModels({status: "consideration"}).then(data => setModels(data))
    }



    useEffect(() => {
        fetchModels({status: "consideration"}).then(data => setModels(data))
    }, [])

    let cartsElements = models.map(m => <ConfirmItem
        key={m.id}
        model = {m}
        artist = {m.artist}
        updateM = {updateM}
    />)

    return (
        <div>

        </div>
    );
}
export default CancelCarts