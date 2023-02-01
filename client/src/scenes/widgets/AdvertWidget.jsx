import { Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"

const AdvertWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    return (
        <WidgetWrapper>
            <FlexBetween mb="0.5rem">
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium}>
                    Create Ad
                </Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="auto"
                src="http://localhost:3001/assets/info4.jpeg" 
                alt="Advert" 
                style={{
                   borderRadius: "0.75rem",
                   margin: "1rem 0"
                }}
            />
            <FlexBetween>
                <Typography color={main}>
                    MikaCosmetics
                </Typography>
                <Typography color={medium}>
                    mikacosmetics.com
                </Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                MikaCosmetics is a beauty brand offering high-quality, cruelty-free makeup and skincare products for confident and radiant individuals.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget