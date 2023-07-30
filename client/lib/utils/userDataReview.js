const defaultOptions = {
	method: 'GET',
	mode: 'cors',
	body: null,
	cache: 'no-cache',
	credential: 'same-origin',
	redirect: 'follow',
	referrerPolicy: 'no-referrer',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
};

export const userDataReview = async (options = {}) => {
	const { url, ...restOptions } = {
		...defaultOptions,
		...options,
		headers: { ...defaultOptions.headers, ...options.headers },
	};

	let response = await fetch(url, restOptions);

	if (response.ok) {
		response.data = await response.json();
	}

	// console.log(response);

	return response;
};

userDataReview.get = async (url, options) => {
	return userDataReview({
		url,
		...options,
	});
};

userDataReview.post = (url, body, options) => {
	return userDataReview({
		method: 'POST',
		url,
		body: JSON.stringify(body),
		...options,
	});
};

userDataReview.put = (url, body, options) => {
	return userDataReview({
		method: 'PUT',
		url,
		body: JSON.stringify(body),
		...options,
	});
};

userDataReview.delete = (url, options) => {
	return userDataReview({
		method: 'DELETE',
		url,
		...options,
	});
};
