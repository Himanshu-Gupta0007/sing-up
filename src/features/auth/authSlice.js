// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// ✅ SIGNUP THUNK
export const signup = createAsyncThunk(
  'auth/signup',
  async (formData, thunkAPI) => {
    const { username, email, password } = formData;

    // Validate inputs
    if (!username || !email || !password) {
      return thunkAPI.rejectWithValue('All fields are required');
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.find(user => user.email === email);
    if (userExists) {
      return thunkAPI.rejectWithValue('User already exists');
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }
);


// ✅ LOGIN THUNK
export const login = createAsyncThunk('auth/login', async (form, thunkAPI) => {
  const { email, password } = form;
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const matchedUser = users.find(
    user => user.email === email && user.password === password
  );

  if (matchedUser) {
    localStorage.setItem('user', JSON.stringify(matchedUser));
    return matchedUser;
  } else {
    return thunkAPI.rejectWithValue('Invalid email or password');
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
