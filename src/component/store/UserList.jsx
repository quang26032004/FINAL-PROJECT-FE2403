import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../../service/userService";
import { createSlice } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk("getUserList", async (value) => {
  try {
    const { data } = await userService.getAll(value);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addUser = createAsyncThunk("addUser", async (user, thunkAPI) => {
  await userService.create(user);
  thunkAPI.dispatch(getUserList());
});

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (userId, thunkAPI) => {
    await userService.delete(userId);
    thunkAPI.dispatch(getUserList());
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (body, thunkAPI) => {
    await userService.update(body.id, body.values);
    thunkAPI.dispatch(getUserList());
  }
);

const initialState = {
  UserList: [],
  status: "idle",
  userDetail: {},
};

const UserList = createSlice({
  name: "UserList",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.UserList = action.payload;
      })
      .addCase(getUserList.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUserDetail } = UserList.actions;

export default UserList.reducer;
