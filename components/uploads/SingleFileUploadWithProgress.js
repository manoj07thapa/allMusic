import { Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FileHeader } from './FileHeader';

export function SingleFileUploadWithProgress({ file, onDelete, onUpload }) {
	const [ progress, setProgress ] = useState(0);

	useEffect(() => {
		async function upload() {
			const url = await uploadFile(file, setProgress);
			onUpload(file, url);
		}

		upload();
	}, []);

	return (
		<Grid item>
			<FileHeader file={file} onDelete={onDelete} />
			<LinearProgress variant="determinate" value={progress} />
		</Grid>
	);
}

function uploadFile(file, onProgress) {
	const url = 'https://api.cloudinary.com/v1_1/karma-777/image/upload';
	const key = 'mystore';

	return new Promise((res, rej) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);

		xhr.onload = () => {
			const resp = JSON.parse(xhr.responseText);
			res(resp.secure_url);
		};
		xhr.onerror = (evt) => rej(evt);
		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentage = event.loaded / event.total * 100;
				onProgress(Math.round(percentage));
			}
		};

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', key);
		formData.append('cloud_name', 'karma-777');

		xhr.send(formData);
	});
}
