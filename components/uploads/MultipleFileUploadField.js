import { Grid, makeStyles, Typography } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

const useStyles = makeStyles((theme) => ({
	dropzone: {
		border: `2px dashed ${theme.palette.primary.main}`,
		borderRadius: theme.shape.borderRadius,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: theme.palette.background.default,
		height: theme.spacing(10),
		outline: 'none'
	}
}));

// export interface UplodableFile {
// 	file: File,
// 	errors: FileError[]
// }

export function MultipleFileUploadField({ name }) {
	const [ _, __, helpers ] = useField(name);
	const classes = useStyles();

	const [ files, setFiles ] = useState([]);

	const onDrop = useCallback((accFiles, rejFiles) => {
		const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
		setFiles((curr) => [ ...curr, ...mappedAcc, ...rejFiles ]);
	}, []);

	useEffect(
		() => {
			helpers.setValue(files);
			// helpers.setTouched(true);
		},
		[ files ]
	);

	function onUpload(file, url) {
		setFiles((curr) =>
			curr.map((fw) => {
				if (fw.file === file) {
					return { ...fw, url };
				}
				return fw;
			})
		);
	}

	function onDelete(file) {
		setFiles((curr) => curr.filter((fw) => fw.file !== file));
	}

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
		maxSize: 300 * 1024 // 300KB
	});

	return (
		<React.Fragment>
			<Grid item>
				<div {...getRootProps({ className: classes.dropzone })}>
					<Typography variant="body1">Upload Images</Typography>

					<input {...getInputProps()} />

					<p>Drag 'n' drop some pictures here, or click to select pictures</p>
				</div>
			</Grid>

			{files.map((fileWrapper, idx) => (
				<Grid item key={idx}>
					{fileWrapper.errors.length ? (
						<UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete} />
					) : (
						<SingleFileUploadWithProgress onDelete={onDelete} onUpload={onUpload} file={fileWrapper.file} />
					)}
				</Grid>
			))}
		</React.Fragment>
	);
}
