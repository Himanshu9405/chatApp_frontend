import React, { useState } from 'react'
import { Container, Box, Typography, Tab } from '@mui/material';
import { TabContext, TabList } from '@material-ui/lab';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';

const HomePage = () => {

	const [value, setValue] = useState('1');
	console.log("called")


	const SIMPLE_TAB = [
		{ value: '1', label: 'Login', disabled: false, Component: 'Login' },
		{ value: '2', label: 'Sign Up', disabled: false, Component: 'SignUp' },
	];
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Container sx={{ mx: "auto" }}>
			<Box sx={{ backgroundColor: "black", color: "white", p: 2, width: "40vw", mx: "auto" }} >
				<Typography sx={{ fontSize: '24px', fontFamily: "Work sans" }}>
					Chat Application - MERN Stack
				</Typography>
			</Box>

			<Box sx={{
				p: 2,
				mt: 2,
				width: "40vw",
				mx: "auto",
				backgroundColor: 'white',
				color: "black"
			}}>
				<TabContext value={value} >
					<TabList onChange={handleChange}>
						{SIMPLE_TAB.map((tab, index) => (
							<Tab key={tab.value} label={tab.label} value={String(index + 1)} sx={{ width: "50%" }} />
						))}
					</TabList>

				</TabContext>
				{value === '1' ? (
					<Login />
				) : (
					<SignUp />
				)}
			</Box>
		</Container >
	)
}

export default HomePage

