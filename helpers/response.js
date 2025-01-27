
const sendResponse = (res, { status, data, message, count, error }) => {
	data = Boolean(data) ? data : undefined;
	message = Boolean(message) ? message : undefined;

	if (status == 'error') {
		res.json({
			status: false,
			message: message ? message : 'Something went wrong',
			error: error
		});
		res.end();
	}
	else if (!status) {
		res.json({
			status: status,
			message: message ? message : 'Data not found',
			data: data,
			count: count,
			error: error
		});
		res.end();
	} else {
		res.json({
			status: status,
			message: message ? message : 'Success',
			data: data,
			count: count
		});
		res.end();
	}

}

module.exports = sendResponse;
