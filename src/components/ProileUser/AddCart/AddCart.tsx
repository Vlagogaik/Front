import s from "./AddCart.module.css"
import React, {useEffect, useState} from "react";
import {useModelStore} from "../../../store/ModelStore";
import {createModel, fetchLicenses, fetchModels} from "../../../api/ModelApi";
import {observer} from "mobx-react-lite";
import {useUserStore} from "../../../store/UserStore";
import {iLicense} from "../../../models/Model";


const AddCart = observer(() => {

    const ModelStore = useModelStore();

    // const [selectedCategory, setSelectedCategory] = useState("");
    // const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedLicense, setSelectedLicense] = useState<iLicense>({} as iLicense);

    const [name, setName] = useState<string>("");
    const [tags, setTags] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [des, setDes] = useState<string>("");
    const [filePhoto, setFilePhoto] = useState<Array<File>>([])
    const [filerar, setFilerar] = useState<Array<File>>([])
    const [file3d, setFile3d] = useState<Array<File>>([])
    const [sizeModel, setSizeModel] = useState<number>()

    const [open, setOpen] = useState(false);


    const selectFile = (e:any) => {
        setFilePhoto(e.target.files[0])
    }
    const selectFileR = (e:any) => {
        setFilerar(e.target.files[0])
    }
    const selectFileModel = (e:any) => {
        setFile3d(e.target.files[0])
        size(e.target.files[0])
    }
    const size = (e:any) => {
        setSizeModel(e.size)
    }


    // function handleCategorySelect(event:any) {
    //     setSelectedCategory(event.target.value);
    // }
    //
    //
    // const handleSelectChange = (event:any) => {
    //     const selectedValues:any = Array.from(event.target.selectedOptions).map(
    //         (option:any) => option.value
    //     );
    //     setSelectedOptions(selectedValues);
    // };



    const addModel = async () => {
        await createModel({
            name: name,
            link_photo: filePhoto,
            description: des,
            tags: tags.split(" ").filter(el => el != ""),
            price: price,
            likes: 0,
            link_download: filerar,
            model3d: file3d,
            size: sizeModel,
            status: "consideration",
            categoryId: 1,
            licenseId: selectedLicense.id

        })
    }


    return (
        <div>
            <div className={s.add_cart_block}>
                <div className={s.name_and_price}>
                    <input value={name} onChange={e => setName(e.target.value)} name='name' type='text' placeholder='Название'/>
                    <input value={price} onChange={e => setPrice(parseInt(e.target.value))} name='price' type='number' placeholder='Цена'/>
                </div>
                <textarea value={des} onChange={e => setDes(e.target.value)} className={s.desc} name='Description'  placeholder='Описание'/>

                <div className={s.nameBlock}>
                    <span>Лицензия</span>
                    <div className={s.category_trigger} onClick={()=>{setOpen(!open)}}>
                        {selectedLicense.name || "Выберите тип лицензии"}
                    </div>
                    <div className={s.dropdown_menu + " " + `${open? s.active : s.inactive }`}>
                        <ul>
                            {ModelStore.licenses.map(li =>
                                <div onClick={()=> setSelectedLicense(li)}>{li.name}</div>
                            )}
                        </ul>
                    </div>
                </div>
                <input onChange={selectFile} accept="image/png, image/jpeg, imgage/jpg" name='price' type='file' placeholder='Цена'/>
                <input onChange={selectFileR} accept=".zip,.rar,.7zip" name='price' type='file' placeholder='Цена'/>
                <input onChange={selectFileModel} accept=".glb" name='price' type='file' placeholder='Цена'/>

                <input value={tags} onChange={e => setTags(e.target.value)} name='tags' type='text' placeholder='Теги'/>


                <button onClick={addModel} type='submit'>Загрузить</button>
                {/*<select*/}
                {/*    multiple*/}
                {/*    value={selectedOptions}*/}
                {/*    onChange={handleSelectChange}*/}
                {/*>*/}
                {/*    <option value="option1">Option 1</option>*/}
                {/*    <option value="option2">Option 2</option>*/}
                {/*    <option value="option3">Option 3</option>*/}
                {/*</select>*/}
            </div>


        </div>
    );


})
export default AddCart