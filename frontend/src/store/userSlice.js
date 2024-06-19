import { createSlice } from "@reduxjs/toolkit"

const initailState = {
  userData: {
    id: '',
    email: '',
    name: '',
    role: 0,
    image: '',
  },
  isAuth: false, 
  isLoading: false,
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initailState,
  reducers: {},
  extraReducers: (builder) => {}
})

export default userSlice.reducer;