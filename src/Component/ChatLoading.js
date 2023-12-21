import { Avatar, Box, Skeleton, Typography } from '@mui/material'
import React from 'react'

const ChatLoading = ({ user }) => {
    const isLoading = true;
    return (
        <>
            <Box
                cursor={isLoading ? 'not-allowed' : 'pointer'}
                sx={{
                    // Use a different background color for the loading state
                    backgroundColor: isLoading ? '#E8E8E8' : '#E8E8E8',
                    // Use a different text color for the loading state
                    color: isLoading ? 'gray' : 'black',
                    // Adjust other styles as needed
                }}
                w="100%"
                d="flex"
                alignItems="center"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
            >
                {/* Avatar with Skeleton */}
                <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    mr={2}
                    sx={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                    <Avatar
                        size="sm"
                        cursor={isLoading ? 'not-allowed' : 'pointer'}
                        name={user?.name}
                        src={user?.pic}
                    />
                </Skeleton>
                {/* Content with Skeleton */}
                <Box>
                    {/* Text with Skeleton */}
                    <Skeleton
                        variant="text"
                        width={120}
                    >
                        <Typography>{user?.name}</Typography>
                    </Skeleton>

                    {/* Text with Skeleton */}
                    <Skeleton
                        variant="text"
                        width={200}
                    >
                        <Typography fontSize="xs">
                            <b>Email : </b>
                            {user?.email}
                        </Typography>
                    </Skeleton>
                </Box>

                {/* Loading Skeleton for the entire box */}
                {isLoading && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30} // Adjust the height based on your design
                    />
                )}
            </Box>
            <Box
                cursor={isLoading ? 'not-allowed' : 'pointer'}
                sx={{
                    backgroundColor: isLoading ? '#E8E8E8' : '#E8E8E8',
                    color: isLoading ? 'gray' : 'black',
                }}
                w="100%"
                d="flex"
                alignItems="center"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
            >
                <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    mr={2}
                    sx={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                    <Avatar
                        size="sm"
                        cursor={isLoading ? 'not-allowed' : 'pointer'}
                        name={user?.name}
                        src={user?.pic}
                    />
                </Skeleton>
                <Box>
                    <Skeleton
                        variant="text"
                        width={120}
                    >
                        <Typography>{user?.name}</Typography>
                    </Skeleton>
                    <Skeleton
                        variant="text"
                        width={200}
                    >
                        <Typography fontSize="xs">
                            <b>Email : </b>
                            {user?.email}
                        </Typography>
                    </Skeleton>
                </Box>

                {isLoading && (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={30} 
                    />
                )}
            </Box>
        </>
    )
}

export default ChatLoading
