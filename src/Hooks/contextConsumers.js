import { useContext } from "react";
import { OrganisationContext} from "../Context/organisationContext";
import { UsersContext } from "../Context/UserContext";


export function useOrgContext(){
    const context = useContext(OrganisationContext)

    return  context
}

export function useUserContext(){
    const context = useContext(UsersContext)

    return  context
}