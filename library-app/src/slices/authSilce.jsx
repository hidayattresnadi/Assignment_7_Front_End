import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user,
    isLoading: false,
    isSuccess: false,
    isAuthenticated: false,
    isError: false,
    message: ''
};

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Logout user
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            return await authService.logout();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Refresh token user
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {      
            const response = await authService.refreshToken();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false; state.isSuccess = false;
            state.isError = false; state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Register cases
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            })
            // Login cases      
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isAuthenticated = true;
                state.user = action.payload;  // use the full user data here
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isAuthenticated = false;
                state.message = action.payload.message;
                state.user = null;
            })
            // Logout cases
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            // Refresh token case
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = { ...state.user, token: action.payload.token };  // Update user with new token
            })
            .addCase(refreshToken.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem('user');
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
