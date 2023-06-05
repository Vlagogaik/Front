import s from "./Filters.module.css";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {iCategory, iFormat, iLicense} from "../../../models/Model";


const Filters = ({nameBlock,categories_list,nameText}:{nameBlock:string,categories_list:Array<iLicense | iCategory | iFormat>,nameText:string}) => {
    const [open, setOpen] = useState(false);
    let categoriesElements = categories_list.map(c => <DropdownItem key={c.id} nameBlock={nameBlock} category={c}/>)



    let navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    const filters = urlParams.getAll(nameBlock)

    function DropdownItem({category,nameBlock}:{category:iLicense | iCategory | iFormat,nameBlock:string}) {

        const onDropdownItemClick = (categoryId:number) => {
            if (filters.includes(categoryId.toString())) {
                let newBlockValues = urlParams.getAll(nameBlock)
                newBlockValues = newBlockValues.filter(e=> e !== categoryId.toString())
                urlParams.delete(nameBlock)
                newBlockValues.forEach((val)=>{
                    urlParams.append(nameBlock, val) ;
                })

            } else {
                urlParams.append(`${nameBlock}`, categoryId.toString());
            }


            const newParams = urlParams.toString();
            const newPath = `${window.location.pathname}?${newParams}`;
            navigate(newPath, { replace: true });
        }


        return <div>
            <input type="checkbox" checked={filters.includes(category.id.toString())} name={category.name} id={category.name} onChange={()=>onDropdownItemClick(category.id)} className={s.dropdownItem}/>
            <label htmlFor={category.name}>{category.name}</label>
        </div>

    }

    return (
        <div className={s.nameBlock}>
            <span>{nameText}</span>
            <div className={s.category_trigger} onClick={()=>{setOpen(!open)}}>
                Все
            </div>
            <div className={s.dropdown_menu + " " + `${open? s.active : s.inactive }`}>
                {categoriesElements}
            </div>
        </div>
    );
}



export default Filters