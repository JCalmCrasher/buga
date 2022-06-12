import { Box, Divider, List } from "@chakra-ui/layout";
import { usePlaylist } from "../../lib/hooks";
import { musicMenu, navMenu } from "../../utils/menus";
import Logo from "../logo";
import PlaylistMenu from "../menu/playlist-menu";
import { SidebarMenu } from "../menu/sidebar-menu";

const SidebarLayout = () => {
  const { playlists } = usePlaylist();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Logo />
        <Box marginBottom={5}>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <SidebarMenu menu={menu} key={menu.name} />
            ))}
          </List>
        </Box>
        <Box marginTop={5}>
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <SidebarMenu menu={menu} key={menu.name} />
            ))}
          </List>
        </Box>
        <Divider color="gray.800" marginY={5} />
        <Box height="55%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <PlaylistMenu playlist={playlist} key={playlist.id} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarLayout;
