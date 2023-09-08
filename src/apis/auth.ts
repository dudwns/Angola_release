import { useMutation, useQuery } from 'react-query';
import { authInfoState } from '@/atoms';
import { User } from '@/types';
import { AxiosError, AxiosResponse } from 'axios';
import { useSetRecoilState } from 'recoil';
import useAxiosInstance from './instance';

interface SignUpRequestBody {
	email: string;
	fullName: string;
	password: string;
}

export const useFetchSignUp = () => {
	const { baseInstance } = useAxiosInstance();
	const { mutate, isLoading, isError, isSuccess } = useMutation(
		'signUp',
		(body: SignUpRequestBody) => baseInstance.post('/signup', body),
	);
	return {
		signUp: mutate,
		isSignUpLoading: isLoading,
		isSignUpError: isError,
		isSignUpSuccess: isSuccess,
	};
};

interface LoginRequestBody {
	email: string;
	password: string;
}

interface LoginResponse {
	user: User;
	token: string;
}

export const useFetchLogin = () => {
	const { baseInstance } = useAxiosInstance();
	const setAuth = useSetRecoilState(authInfoState);

	const { mutate, data, isSuccess, isError, isLoading } = useMutation<
		AxiosResponse<LoginResponse>,
		AxiosError,
		LoginRequestBody
	>('login', (body: LoginRequestBody) => baseInstance.post('/login', body), {
		onSuccess: ({ data }) => {
			setAuth({
				userId: data.user._id,
				token: data.token,
			});
		},
	});

	return {
		login: mutate,
		loginData: {
			userId: data?.data.user._id,
			fullName: data?.data.user.fullName,
		},
		isLoginSuccess: isSuccess,
		isLoginError: isError,
		isLoginLoading: isLoading,
	};
};

export const useFetchLogOut = () => {
	const { authInstance } = useAxiosInstance();
	const setAuth = useSetRecoilState(authInfoState);

	const { mutate, isSuccess, isError, isLoading } = useMutation(
		'logOut',
		() => authInstance.post('/logout'),
		{
			onSuccess: () => {
				setAuth(null);
			},
		},
	);

	return {
		logOut: mutate,
		isLogOutSuccess: isSuccess,
		isLogOutError: isError,
		isLogOutLoading: isLoading,
	};
};

export const useFetchAuthUser = async () => {
	const { authInstance } = useAxiosInstance();
	const { data, isSuccess, isError, isLoading } = useQuery<
		AxiosResponse<User>,
		AxiosError,
		string | null
	>('authUser', () => authInstance.get('/auth-user'), {
		select: ({ data }) => {
			if (data) {
				return data._id;
			}
			return null;
		},
	});

	return {
		data,
		isSuccess,
		isError,
		isLoading,
	};
};