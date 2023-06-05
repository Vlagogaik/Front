import s from "./Gallery.module.css"
import find_icon from "../../public/find.png";
import React, {useEffect, useState} from "react";
import Filters from "./Filters/Filters";
import Carts from "./Carts/Carts";
import {iLicense, iModel} from "../../models/Model";
import {observer} from "mobx-react-lite";
import {fetchLicenses, fetchModels} from "../../api/ModelApi";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {useModelStore} from "../../store/ModelStore";


const Gallery = observer(() => {

    const [search, setSearch] = useState<string>("");
    const [models, setModels] = useState<Array<iModel>>([]);
    const [deleteFilter, setDeleteFilter] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);



    const location = useLocation();
    const modelStore = useModelStore()
    let navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    console.log(location.search)


    useEffect(() => {
        const licence = searchParams.getAll('licence');
        const category = searchParams.getAll('category');
        const format = searchParams.get('format');
        fetchModels({
            search: search,
            status: "public",
            categoryId:category||undefined,
            licenseId:licence||undefined,
            formatId:format||undefined
        }).then(data => setModels(data))

    }, [location.search])


    const filterDelete = () => {
        navigate("/gallery")
    }

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetchModels({ search: search, status: "public"}).then(data => setModels(data))
    }

    return (
        <div>
            <div className={s.container}>
                <div className={s.search_block}>
                    <img src={find_icon} className={s.find_icon} alt=""/>
                    <form action="" onSubmit={onSearchSubmit}>
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} name="name" className={s.input_search}  />
                    </form>
                </div>

                <div className={s.filters}>
                    <Filters nameText="Категория" nameBlock="category" categories_list={modelStore.categories}></Filters>
                    <Filters nameText="Формат"  nameBlock="format" categories_list={modelStore.formats}></Filters>
                    <Filters nameText="Лицензия"  nameBlock="licence" categories_list={modelStore.licenses}></Filters>
                    {location.search?(
                            <button onClick={filterDelete} > очистить</button>
                        ):
                            <></>
                    }

                </div>
                    <Carts cartsProf={false} models = {models} ></Carts>
            </div>
        </div>
    );
})


export default Gallery