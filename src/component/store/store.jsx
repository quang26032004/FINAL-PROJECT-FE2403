import { configureStore } from "@reduxjs/toolkit";
import UserList from "./UserList";


export default configureStore({
    reducer: {
        UserAPI: UserList,
    },
})