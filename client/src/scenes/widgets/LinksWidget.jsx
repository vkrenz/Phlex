import {
    EditOutlined,
    SportsEsportsOutlined,
    GroupOutlined,
    OndemandVideoOutlined,
    AppsOutlined,
    MoreHorizOutlined
} from "@mui/icons-material"
import { Box, Typography, Divider, IconButton  } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"

const LinksWidget = () => {
    return (
        <WidgetWrapper mt="3rem">
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
            >
                <Box display="flex" alignItems="center" gap="0.5rem">
                    <IconButton>
                        <EditOutlined />
                    </IconButton>
                    <Typography>
                        Edit Profile
                    </Typography>
                </Box>
                <MoreHorizOutlined />
            </FlexBetween>
            <Divider />
            <FlexBetween
                mt="1rem"
                gap="0.5rem"
                pb="1.1rem"
                flexDirection="column"
                alignItems="flex-end"
            >
                <Box display="flex" alignItems="center" gap="0.5rem">
                    <IconButton>
                        <SportsEsportsOutlined />
                    </IconButton>
                    <Typography>
                        Gaming
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="0.5rem">
                    <IconButton>
                        <GroupOutlined />
                    </IconButton>
                    <Typography>
                        Groups
                    </Typography>
                </Box>
            </FlexBetween>
        </WidgetWrapper>
    )
}


export default LinksWidget