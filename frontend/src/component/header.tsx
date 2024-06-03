import { MenuOutlined } from "@mui/icons-material"
import { Avatar, Box, Typography } from "@mui/material"

const Header = () => {
    return <>
        <Box className="pl-32 pr-16 w-full  fixed flex gap-2 h-24 top-0 items-center justify-between border-2">
          <MenuOutlined />
          <Box className={"flex gap-x-2 font-main items-center"}>
            <Avatar src="frontend\public\assets\images\maroc.png" />
            <Box>
              <Typography>Oussama lmezouari</Typography>
            </Box>
          </Box>
        </Box>
    </>
}
export default Header